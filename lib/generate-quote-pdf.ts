import type { SuggestedPackage } from "./types"

type AutoTableColumn = {
  header: string
  dataKey: string
}

type AutoTableRow = {
  item: string | number
  description: string
  quantity: string | number
  unitPrice: string
  total: string
}

type JsPdfDocument = {
  addImage: (...args: unknown[]) => void
  autoTable?: (options: unknown) => void
  lastAutoTable?: { finalY: number }
  save: (filename: string) => void
  setFillColor: (...args: number[]) => void
  setTextColor: (...args: number[]) => void
  setFont: (fontName: string, fontStyle?: string) => void
  setFontSize: (size: number) => void
  setDrawColor: (...args: number[]) => void
  setLineWidth: (width: number) => void
  line: (x1: number, y1: number, x2: number, y2: number) => void
  roundedRect: (x: number, y: number, width: number, height: number, rx: number, ry: number, style?: string) => void
  rect: (x: number, y: number, width: number, height: number, style?: string) => void
  text: (text: string | string[], x: number, y: number, options?: unknown) => void
  splitTextToSize: (text: string, maxWidth: number) => string[]
  internal: { pageSize: { getWidth: () => number; getHeight: () => number } }
}

type JsPdfConstructor = new (options: { format: string; orientation: string; unit: string }) => JsPdfDocument

type AutoTable = (doc: JsPdfDocument, options: unknown) => void

interface QuoteRow {
  item: number
  description: string
  quantity: number
  unitPrice: number
  total: number
}

interface QuotePdfParams {
  clientName?: string
  package: SuggestedPackage
}

const DARK_BLUE: [number, number, number] = [14, 42, 71]
const ACCENT_RED: [number, number, number] = [204, 32, 45]
const LIGHT_BLUE: [number, number, number] = [238, 244, 250]
const TEXT_MUTED: [number, number, number] = [91, 103, 112]
const mockPrices = [45000, 32000, 28000, 18000, 22000, 35000]
const logoCandidates = ["/logo.png", "/logo.jpg", "/logo.jpeg", "/trex-logo.png", "/trex-logo.jpg", "/placeholder-logo.png"]

async function loadPdfDependencies(): Promise<{ JsPDF: JsPdfConstructor; autoTable: AutoTable }> {
  try {
    const importModule = new Function("specifier", "return import(specifier)") as (specifier: string) => Promise<unknown>
    const [{ jsPDF }, autoTableModule] = await Promise.all([
      importModule("jspdf") as Promise<{ jsPDF: JsPdfConstructor }>,
      importModule("jspdf-autotable") as Promise<{ default?: AutoTable; autoTable?: AutoTable }>,
    ])

    const autoTable = autoTableModule.default ?? autoTableModule.autoTable

    if (!jsPDF || !autoTable) {
      throw new Error("No se pudo cargar jsPDF o jspdf-autotable.")
    }

    return { JsPDF: jsPDF, autoTable }
  } catch (error) {
    throw new Error(
      `No se pudo generar el PDF. Instala las dependencias con: npm install jspdf jspdf-autotable. Detalle: ${
        error instanceof Error ? error.message : "error desconocido"
      }`,
    )
  }
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value)
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function buildRows(selectedPackage: SuggestedPackage): QuoteRow[] {
  return selectedPackage.products.map((product, index) => {
    const unitPrice = mockPrices[index] ?? 25000

    return {
      item: index + 1,
      description: product,
      quantity: 1,
      unitPrice,
      total: unitPrice,
    }
  })
}

async function imageUrlToDataUrl(url: string): Promise<string | null> {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      return null
    }

    const blob = await response.blob()

    return await new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(typeof reader.result === "string" ? reader.result : null)
      reader.onerror = () => resolve(null)
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

async function findLogoDataUrl(): Promise<string | null> {
  for (const candidate of logoCandidates) {
    const dataUrl = await imageUrlToDataUrl(candidate)

    if (dataUrl) {
      return dataUrl
    }
  }

  return null
}

function drawHeader(doc: JsPdfDocument, quoteNumber: string, issuedAt: string, logoDataUrl: string | null) {
  doc.setFillColor(...DARK_BLUE)
  doc.rect(0, 0, 210, 42, "F")

  if (logoDataUrl) {
    try {
      doc.addImage(logoDataUrl, logoDataUrl.includes("image/jpeg") ? "JPEG" : "PNG", 14, 10, 26, 18)
    } catch {
      logoDataUrl = null
    }
  }

  if (!logoDataUrl) {
    doc.setFillColor(...ACCENT_RED)
    doc.roundedRect(14, 10, 26, 18, 2, 2, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(11)
    doc.text("TREX", 27, 21.5, { align: "center" })
  }

  doc.setTextColor(255, 255, 255)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(18)
  doc.text("Trex Artemis", 46, 16)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.text("Cotización generada por motor inteligente de oportunidades comerciales.", 46, 24)

  doc.setFont("helvetica", "bold")
  doc.setFontSize(10)
  doc.text(quoteNumber, 196, 16, { align: "right" })
  doc.setFont("helvetica", "normal")
  doc.text(`Emisión: ${issuedAt}`, 196, 24, { align: "right" })
}

function drawKeyValue(doc: JsPdfDocument, label: string, value: string, x: number, y: number) {
  doc.setTextColor(...TEXT_MUTED)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(8)
  doc.text(label.toUpperCase(), x, y)
  doc.setTextColor(25, 30, 35)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.text(doc.splitTextToSize(value, 78), x, y + 5)
}

export async function generateQuotePdf(params: QuotePdfParams): Promise<void> {
  if (typeof window === "undefined") {
    return
  }

  const selectedPackage = params.package
  const { JsPDF, autoTable } = await loadPdfDependencies()
  const doc = new JsPDF({ format: "a4", orientation: "portrait", unit: "mm" })
  const quoteNumber = `COT-ART-${Date.now()}`
  const issuedAt = new Intl.DateTimeFormat("es-CL", { dateStyle: "long" }).format(new Date())
  const logoDataUrl = await findLogoDataUrl()
  const rows = buildRows(selectedPackage)
  const subtotal = rows.reduce((acc, row) => acc + row.total, 0)
  const iva = Math.round(subtotal * 0.19)
  const total = subtotal + iva
  const clientName = params.clientName?.trim() || "Cliente no especificado"
  const model = selectedPackage.model?.trim() || "Modelo no especificado"

  drawHeader(doc, quoteNumber, issuedAt, logoDataUrl)

  doc.setFillColor(...LIGHT_BLUE)
  doc.roundedRect(14, 52, 182, 42, 3, 3, "F")
  drawKeyValue(doc, "Cliente", clientName, 20, 62)
  drawKeyValue(doc, "Modelo", model, 112, 62)
  drawKeyValue(doc, "Paquete", selectedPackage.name, 20, 80)
  drawKeyValue(doc, "Probabilidad estimada", `${selectedPackage.probability}%`, 112, 80)

  doc.setTextColor(...DARK_BLUE)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(13)
  doc.text("Detalle de productos", 14, 108)

  const tableRows: AutoTableRow[] = rows.length
    ? rows.map((row) => ({
        item: row.item,
        description: row.description,
        quantity: row.quantity,
        unitPrice: formatCurrency(row.unitPrice),
        total: formatCurrency(row.total),
      }))
    : [
        {
          item: "-",
          description: "Sin productos definidos",
          quantity: "-",
          unitPrice: "-",
          total: "-",
        },
      ]

  const columns: AutoTableColumn[] = [
    { header: "Item", dataKey: "item" },
    { header: "Descripción", dataKey: "description" },
    { header: "Cantidad", dataKey: "quantity" },
    { header: "Precio unitario", dataKey: "unitPrice" },
    { header: "Total", dataKey: "total" },
  ]

  autoTable(doc, {
    columns,
    body: tableRows,
    startY: 113,
    headStyles: { fillColor: DARK_BLUE, textColor: [255, 255, 255], fontStyle: "bold" },
    styles: { font: "helvetica", fontSize: 9, cellPadding: 3, overflow: "linebreak" },
    columnStyles: {
      item: { halign: "center", cellWidth: 15 },
      description: { cellWidth: 82 },
      quantity: { halign: "center", cellWidth: 22 },
      unitPrice: { halign: "right", cellWidth: 31 },
      total: { halign: "right", cellWidth: 31 },
    },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    margin: { left: 14, right: 14 },
  })

  const totalsY = (doc.lastAutoTable?.finalY ?? 135) + 8
  doc.setDrawColor(220, 225, 230)
  doc.line(126, totalsY - 2, 196, totalsY - 2)
  doc.setFontSize(10)
  doc.setTextColor(25, 30, 35)
  doc.setFont("helvetica", "normal")
  doc.text("Subtotal", 150, totalsY, { align: "right" })
  doc.text(formatCurrency(subtotal), 196, totalsY, { align: "right" })
  doc.text("IVA 19%", 150, totalsY + 7, { align: "right" })
  doc.text(formatCurrency(iva), 196, totalsY + 7, { align: "right" })
  doc.setTextColor(...ACCENT_RED)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(12)
  doc.text("Total", 150, totalsY + 16, { align: "right" })
  doc.text(formatCurrency(total), 196, totalsY + 16, { align: "right" })

  const summaryY = totalsY + 31
  doc.setFillColor(255, 255, 255)
  doc.setDrawColor(...DARK_BLUE)
  doc.setLineWidth(0.4)
  doc.roundedRect(14, summaryY, 182, 42, 3, 3)
  doc.setTextColor(...DARK_BLUE)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(12)
  doc.text("Resumen comercial", 20, summaryY + 10)
  doc.setTextColor(25, 30, 35)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.text(doc.splitTextToSize(`Motivo de recomendación: ${selectedPackage.reason}`, 170), 20, summaryY + 18)
  doc.text(`Probabilidad estimada: ${selectedPackage.probability}%`, 20, summaryY + 31)
  doc.text(doc.splitTextToSize(`Modelo: ${model}`, 170), 20, summaryY + 37)

  const pageHeight = doc.internal.pageSize.getHeight()
  doc.setDrawColor(225, 229, 235)
  doc.line(14, pageHeight - 22, 196, pageHeight - 22)
  doc.setTextColor(...TEXT_MUTED)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(8)
  doc.text(
    "Documento generado automáticamente por Trex Artemis. Valores referenciales para demostración MVP.",
    105,
    pageHeight - 14,
    { align: "center" },
  )

  doc.save(`cotizacion-artemis-${slugify(selectedPackage.name) || "paquete"}.pdf`)
}

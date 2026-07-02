"use client"

import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getQuoteData, type QuoteData } from "@/lib/quote-storage"

const mockPrices = [45000, 32000, 28000, 18000, 22000, 35000]

interface QuotePreviewProps {
  quoteId?: string
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value)
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value))
}

export function QuotePreview({ quoteId }: QuotePreviewProps) {
  const [quote, setQuote] = useState<QuoteData | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (quoteId) {
      setQuote(getQuoteData(quoteId))
    }

    setLoaded(true)
  }, [quoteId])

  const products = quote?.package.products ?? []
  const rows = useMemo(
    () =>
      products.map((product, index) => {
        const unitPrice = mockPrices[index % mockPrices.length]

        return {
          product,
          quantity: 1,
          unitPrice,
          total: unitPrice,
        }
      }),
    [products],
  )

  const subtotal = rows.reduce((total, row) => total + row.total, 0)
  const discountPercent = quote?.package.discountPercent ?? 0
  const hasDiscount = discountPercent > 0
  const discount = hasDiscount ? Math.round(subtotal * (discountPercent / 100)) : 0
  const net = subtotal - discount
  const tax = Math.round(net * 0.19)
  const total = net + tax

  if (loaded && !quote) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10 print:bg-white">
        <div className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm print:shadow-none">
          <h1 className="text-2xl font-semibold text-slate-950">
            No se encontró información de cotización.
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Vuelve al análisis del cliente y prepara una nueva oferta desde el paquete sugerido.
          </p>
          <Button className="mt-6 print:hidden" onClick={() => window.close()}>
            Volver
          </Button>
        </div>
      </main>
    )
  }

  if (!quote) {
    return null
  }

  const quoteNumber = `COT-ART-${quote.id.replace("quote-", "")}`
  const clientName = quote.clientName || "Cliente no especificado"
  const model = quote.package.model || "Modelo no especificado"
  const imageAlt = quote.package.machineImageAlt ?? quote.package.model ?? quote.package.name

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 print:bg-white print:p-0">
      <div className="mx-auto mb-4 flex max-w-[900px] justify-between gap-3 print:hidden">
        <Button variant="outline" onClick={() => window.close()}>
          <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          Volver
        </Button>
        <Button onClick={() => window.print()}>
          <Printer className="mr-2 h-4 w-4" aria-hidden="true" />
          Imprimir / Guardar PDF
        </Button>
      </div>

      <article className="mx-auto max-w-[900px] rounded-2xl bg-white p-8 shadow-xl print:rounded-none print:p-0 print:shadow-none sm:p-10">
        <header className="flex flex-col gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-950 text-lg font-bold tracking-widest text-white">
              TREX
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
                Cotización Comercial
              </h1>
              <p className="mt-1 text-sm text-slate-500">Generada por Trex Artemis</p>
            </div>
          </div>
          <div className="text-sm sm:text-right">
            <p className="font-semibold text-slate-950">{quoteNumber}</p>
            <p className="mt-1 text-slate-500">Fecha de emisión: {formatDate(quote.createdAt)}</p>
          </div>
        </header>

        <section className="grid gap-4 border-b border-slate-200 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {quote.package.machineImage && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2 lg:col-span-4">
              <img
                src={quote.package.machineImage}
                alt={imageAlt}
                className="mx-auto h-32 max-w-full object-contain"
              />
            </div>
          )}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Cliente</p>
            <p className="mt-2 font-medium text-slate-950">{clientName}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Modelo / Serie</p>
            <p className="mt-2 font-medium text-slate-950">{model}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Paquete recomendado</p>
            <p className="mt-2 font-medium text-slate-950">{quote.package.name}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Probabilidad estimada</p>
            <p className="mt-2 font-medium text-slate-950">{quote.package.probability}%</p>
          </div>
          {hasDiscount && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Descuento sugerido</p>
              <p className="mt-2 font-medium text-slate-950">{discountPercent}%</p>
            </div>
          )}
        </section>

        <section className="py-8">
          <h2 className="text-lg font-semibold text-slate-950">Detalle de productos</h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Ítem</th>
                  <th className="px-4 py-3">Parte / Repuesto</th>
                  <th className="px-4 py-3 text-right">Cantidad</th>
                  <th className="px-4 py-3 text-right">Precio unitario</th>
                  <th className="px-4 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {rows.length > 0 ? (
                  rows.map((row, index) => (
                    <tr key={`${row.product}-${index}`}>
                      <td className="px-4 py-3 text-slate-500">{index + 1}</td>
                      <td className="px-4 py-3 font-medium text-slate-950">{row.product}</td>
                      <td className="px-4 py-3 text-right">{row.quantity}</td>
                      <td className="px-4 py-3 text-right">{formatCurrency(row.unitPrice)}</td>
                      <td className="px-4 py-3 text-right font-medium">{formatCurrency(row.total)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-4 py-6 text-center text-slate-500" colSpan={5}>
                      Sin productos definidos
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="ml-auto mt-6 w-full max-w-xs space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            {hasDiscount && (
              <>
                <div className="flex justify-between">
                  <span className="text-slate-500">Descuento {discountPercent}%</span>
                  <span className="font-medium text-emerald-700">-{formatCurrency(discount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Neto</span>
                  <span className="font-medium">{formatCurrency(net)}</span>
                </div>
              </>
            )}
            <div className="flex justify-between">
              <span className="text-slate-500">IVA 19%</span>
              <span className="font-medium">{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-950">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-slate-950">Resumen comercial</h2>
          <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
            <div className="sm:col-span-3">
              <dt className="font-medium text-slate-500">Motivo de recomendación</dt>
              <dd className="mt-1 text-slate-950">{quote.package.reason}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Paquete recomendado</dt>
              <dd className="mt-1 text-slate-950">{quote.package.name}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Modelo / Serie</dt>
              <dd className="mt-1 text-slate-950">{model}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Probabilidad estimada</dt>
              <dd className="mt-1 text-slate-950">{quote.package.probability}%</dd>
            </div>
            {hasDiscount && (
              <div>
                <dt className="font-medium text-slate-500">Descuento sugerido</dt>
                <dd className="mt-1 text-slate-950">{discountPercent}%</dd>
              </div>
            )}
          </dl>
        </section>

        <footer className="mt-8 border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
          Documento generado automáticamente por Trex Artemis. Valores referenciales para demostración MVP.
        </footer>
      </article>
    </main>
  )
}

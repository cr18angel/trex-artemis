import type { AnalysisResult } from "./types"

/**
 * Mock dataset that emulates the response of an ERP/SAP B1 query
 * followed by an AI commercial analysis.
 *
 * Replace `analyzeClient` with a real fetch() to your API later.
 * The shape (AnalysisResult) is intentionally stable so the UI
 * does not need to change once a real backend is connected.
 */
const MOCK_DB: Record<string, AnalysisResult> = {
  "rental valdivia": {
    summary: {
      name: "RENTAL VALDIVIA - RUT: 76966608-7",
      type: "Recurrente",
      lastPurchase: "12 de mayo, 2026",
      frequency: "Cada 45 - 60 días",
      mainLine: "Maquinaria pesada y repuestos",
      opportunity: "Alto",
      availableCredit: "$250.000",
    },
    insights: [
      {
        kind: "pattern",
        title: "Patrón detectado",
        description:
          "Compra constante de repuestos de motor y filtros asociada a ciclos de obra. Pico de demanda al inicio de cada trimestre.",
      },
      {
        kind: "risk",
        title: "Riesgo comercial",
        description:
          "No registra compra de aceites hidráulicos en los últimos 90 días, lo que suele anticipar mantenimientos vencidos.",
      },
      {
        kind: "opportunity",
        title: "Oportunidad recomendada",
        description:
          "Ventana ideal para ofrecer un paquete preventivo antes del próximo ciclo de obra de junio.",
      },
      {
        kind: "action",
        title: "Siguiente acción sugerida",
        description:
          "Contactar al jefe de mantenimiento esta semana y proponer el Kit de mantenimiento preventivo.",
      },
    ],
packages: [
  {
    id: "prev",
    name: "Kit mantenimiento preventivo - 1000 horas",
    reason: "Alineado a su ciclo de obra y mantenimientos vencidos.",
    products: ["Aceite hidráulico 20L", "Filtro de aceite", "Filtro de aire", "Refrigerante"],
    probability: 82,
    model: "LIFTACE E 6/7 ECC 9",
  },
  {
    id: "filtros",
    name: "Kit filtros - 250 horas",
    reason: "Consumo recurrente de filtros cada 45 días.",
    products: ["Filtro de combustible", "Filtro de aire", "Filtro separador"],
    probability: 74,
    model: "GR-550XLL-3",
  },
  {
    id: "rodado",
    name: "Kit desgaste / tren de rodado - 4000 horas",
    reason: "Uso intensivo de maquinaria pesada en terreno.",
    products: ["Cadenas", "Rodillos", "Zapatas", "Pasadores"],
    probability: 58,
    model: "KIA DE JOSE ",
  },
],
    aiSummary:
      "Este cliente presenta un patrón de compra orientado a mantenimiento preventivo. Históricamente compra filtros y componentes de desgaste cada 45 a 60 días. Se recomienda contactar esta semana y ofrecer un paquete preventivo asociado a su última compra de maquinaria pesada.",
  },
  "minera los andes": {
    summary: {
      name: "Minera Los Andes",
      type: "Alto potencial",
      lastPurchase: "28 de abril, 2026",
      frequency: "Cada 30 - 40 días",
      mainLine: "Tren de rodado y componentes de desgaste",
      opportunity: "Alto",
      availableCredit: "$480.000",
    },
    insights: [
      {
        kind: "pattern",
        title: "Patrón detectado",
        description:
          "Alto consumo de componentes de desgaste por operación minera continua 24/7. Reposición frecuente de zapatas y rodillos.",
      },
      {
        kind: "risk",
        title: "Riesgo comercial",
        description:
          "Cliente cotizando con la competencia en repuestos de tren de rodado según última interacción comercial.",
      },
      {
        kind: "opportunity",
        title: "Oportunidad recomendada",
        description:
          "Gran potencial de ticket alto con contrato de abastecimiento trimestral de desgaste.",
      },
      {
        kind: "action",
        title: "Siguiente acción sugerida",
        description:
          "Agendar visita comercial y presentar propuesta de contrato de suministro con precio preferente.",
      },
    ],
    packages: [
      {
        id: "rodado",
        name: "Kit desgaste / tren de rodado",
        reason: "Núcleo de su consumo en operación minera continua.",
        products: ["Cadenas", "Rodillos superiores", "Zapatas reforzadas", "Ruedas guía"],
        probability: 88,
      },
      {
        id: "prev",
        name: "Kit mantenimiento preventivo",
        reason: "Complementa la vida útil del tren de rodado.",
        products: ["Grasa industrial", "Aceite hidráulico 20L", "Filtros"],
        probability: 69,
      },
      {
        id: "filtros",
        name: "Kit filtros",
        reason: "Ambiente con alta presencia de polvo abrasivo.",
        products: ["Filtro de aire pesado", "Filtro separador", "Filtro de combustible"],
        probability: 63,
      },
    ],
    aiSummary:
      "Minera Los Andes es un cliente de alto potencial con operación continua que genera desgaste acelerado. Existe riesgo de fuga hacia la competencia en tren de rodado. Se recomienda priorizar una propuesta de contrato de abastecimiento trimestral con precio preferente esta misma semana.",
  },
  "transportes del sur": {
    summary: {
      name: "Transportes del Sur",
      type: "Esporádico",
      lastPurchase: "3 de marzo, 2026",
      frequency: "Cada 90 - 120 días",
      mainLine: "Filtros y lubricantes para flota",
      opportunity: "Medio",
      availableCredit: "$125.000",
    },
    insights: [
      {
        kind: "pattern",
        title: "Patrón detectado",
        description:
          "Compras espaciadas concentradas en filtros y lubricantes para flota de transporte de carga.",
      },
      {
        kind: "risk",
        title: "Riesgo comercial",
        description:
          "Frecuencia de compra baja y en descenso; posible reducción de actividad o compra dividida con otro proveedor.",
      },
      {
        kind: "opportunity",
        title: "Oportunidad recomendada",
        description:
          "Reactivar con un kit de filtros a precio promocional para recuperar frecuencia de compra.",
      },
      {
        kind: "action",
        title: "Siguiente acción sugerida",
        description:
          "Enviar oferta de reactivación y consultar plan de mantenimiento de la flota para el próximo trimestre.",
      },
    ],
    packages: [
      {
        id: "filtros",
        name: "Kit filtros",
        reason: "Su línea principal de consumo para la flota.",
        products: ["Filtro de aceite", "Filtro de aire", "Filtro de combustible"],
        probability: 71,
      },
      {
        id: "prev",
        name: "Kit mantenimiento preventivo",
        reason: "Oportunidad de aumentar ticket con mantenimiento de flota.",
        products: ["Aceite de motor 15W40", "Filtros", "Refrigerante"],
        probability: 54,
      },
      {
        id: "rodado",
        name: "Kit desgaste / tren de rodado",
        reason: "Baja probabilidad: flota vial, no maquinaria de oruga.",
        products: ["Neumáticos", "Frenos", "Amortiguadores"],
        probability: 32,
      },
    ],
    aiSummary:
      "Transportes del Sur es un cliente esporádico con frecuencia de compra en descenso, enfocado en filtros y lubricantes para su flota. Existe riesgo de pérdida de participación. Se recomienda enviar una oferta de reactivación con un kit de filtros promocional y relevar su plan de mantenimiento del próximo trimestre.",
  },
}

export const MOCK_CLIENT_NAMES = [
  "Rental Valdivia",
  "Astilleros Arica",
  "San Antonio Terminal",
]

/** Builds a generic fallback result for any client not in the mock DB. */
function buildGenericResult(name: string): AnalysisResult {
  const clean = name.trim() || "Cliente"
  return {
    summary: {
      name: clean,
      type: "Esporádico",
      lastPurchase: "Sin registro reciente",
      frequency: "No determinada",
      mainLine: "Repuestos generales",
      opportunity: "Medio",
      availableCredit: "$75.000",
    },
    insights: [
      {
        kind: "pattern",
        title: "Patrón detectado",
        description:
          "Historial limitado en el ERP. Se sugiere validar datos y enriquecer el perfil comercial del cliente.",
      },
      {
        kind: "risk",
        title: "Riesgo comercial",
        description: "Información insuficiente para estimar riesgo. Cliente potencialmente nuevo o inactivo.",
      },
      {
        kind: "opportunity",
        title: "Oportunidad recomendada",
        description: "Realizar un primer acercamiento de diagnóstico para identificar necesidades.",
      },
      {
        kind: "action",
        title: "Siguiente acción sugerida",
        description: "Llamada de prospección y registro completo del cliente en el ERP.",
      },
    ],
    packages: [
      {
        id: "filtros",
        name: "Kit filtros",
        reason: "Punto de entrada de bajo riesgo para iniciar relación comercial.",
        products: ["Filtro de aceite", "Filtro de aire", "Filtro de combustible"],
        probability: 50,
      },
      {
        id: "prev",
        name: "Kit mantenimiento preventivo",
        reason: "Oferta estándar de mantenimiento.",
        products: ["Aceite de motor", "Filtros", "Refrigerante"],
        probability: 44,
      },
      {
        id: "rodado",
        name: "Kit desgaste / tren de rodado",
        reason: "Disponible si opera maquinaria de oruga.",
        products: ["Cadenas", "Rodillos", "Zapatas"],
        probability: 30,
      },
    ],
    aiSummary: `No se encontró un historial detallado para ${clean} en el ERP. Se recomienda iniciar un proceso de prospección, completar su ficha comercial y ofrecer un kit de filtros como primer acercamiento de bajo riesgo.`,
  }
}

/**
 * Simulates the full flow:
 * Cliente → consulta ERP/SAP B1 → resumen comercial → análisis IA → recomendaciones.
 *
 * To connect a real backend, replace the body with:
 *   const res = await fetch(`/api/analyze?client=${encodeURIComponent(name)}`)
 *   return res.json()
 */
export async function analyzeClient(name: string): Promise<AnalysisResult> {
  await new Promise((resolve) => setTimeout(resolve, 5000))
  const key = name.trim().toLowerCase()
  return MOCK_DB[key] ?? buildGenericResult(name)
}

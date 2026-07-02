export type ClientType = "Foco en costo" | "Esporádico" | "Alto potencial"
export type OpportunityLevel = "Alto" | "Medio" | "Bajo"

export interface Insight {
  /** "Patrón detectado" | "Riesgo comercial" | "Oportunidad recomendada" | "Siguiente acción sugerida" */
  kind: "pattern" | "risk" | "opportunity" | "action"
  title: string
  description: string
}

export interface SuggestedPackage {
  id: string
  name: string
  reason: string
  products: string[]
  probability: number
  model?: string
  recommended?: boolean
  discountPercent?: number
  machineImage?: string
  machineImageAlt?: string
}


export interface ClientSummary {
  name: string
  type: ClientType
  lastPurchase: string
  frequency: string
  mainLine: string
  opportunity: OpportunityLevel
  availableCredit: string
}

export interface AnalysisResult {
  summary: ClientSummary
  insights: Insight[]
  packages: SuggestedPackage[]
  aiSummary: string
}

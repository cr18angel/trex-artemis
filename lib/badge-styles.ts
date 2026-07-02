import type { ClientType, OpportunityLevel } from "./types"

export function opportunityClasses(level: OpportunityLevel): string {
  switch (level) {
    case "Alto":
      return "bg-primary text-primary-foreground border-transparent"
    case "Medio":
      return "bg-chart-4/15 text-chart-4 border-chart-4/30"
    case "Bajo":
      return "bg-muted text-muted-foreground border-border"
  }
}

export function clientTypeClasses(type: ClientType): string {
  switch (type) {
    case "Alto potencial":
      return "bg-primary/10 text-primary border-primary/25"
    case "Foco en costo":
      return "bg-chart-4/15 text-chart-4 border-chart-4/30"
    case "Esporádico":
      return "bg-muted text-muted-foreground border-border"
  }
}

export function probabilityColor(p: number): string {
  if (p >= 70) return "bg-primary"
  if (p >= 50) return "bg-chart-4"
  return "bg-muted-foreground"
}

"use client"

import { useEffect, useState } from "react"
import { Check, Database, LineChart, Loader2, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const STEPS = [
  { label: "Consultando historial ERP", icon: Database },
  { label: "Identificando patrones de compra", icon: LineChart },
  { label: "Generando recomendación comercial con IA", icon: Sparkles },
]

export function AnalysisLoading() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timers = STEPS.map((_, i) =>
      setTimeout(() => setActive((prev) => Math.max(prev, i + 1)), (i + 1) * 700),
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 py-6">
        <p className="text-sm font-medium text-muted-foreground">
          Procesando flujo: Cliente → ERP/SAP B1 → Análisis IA → Recomendación
        </p>
        <ul className="flex flex-col gap-3">
          {STEPS.map((step, i) => {
            const done = active > i
            const current = active === i
            const Icon = step.icon
            return (
              <li key={step.label} className="flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                    done
                      ? "border-accent bg-accent text-accent-foreground"
                      : current
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary text-muted-foreground"
                  }`}
                >
                  {done ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  ) : current ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  )}
                </span>
                <span
                  className={`text-sm ${
                    done || current ? "font-medium text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}

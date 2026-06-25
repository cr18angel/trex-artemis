"use client"

import { useEffect, useState } from "react"
import { Check, Database, LineChart, Loader2, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const STEPS = [
  { label: "Consultando historial ERP", icon: Database },
  { label: "Identificando patrones de compra", icon: LineChart },
  { label: "Generando recomendación comercial con IA", icon: Sparkles },
]

// Total simulated duration: 5s. Steps complete at ~1.5s, ~3s, ~4.5s.
const TOTAL_MS = 5000
const STEP_MS = 1500

export function AnalysisLoading() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timers = STEPS.map((_, i) =>
      setTimeout(() => setActive((prev) => Math.max(prev, i + 1)), (i + 1) * STEP_MS),
    )

    const start = Date.now()
    const interval = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - start) / TOTAL_MS) * 100)
      setProgress(pct)
      if (pct >= 100) clearInterval(interval)
    }, 50)

    return () => {
      timers.forEach(clearTimeout)
      clearInterval(interval)
    }
  }, [])

  return (
    <Card className="overflow-hidden">
      <CardContent className="flex flex-col gap-6 py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative flex h-16 w-16 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
            <span className="absolute inset-0 rounded-full border-2 border-primary/15" />
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Loader2 className="h-7 w-7 animate-spin" aria-hidden="true" />
            </span>
          </div>
          <div>
            <p className="text-balance text-lg font-semibold text-foreground">
              Analizando cliente…
            </p>
            <p className="mt-1 text-pretty text-sm text-muted-foreground">
              Cliente → ERP/SAP B1 → Análisis IA → Recomendación
            </p>
          </div>
        </div>

        <div
          className="h-2 w-full overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progreso del análisis"
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <ul className="flex flex-col gap-3">
          {STEPS.map((step, i) => {
            const done = active > i
            const current = active === i
            const Icon = step.icon
            return (
              <li key={step.label} className="flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    done
                      ? "border-primary bg-primary text-primary-foreground"
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

"use client"

import type { FormEvent } from "react"
import { Search, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MOCK_CLIENT_NAMES } from "@/lib/mock-clients"

interface ClientSearchProps {
  value: string
  onChange: (value: string) => void
  onAnalyze: () => void
  onClear: () => void
  canClear: boolean
  loading: boolean
}

export function ClientSearch({
  value,
  onChange,
  onAnalyze,
  onClear,
  canClear,
  loading,
}: ClientSearchProps) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!loading && value.trim()) onAnalyze()
  }

  return (
    <section aria-label="Buscar cliente" className="flex flex-col gap-4">
      <div>
        <h2 className="text-balance text-2xl font-semibold text-foreground sm:text-3xl">
          Analiza a tu cliente en segundos
        </h2>
        <p className="mt-1 text-pretty text-muted-foreground">
          Ingresa o selecciona un cliente y deja que el motor consulte el ERP y genere
          recomendaciones comerciales con IA.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            list="trex-clients"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Buscar cliente…"
            aria-label="Nombre del cliente"
            className="h-12 pl-10 text-base"
          />
          <datalist id="trex-clients">
            {MOCK_CLIENT_NAMES.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
        </div>
        <Button type="submit" disabled={loading || !value.trim()} className="h-12 px-6 text-base">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
          {loading ? "Analizando…" : "Analizar cliente"}
        </Button>
        {canClear && (
          <Button
            type="button"
            variant="ghost"
            onClick={onClear}
            disabled={loading}
            className="h-12 px-4 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Limpiar
          </Button>
        )}
      </form>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">Sugeridos:</span>
        {MOCK_CLIENT_NAMES.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => onChange(name)}
            disabled={loading}
            className="rounded-full border border-border bg-secondary px-3 py-1 text-sm text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
          >
            {name}
          </button>
        ))}
      </div>
    </section>
  )
}

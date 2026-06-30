"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { AppHeader } from "@/components/trex/app-header"
import { ClientSearch } from "@/components/trex/client-search"
import { AnalysisLoading } from "@/components/trex/analysis-loading"
import { SummaryCard } from "@/components/trex/summary-card"
import { InsightsGrid } from "@/components/trex/insights-grid"
import { PackagesSection } from "@/components/trex/packages-section"
import { AiSummaryPanel } from "@/components/trex/ai-summary-panel"
import { analyzeClient } from "@/lib/mock-clients"
import type { AnalysisResult, SuggestedPackage } from "@/lib/types"

export default function Page() {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  async function handleAnalyze() {
    setLoading(true)
    setResult(null)
    setNotice(null)
    const data = await analyzeClient(query)
    setResult(data)
    setLoading(false)
  }

  function handleClear() {
    setQuery("")
    setResult(null)
    setNotice(null)
    setLoading(false)
  }

  function handlePrepareOffer(pkg: SuggestedPackage) {
    setNotice(`Oferta preparada: "${pkg.name}" lista para enviar al cliente.`)
    setTimeout(() => setNotice(null), 3500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6">
        <ClientSearch
          value={query}
          onChange={setQuery}
          onAnalyze={handleAnalyze}
          onClear={handleClear}
          canClear={Boolean(query || result || loading)}
          loading={loading}
        />

        {notice && (
          <div
            role="status"
            className="rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm font-medium text-accent"
          >
            {notice}
          </div>
        )}

        {loading && <AnalysisLoading />}

        {!loading && result && (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                              {/* <h1>prueba</h1> */}

              <div className="flex flex-col gap-6 lg:col-span-3">
                <SummaryCard summary={result.summary} />
                <InsightsGrid insights={result.insights} />
              </div>
              <div className="lg:col-span-2">
                <AiSummaryPanel summary={result.aiSummary} />
              </div>
            </div>

            <PackagesSection
              packages={result.packages}
              onPrepareOffer={handlePrepareOffer}
            />
          </div>
        )}

        {!loading && !result && (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-card py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary">
              <Search className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="text-balance font-medium text-foreground">Sin análisis todavía</p>
            <p className="max-w-sm text-pretty text-sm text-muted-foreground">
              Busca o selecciona un cliente y presiona “Analizar cliente” para ver el resumen
              comercial y las recomendaciones de IA.
            </p>
          </div>
        )}
      </main>

      <footer className="border-t border-border py-6">
        <p className="text-center text-sm text-muted-foreground">
          Trex Smart Sales · MVP de demostración con datos simulados (ERP/SAP B1)
        </p>
      </footer>
    </div>
  )
}

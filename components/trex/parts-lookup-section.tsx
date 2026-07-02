"use client"

import { useState } from "react"
import { PackageSearch, RotateCcw, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  searchPartsByModelSerieAndPart,
  type PartLookupResult,
} from "@/lib/mock-parts"

export function PartsLookupSection() {
  const [modelo, setModelo] = useState("")
  const [serie, setSerie] = useState("")
  const [parte, setParte] = useState("")
  const [results, setResults] = useState<PartLookupResult[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const canSearch = Boolean(modelo.trim() && serie.trim() && parte.trim())

  function handleSearch() {
    if (!canSearch) return

    setResults(searchPartsByModelSerieAndPart(modelo, serie, parte))
    setIsModalOpen(true)
  }

  function handleClear() {
    setModelo("")
    setSerie("")
    setParte("")
    setResults([])
    setIsModalOpen(false)
  }

  return (
    <section aria-label="Consulta rápida de repuestos" className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <PackageSearch className="h-5 w-5 text-primary" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-foreground">Consulta rápida de repuestos</h3>
      </div>

      <Card className="border border-border">
        <CardHeader>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Ingresa modelo, serie y número de parte para consultar precios comerciales y Machine Down.
          </p>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault()
              handleSearch()
            }}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
                Modelo
                <Input
                  value={modelo}
                  onChange={(event) => setModelo(event.target.value)}
                  placeholder="Kia Rio"
                  aria-label="Modelo"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
                Serie
                <Input
                  value={serie}
                  onChange={(event) => setSerie(event.target.value)}
                  placeholder="111111"
                  aria-label="Serie"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
                Parte
                <Input
                  value={parte}
                  onChange={(event) => setParte(event.target.value)}
                  placeholder="l5002"
                  aria-label="Parte"
                />
              </label>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" onClick={handleClear} disabled={!modelo && !serie && !parte}>
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Limpiar
              </Button>
              <Button type="submit" disabled={!canSearch}>
                <Search className="h-4 w-4" aria-hidden="true" />
                Buscar repuesto
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="parts-lookup-modal-title"
        >
          <Card className="max-h-[90vh] w-full max-w-4xl border border-border shadow-2xl">
            <CardHeader className="border-b border-border">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <h4 id="parts-lookup-modal-title" className="text-lg font-semibold text-foreground">
                    Resultados de repuestos
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Búsqueda para {modelo.trim()} · Serie {serie.trim()} · Parte {parte.trim()}
                  </p>
                </div>
                <Button type="button" variant="ghost" size="icon" onClick={() => setIsModalOpen(false)} aria-label="Cerrar modal">
                  <X className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="overflow-y-auto">
              {results.length > 0 ? (
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                    <thead className="bg-secondary text-foreground">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Parte repuesto</th>
                        <th className="px-4 py-3 font-semibold">Descripción 1</th>
                        <th className="px-4 py-3 font-semibold">Precio venta</th>
                        <th className="px-4 py-3 font-semibold">Precio Machine Down</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      {results.map((part) => (
                        <tr key={part.parteRepuesto} className="text-foreground">
                          <td className="px-4 py-3 font-medium">{part.parteRepuesto}</td>
                          <td className="px-4 py-3 text-muted-foreground">{part.descripcion1}</td>
                          <td className="px-4 py-3 font-semibold">{part.precioVenta}</td>
                          <td className="px-4 py-3 font-semibold text-accent">{part.precioMachineDown}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-border bg-secondary/40 px-4 py-10 text-center">
                  <p className="font-medium text-foreground">No se encontraron repuestos para esta combinación.</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Revisa el modelo, serie o parte e intenta nuevamente.
                  </p>
                </div>
              )}

              <div className="mt-5 flex justify-end">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cerrar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  )
}

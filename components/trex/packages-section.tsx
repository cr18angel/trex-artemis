"use client"

import { Check, Package } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { probabilityColor } from "@/lib/badge-styles"
import type { SuggestedPackage } from "@/lib/types"

interface PackagesSectionProps {
  packages: SuggestedPackage[]
  onPrepareOffer: (pkg: SuggestedPackage) => void
}

export function PackagesSection({ packages, onPrepareOffer }: PackagesSectionProps) {
  return (
    <section aria-label="Paquetes sugeridos" className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Package className="h-5 w-5 text-primary" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-foreground">Paquetes comerciales sugeridos</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {packages.map((pkg) => (
          <Card
            key={pkg.id}
          className={`flex flex-col bg-card transition-all ${
  pkg.recommended
    ? "border-2 border-primary/50 shadow-lg shadow-primary/10 ring-1 ring-primary/20"
    : "border-border"
}`}
          >
            <CardHeader>
              {pkg.machineImage && (
                <div className="mb-3 flex h-28 items-center justify-center rounded-xl bg-secondary/40 p-3">
                  <img
                    src={pkg.machineImage}
                    alt={pkg.machineImageAlt ?? pkg.model ?? pkg.name}
                    className="h-full w-full object-contain"
                  />
                </div>
              )}

              <div className="flex items-start justify-between gap-3">
                <h4 className="font-semibold text-foreground">{pkg.name}</h4>
                {pkg.recommended && (
                  <span className="shrink-0 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                    Opción recomendada
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{pkg.reason}</p>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <ul className="flex flex-col gap-1.5">
                {pkg.products.map((product) => (
                  <li key={product} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    {product}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Probabilidad estimada</span>
                  <span className="font-semibold text-foreground">{pkg.probability}%</span>
                </div>
                <div
                  className="h-2 w-full overflow-hidden rounded-full bg-secondary"
                  role="progressbar"
                  aria-valuenow={pkg.probability}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className={`h-full rounded-full ${probabilityColor(pkg.probability)}`}
                    style={{ width: `${pkg.probability}%` }}
                  />
                </div>

                {pkg.model && (
                  <div className="mt-3 border-t border-border pt-3 text-center">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Modelo / Serie
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">{pkg.model}</p>
                  </div>
                )}

                <Button
                  variant="outline"
                  className="mt-2 w-full"
                  onClick={() => onPrepareOffer(pkg)}
                >
                  Preparar oferta
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

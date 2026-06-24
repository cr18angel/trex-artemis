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
          <Card key={pkg.id} className="flex flex-col">
            <CardHeader>
              <h4 className="font-semibold text-foreground">{pkg.name}</h4>
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

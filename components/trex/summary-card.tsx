import { Building2, CalendarClock, Layers, Repeat, TrendingUp, WalletCards } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { clientTypeClasses, opportunityClasses } from "@/lib/badge-styles"
import type { ClientSummary } from "@/lib/types"

function Field({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarClock
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}

export function SummaryCard({ summary }: { summary: ClientSummary }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Building2 className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">{summary.name}</h3>
            <Badge variant="outline" className={`mt-1 ${clientTypeClasses(summary.type)}`}>
              {summary.type}
            </Badge>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Oportunidad</p>
          <Badge className={`mt-1 ${opportunityClasses(summary.opportunity)}`}>
            <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
            {summary.opportunity}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-xl border border-primary/15 bg-primary/5 p-4 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <WalletCards className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Crédito disponible</p>
                <p className="text-2xl font-semibold leading-tight text-foreground">{summary.availableCredit}</p>
              </div>
            </div>
            <Badge variant="outline" className="border-primary/20 bg-background/80 text-primary">
              Simulado ERP
            </Badge>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field icon={CalendarClock} label="Última compra" value={summary.lastPurchase} />
          <Field icon={Repeat} label="Frecuencia estimada" value={summary.frequency} />
          <Field icon={Layers} label="Línea principal de compra" value={summary.mainLine} />
          <Field icon={TrendingUp} label="Tipo de cliente" value={summary.type} />
        </div>
      </CardContent>
    </Card>
  )
}

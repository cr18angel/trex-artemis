import { AlertTriangle, ArrowRightCircle, Lightbulb, Radar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Insight } from "@/lib/types"

const STYLES: Record<
  Insight["kind"],
  { icon: typeof Radar; accent: string; iconBg: string }
> = {
  pattern: { icon: Radar, accent: "border-l-primary", iconBg: "bg-primary/10 text-primary" },
  risk: {
    icon: AlertTriangle,
    accent: "border-l-destructive",
    iconBg: "bg-destructive/10 text-destructive",
  },
  opportunity: { icon: Lightbulb, accent: "border-l-accent", iconBg: "bg-accent/15 text-accent" },
  action: {
    icon: ArrowRightCircle,
    accent: "border-l-chart-4",
    iconBg: "bg-chart-4/15 text-chart-4",
  },
}

export function InsightsGrid({ insights }: { insights: Insight[] }) {
  return (
    <section aria-label="Insights del análisis" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {insights.map((insight) => {
        const style = STYLES[insight.kind]
        const Icon = style.icon
        return (
          <Card key={insight.kind} className={`border-l-4 ${style.accent}`}>
            <CardContent className="flex gap-3 py-5">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${style.iconBg}`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">{insight.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {insight.description}
                </p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </section>
  )
}

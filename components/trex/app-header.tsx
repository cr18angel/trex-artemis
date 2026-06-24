import { Sparkles, UserCircle2 } from "lucide-react"

export function AppHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight text-foreground">
              Trex Smart Sales
            </h1>
            <p className="text-sm text-muted-foreground">
              Motor inteligente de oportunidades comerciales
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2">
          <UserCircle2 className="h-5 w-5 text-primary" aria-hidden="true" />
          <div className="leading-tight">
            <p className="text-sm font-medium text-foreground">Vendedor / Ejecutivo</p>
            <p className="text-xs text-muted-foreground">Sesión conectada</p>
          </div>
        </div>
      </div>
    </header>
  )
}

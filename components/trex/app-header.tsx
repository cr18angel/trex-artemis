import { UserCircle2 } from "lucide-react"

export function AppHeader() {
  return (
    <header className="border-b border-border bg-card">
      {/* Franja superior con el rojo de marca */}
      <div className="h-1 w-full bg-accent" aria-hidden="true" />
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          {/* Logotipo provisional: reemplazar por el logo real */}
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <span className="text-lg font-bold tracking-tight">T</span>
            <span
              className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-accent"
              aria-hidden="true"
            />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight tracking-tight text-foreground">
              Trex <span className="text-accent">Artemis</span>
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

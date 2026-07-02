"use client"

import { useState } from "react"
import { Check, Copy, History, Send, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function AiSummaryPanel({ summary }: { summary: string }) {
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable
    }
  }

  function handleSend() {
    setSent(true)
    setTimeout(() => setSent(false), 2000)
  }

  return (
    <Card className="bg-primary text-primary-foreground">
      <CardHeader className="flex flex-row items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-foreground/15">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-semibold">Resumen generado por IA</h3>
          <p className="text-sm text-primary-foreground/70">Análisis comercial automatizado</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <p className="text-pretty leading-relaxed text-primary-foreground/90">{summary}</p>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Button
            variant="secondary"
            onClick={handleCopy}
            className="flex-1 sm:flex-none"
          >
            {copied ? (
              <Check className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4" aria-hidden="true" />
            )}
            {copied ? "Copiado" : "Copiar resumen"}
          </Button>
          {/* <Button
            variant="secondary"
            onClick={handleSend}
            className="flex-1 sm:flex-none"
          >
            {sent ? (
              <Check className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Send className="h-4 w-4" aria-hidden="true" />
            )}
            {sent ? "Enviado" : "Enviar a vendedor"}
          </Button> */}
          <Button
            variant="outline"
            className="flex-1 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:flex-none"
          >
            <History className="h-4 w-4" aria-hidden="true" />
            Ver historial ERP
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

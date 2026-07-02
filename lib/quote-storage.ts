import type { SuggestedPackage } from "@/lib/types"

export interface QuoteData {
  id: string
  clientName: string
  package: SuggestedPackage
  createdAt: string
}

export function saveQuoteData(data: QuoteData) {
  localStorage.setItem(data.id, JSON.stringify(data))
}

export function getQuoteData(id: string) {
  const storedData = localStorage.getItem(id)

  if (!storedData) {
    return null
  }

  try {
    return JSON.parse(storedData) as QuoteData
  } catch {
    return null
  }
}

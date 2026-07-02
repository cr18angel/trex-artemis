import { QuotePreview } from "@/components/quote-preview"

interface QuotePageProps {
  searchParams: Promise<{
    id?: string
  }>
}

export default async function QuotePage({ searchParams }: QuotePageProps) {
  const { id } = await searchParams

  return <QuotePreview quoteId={id} />
}

import { keywordDataset, competitorDataset, trendDataset, auditIssues, socialIdeas, buildOpportunitySummary } from '@/lib/mock-data';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get('q') || '').trim().toLowerCase();
  const intent = searchParams.get('intent') || 'All';

  let results = keywordDataset;

  if (query) {
    results = results.filter((item) => item.keyword.toLowerCase().includes(query));
  }

  if (intent !== 'All') {
    results = results.filter((item) => item.intent === intent);
  }

  return NextResponse.json({
    items: results,
    summary: buildOpportunitySummary(),
    source: 'demo-mode',
    generatedAt: new Date().toISOString(),
  });
}

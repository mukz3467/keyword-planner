import { NextResponse } from 'next/server';
import { competitorDataset, trendDataset, auditIssues, socialIdeas } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({
    competitors: competitorDataset,
    trends: trendDataset,
    audit: auditIssues,
    socialIdeas,
    generatedAt: new Date().toISOString(),
    source: 'demo-mode',
  });
}

import { NextResponse } from 'next/server';
import { trendDataset } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({
    trends: trendDataset,
    generatedAt: new Date().toISOString(),
    source: 'demo-mode',
  });
}

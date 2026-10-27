import { NextResponse } from 'next/server';
import { auditIssues } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({
    audit: auditIssues,
    generatedAt: new Date().toISOString(),
    source: 'demo-mode',
  });
}

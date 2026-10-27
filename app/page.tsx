import { Suspense } from 'react';
import { KeywordPlannerApp } from '@/components/keyword-planner-app';

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading Keywords Planner…</div>}>
      <KeywordPlannerApp />
    </Suspense>
  );
}

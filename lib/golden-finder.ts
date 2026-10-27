import { keywordDataset } from '@/lib/mock-data';

export function buildGoldenKeywordFinder(query: string) {
  const base = query.trim();
  const pool = base ? keywordDataset.filter((item) => item.keyword.toLowerCase().includes(base.toLowerCase())) : keywordDataset;

  return pool.map((item) => ({
    keyword: item.keyword,
    opportunityScore: Math.min(99, Math.round(item.opportunityScore + (item.trend > 60 ? 8 : 0))),
    searchVolume: item.monthlySearches,
    trendStatus: item.trendDirection,
    searchIntent: item.intent,
    serpDifficulty: item.difficulty,
    rankingOpportunity: item.difficulty <= 45 ? 'Strong low-competition opportunity with good search intent alignment.' : 'Opportunity exists but SERP competition is moderate and content depth matters.',
    recommendedFormat: item.keywordType === 'Question' ? 'How-to article' : 'Landing page + supporting blog content',
    nextAction: 'Create a targeted page, optimize H1 and intro, and build supporting internal links around the topic.',
  }));
}

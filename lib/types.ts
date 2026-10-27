export type SearchIntent = 'Informational' | 'Commercial' | 'Transactional' | 'Navigational';

export type KeywordRecord = {
  keyword: string;
  monthlySearches: number;
  trend: number;
  trendDirection: 'Rising' | 'Stable' | 'Seasonal' | 'Declining';
  adCompetition: number;
  cpc: number;
  intent: SearchIntent;
  keywordType: 'Seed' | 'Long-tail' | 'Question' | 'Related';
  relatedKeywords: string[];
  longTail: string[];
  questions: string[];
  opportunityScore: number;
  difficulty: number;
  source: string;
  updatedAt: string;
};

export type CompetitorRecord = {
  domain: string;
  organicTraffic: number;
  organicKeywords: number;
  sharedKeywords: number;
  keywordGap: number;
  domainAuthority: number;
  topPages: string[];
};

export type TrendRecord = {
  keyword: string;
  momentum: number;
  country: string;
  category: string;
  trendDirection: 'Rising' | 'Stable' | 'Seasonal';
  lastUpdated: string;
};

export type AuditIssue = {
  name: string;
  status: 'Good' | 'Needs attention' | 'Issue';
  detail: string;
};

export type SocialIdea = {
  platform: string;
  hook: string;
  content: string;
};

export const countries = ['Pakistan', 'India', 'United States', 'United Kingdom', 'Canada', 'Australia'];
export const languages = ['English', 'Urdu', 'Hindi'];
export const intentFilters: Array<SearchIntent | 'All'> = ['All', 'Informational', 'Commercial', 'Transactional', 'Navigational'];

export const keywordDataset: KeywordRecord[] = [
  {
    keyword: 'small business email marketing',
    monthlySearches: 1800,
    trend: 78,
    trendDirection: 'Rising',
    adCompetition: 62,
    cpc: 2.85,
    intent: 'Commercial',
    keywordType: 'Seed',
    relatedKeywords: ['email automation for small business', 'marketing automation for startups', 'email outreach strategy'],
    longTail: ['best email marketing tools for startups', 'email marketing for local business'],
    questions: ['How can small businesses improve email marketing?', 'What is the best email marketing software for startups?'],
    opportunityScore: 86,
    difficulty: 43,
    source: 'Sample data / demo mode',
    updatedAt: '2026-10-27',
  },
  {
    keyword: 'SEO agency for startups',
    monthlySearches: 960,
    trend: 72,
    trendDirection: 'Rising',
    adCompetition: 49,
    cpc: 4.42,
    intent: 'Commercial',
    keywordType: 'Seed',
    relatedKeywords: ['startup SEO services', 'SEO package for small business', 'fractional SEO expert'],
    longTail: ['affordable SEO agency for SaaS startup', 'SEO marketing agency for startup company'],
    questions: ['How much does SEO cost for startups?', 'What SEO services do startups need first?'],
    opportunityScore: 82,
    difficulty: 38,
    source: 'Sample data / demo mode',
    updatedAt: '2026-10-27',
  },
  {
    keyword: 'how to optimize blog content for SEO',
    monthlySearches: 2200,
    trend: 68,
    trendDirection: 'Stable',
    adCompetition: 35,
    cpc: 2.1,
    intent: 'Informational',
    keywordType: 'Question',
    relatedKeywords: ['SEO content checklist', 'blog SEO strategy', 'on-page SEO best practices'],
    longTail: ['how to write SEO blog posts that rank', 'blog optimization tips for SEO'],
    questions: ['How do I optimize blog posts for search engines?', 'What is the best SEO structure for blog content?'],
    opportunityScore: 89,
    difficulty: 32,
    source: 'Sample data / demo mode',
    updatedAt: '2026-10-27',
  },
  {
    keyword: 'best CRM software for service businesses',
    monthlySearches: 1400,
    trend: 61,
    trendDirection: 'Seasonal',
    adCompetition: 71,
    cpc: 3.92,
    intent: 'Commercial',
    keywordType: 'Long-tail',
    relatedKeywords: ['CRM for agencies', 'best customer management software', 'service business CRM'],
    longTail: ['best CRM for home service business', 'CRM software for marketing agencies'],
    questions: ['Which CRM is best for service businesses?', 'What CRM should a small agency use?'],
    opportunityScore: 74,
    difficulty: 50,
    source: 'Sample data / demo mode',
    updatedAt: '2026-10-27',
  },
  {
    keyword: 'social media marketing plan template',
    monthlySearches: 720,
    trend: 57,
    trendDirection: 'Rising',
    adCompetition: 44,
    cpc: 1.89,
    intent: 'Informational',
    keywordType: 'Long-tail',
    relatedKeywords: ['monthly social media plan', 'content calendar template', 'social media strategy framework'],
    longTail: ['social media marketing calendar template free', 'social media plan for small business template'],
    questions: ['How do I create a social media marketing plan?', 'What should be included in a marketing plan?'],
    opportunityScore: 81,
    difficulty: 29,
    source: 'Sample data / demo mode',
    updatedAt: '2026-10-27',
  },
  {
    keyword: 'SEO keyword clustering tools',
    monthlySearches: 680,
    trend: 75,
    trendDirection: 'Rising',
    adCompetition: 58,
    cpc: 3.16,
    intent: 'Commercial',
    keywordType: 'Long-tail',
    relatedKeywords: ['keyword clustering SEO', 'content cluster strategy', 'topic cluster SEO'],
    longTail: ['best keyword clustering software for SEO teams', 'SEO topic cluster strategy for blogs'],
    questions: ['What is keyword clustering in SEO?', 'How do you group keywords into content clusters?'],
    opportunityScore: 79,
    difficulty: 45,
    source: 'Sample data / demo mode',
    updatedAt: '2026-10-27',
  },
];

export const competitorDataset: CompetitorRecord[] = [
  {
    domain: 'semrush.com',
    organicTraffic: 2900000,
    organicKeywords: 820000,
    sharedKeywords: 142,
    keywordGap: 72,
    domainAuthority: 93,
    topPages: ['Keyword Magic Tool', 'SEO Toolkit', 'Content Marketing Planner'],
  },
  {
    domain: 'ahrefs.com',
    organicTraffic: 2600000,
    organicKeywords: 710000,
    sharedKeywords: 128,
    keywordGap: 68,
    domainAuthority: 91,
    topPages: ['Backlink Checker', 'Keyword Explorer', 'Site Audit'],
  },
  {
    domain: 'moz.com',
    organicTraffic: 1800000,
    organicKeywords: 360000,
    sharedKeywords: 110,
    keywordGap: 54,
    domainAuthority: 86,
    topPages: ['SEO Learning Hub', 'Domain Authority', 'Keyword Explorer'],
  },
];

export const trendDataset: TrendRecord[] = [
  { keyword: 'AI SEO tools', momentum: 89, country: 'United States', category: 'Tools', trendDirection: 'Rising', lastUpdated: '2026-10-27' },
  { keyword: 'website audit checklist', momentum: 74, country: 'Pakistan', category: 'SEO', trendDirection: 'Rising', lastUpdated: '2026-10-27' },
  { keyword: 'content cluster strategy', momentum: 61, country: 'United Kingdom', category: 'Content', trendDirection: 'Stable', lastUpdated: '2026-10-27' },
  { keyword: 'Google AI overview', momentum: 83, country: 'Canada', category: 'Search', trendDirection: 'Rising', lastUpdated: '2026-10-27' },
];

export const auditIssues: AuditIssue[] = [
  { name: 'Title Tag Length', status: 'Good', detail: 'Titles are within recommended length and optimized around primary keywords.' },
  { name: 'Meta Description Coverage', status: 'Needs attention', detail: 'A few pages still use generic or missing descriptions.' },
  { name: 'Internal Links', status: 'Good', detail: 'Important pages are internally linked well and pass link equity.' },
  { name: 'Image Alt Text', status: 'Issue', detail: 'Several decorative images are missing descriptive alt attributes.' },
  { name: 'Canonicalization', status: 'Good', detail: 'Canonical tags are consistent across landing pages.' },
  { name: 'Robots.txt / Sitemap', status: 'Needs attention', detail: 'Check sitemap freshness and deny rules for private paths.' },
];

export const socialIdeas: SocialIdea[] = [
  { platform: 'Instagram', hook: '3 simple SEO mistakes killing your reach', content: 'Carousel showing quick fixes for title tags, internal linking, and keyword placement.' },
  { platform: 'LinkedIn', hook: 'SEO is no longer just content writing', content: 'Post explaining how topic clusters and keyword intent planning improves rankings.' },
  { platform: 'YouTube', hook: 'How to find low-competition keywords', content: 'Short tutorial on starting from a seed phrase and mapping content angle to intent.' },
];

export function buildOpportunitySummary() {
  return {
    totalKeywords: keywordDataset.length,
    monthlySearchVolume: keywordDataset.reduce((sum, item) => sum + item.monthlySearches, 0),
    highOpportunity: keywordDataset.filter((item) => item.opportunityScore >= 80).length,
    trendingKeywords: trendDataset.filter((item) => item.trendDirection === 'Rising').length,
    lowCompetitionOpportunities: keywordDataset.filter((item) => item.difficulty <= 45).length,
    competitorsAnalyzed: competitorDataset.length,
    recentResearch: keywordDataset.slice(0, 4),
  };
}

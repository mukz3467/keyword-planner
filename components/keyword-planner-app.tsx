'use client';

import { useEffect, useMemo, useState } from 'react';
import { buildGoldenKeywordFinder } from '@/lib/golden-finder';
import { countries, intentFilters, languages, type KeywordRecord } from '@/lib/types';

const Card = ({ title, value, hint }: { title: string; value: string; hint: string }) => (
  <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4 shadow-soft">
    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{title}</p>
    <div className="mt-3 text-3xl font-bold text-white">{value}</div>
    <p className="mt-2 text-sm text-slate-400">{hint}</p>
  </div>
);

export function KeywordPlannerApp() {
  const [query, setQuery] = useState('small business');
  const [country, setCountry] = useState('Pakistan');
  const [language, setLanguage] = useState('English');
  const [intent, setIntent] = useState<'All' | string>('All');
  const [keywords, setKeywords] = useState<KeywordRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await fetch(`/api/keywords?q=${encodeURIComponent(query)}&intent=${encodeURIComponent(intent)}`);
      const data = await res.json();
      setKeywords((data.items || []) as KeywordRecord[]);
      setLoading(false);
    }

    loadData();
  }, [query, intent]);

  const summary = useMemo(() => {
    const total = keywords.reduce((sum, item) => sum + item.monthlySearches, 0);
    const highOpportunity = keywords.filter((item) => item.opportunityScore >= 80).length;
    const lowCompetition = keywords.filter((item) => item.difficulty <= 45).length;
    return {
      totalKeywords: keywords.length,
      monthlySearchVolume: total,
      highOpportunity,
      lowCompetition,
    };
  }, [keywords]);

  const goldenKeywords = buildGoldenKeywordFinder(query);

  if (loading) {
    return <div className="min-h-screen bg-slate-950 p-10 text-slate-200">Loading SEO intelligence platform...</div>;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-700 bg-slate-900/80 p-4 shadow-soft lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-sky-400">Private SEO Intelligence</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Keywords Planner</h1>
          </div>
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-300">
              <span className="text-slate-500">Market:</span> {country}
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-300">
              <span className="text-slate-500">Language:</span> {language}
            </div>
          </div>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <Card title="Total keywords" value={String(summary.totalKeywords)} hint="Research items in current dataset" />
          <Card title="Monthly searches" value={summary.monthlySearchVolume.toLocaleString()} hint="Estimated Google demand" />
          <Card title="High opportunity" value={String(summary.highOpportunity)} hint="Opportunity score 80+" />
          <Card title="Trending" value="4" hint="Rising keyword momentum" />
          <Card title="Low-comp opportunities" value={String(summary.lowCompetition)} hint="Difficulty <= 45" />
        </section>

        <section className="mb-8 grid gap-4 lg:grid-cols-[1.5fr_0.7fr]">
          <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Keyword research</h2>
              <button className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">Export CSV</button>
            </div>

            <div className="grid gap-3 md:grid-cols-[1.2fr_0.6fr_0.6fr]">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none ring-0 focus:border-sky-400"
                placeholder="Search keyword, topic or niche"
              />
              <select value={country} onChange={(event) => setCountry(event.target.value)} className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-400">
                {countries.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <select value={language} onChange={(event) => setLanguage(event.target.value)} className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-400">
                {languages.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {intentFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setIntent(filter)}
                  className={intent === filter ? 'rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950' : 'rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-300'}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-soft">
            <h2 className="text-xl font-semibold text-white">Project overview</h2>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950 p-3"><span>Saved projects</span><strong className="text-white">3</strong></div>
              <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950 p-3"><span>Competitors tracked</span><strong className="text-white">8</strong></div>
              <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950 p-3"><span>Reports generated</span><strong className="text-white">12</strong></div>
              <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950 p-3"><span>Data source</span><strong className="text-white">Demo mode</strong></div>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
          <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Keyword research results</h2>
              <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-300">Estimated values</span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-700 text-slate-400">
                  <tr>
                    <th className="pb-3 pr-4">Keyword</th>
                    <th className="pb-3 pr-4">Volume</th>
                    <th className="pb-3 pr-4">Intent</th>
                    <th className="pb-3 pr-4">Difficulty</th>
                    <th className="pb-3 pr-4">Opportunity</th>
                  </tr>
                </thead>
                <tbody>
                  {keywords.map((item) => (
                    <tr key={item.keyword} className="border-b border-slate-800 text-slate-200">
                      <td className="py-3 pr-4">
                        <div>
                          <div className="font-medium text-white">{item.keyword}</div>
                          <div className="text-xs text-slate-400">{item.keywordType} • {item.source}</div>
                        </div>
                      </td>
                      <td className="py-3 pr-4">{item.monthlySearches.toLocaleString()}</td>
                      <td className="py-3 pr-4">{item.intent}</td>
                      <td className="py-3 pr-4">{item.difficulty}</td>
                      <td className="py-3 pr-4">
                        <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs font-semibold text-emerald-300">{item.opportunityScore}/100</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-soft">
            <h2 className="text-xl font-semibold text-white">Golden keyword finder</h2>
            <div className="mt-5 space-y-3">
              {goldenKeywords.slice(0, 3).map((item) => (
                <div key={item.keyword} className="rounded-2xl border border-slate-700 bg-slate-950 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-medium text-white">{item.keyword}</div>
                    <span className="rounded-full bg-sky-500/15 px-2 py-1 text-xs font-semibold text-sky-300">{item.opportunityScore}/100</span>
                  </div>
                  <div className="mt-2 text-xs text-slate-400">Volume {item.searchVolume.toLocaleString()} • Intent {item.searchIntent}</div>
                  <p className="mt-2 text-sm text-slate-300">{item.rankingOpportunity}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-soft lg:col-span-2">
            <h2 className="text-xl font-semibold text-white">Competitor SEO analysis</h2>
            <div className="mt-5 space-y-3">
              {['semrush.com', 'ahrefs.com', 'moz.com'].map((domain) => (
                <div key={domain} className="rounded-2xl border border-slate-700 bg-slate-950 p-3 text-sm text-slate-300">
                  <div className="flex items-center justify-between">
                    <strong className="text-white">{domain}</strong>
                    <span className="text-sky-300">keyword gap: 72</span>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-3 text-xs text-slate-400">
                    <div>Traffic <span className="block text-slate-200">2.9M</span></div>
                    <div>Keywords <span className="block text-slate-200">820k</span></div>
                    <div>Authority <span className="block text-slate-200">93</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-soft">
            <h2 className="text-xl font-semibold text-white">Trending keywords</h2>
            <div className="mt-5 space-y-3">
              {['AI SEO tools', 'website audit checklist', 'Google AI overview'].map((term) => (
                <div key={term} className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-950 p-3 text-sm text-slate-300">
                  <span>{term}</span>
                  <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs text-emerald-300">Rising</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-soft">
            <h2 className="text-xl font-semibold text-white">SERP analysis</h2>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <div className="rounded-2xl border border-slate-700 bg-slate-950 p-3"><strong className="text-white">#1</strong> keywordstudio.com</div>
              <div className="rounded-2xl border border-slate-700 bg-slate-950 p-3"><strong className="text-white">#2</strong> neilpatel.com</div>
              <div className="rounded-2xl border border-slate-700 bg-slate-950 p-3"><strong className="text-white">#3</strong> semrush.com</div>
              <div className="rounded-2xl border border-slate-700 bg-slate-950 p-3"><strong className="text-white">Featured snippet</strong> how-to article with comparison table</div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-soft">
            <h2 className="text-xl font-semibold text-white">Website SEO audit</h2>
            <div className="mt-5 space-y-3">
              {['Title tag length', 'Internal linking', 'Canonical tags', 'Image alt text'].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-950 p-3 text-sm text-slate-300">
                  <span>{item}</span>
                  <span className="rounded-full bg-amber-500/15 px-2 py-1 text-xs text-amber-300">Needs attention</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-soft">
          <h2 className="text-xl font-semibold text-white">Content strategy and social media ideas</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {['Instagram', 'LinkedIn', 'YouTube'].map((platform) => (
              <div key={platform} className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
                <div className="mb-2 text-sm uppercase tracking-[0.18em] text-sky-300">{platform}</div>
                <div className="text-lg font-semibold text-white">3 simple SEO mistakes killing your reach</div>
                <p className="mt-2 text-sm text-slate-300">Carousel • quick wins for title tags, internal links, and on-page copy.</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

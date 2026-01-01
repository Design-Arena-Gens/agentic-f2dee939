'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

type MacroSignal = {
  id: string;
  label: string;
  description: string;
  catalysts: string[];
  timeline: 'now' | '60d' | '120d';
};

type Idea = {
  domain: string;
  tld: string;
  thesis: string;
  priceWindow: string;
  conviction: number;
  catalysts: string[];
  counterMoves: string[];
  whyNow: string;
  theme: string;
};

const macroSignals: MacroSignal[] = [
  {
    id: 'aibuilder',
    label: 'AI Builder Stack',
    description:
      'On-device AI tooling and workflow automation for indie developers is exploding as models shrink.',
    catalysts: ['Apple WWDC on-device AI kit', 'NVIDIA earnings July', 'Open-source GGUF surge'],
    timeline: '60d'
  },
  {
    id: 'climate',
    label: 'Climate Resilience',
    description:
      'Heat mitigation, microgrid management, and water security keywords trend every summer spike.',
    catalysts: ['US DOE resilience grants', 'Hurricane season coverage', 'Paris Olympics heat prep'],
    timeline: 'now'
  },
  {
    id: 'fediverse',
    label: 'Open Social / Fediverse',
    description:
      'Threads + Mastodon integration and EU regulatory pressure on walled gardens drive migrations.',
    catalysts: ['EU DMA enforcement', 'Twitter rate-limit fallout', 'Threads ActivityPub roadmap'],
    timeline: '60d'
  },
  {
    id: 'longevity',
    label: 'Longevity Consumerization',
    description:
      'GLP-1, wearable biomarker diagnostics, and supplement stacks create DTC boom opportunities.',
    catalysts: ['Novo Nordisk OTC updates', 'WHO metabolic summit', 'Virta Health IPO rumors'],
    timeline: '120d'
  },
  {
    id: 'micro-saas',
    label: 'Micro-SaaS Niches',
    description:
      'Creators monetizing single-purpose SaaS tools; high search intent for plug-and-play brandables.',
    catalysts: ['Product Hunt daily launches', 'LemonSqueezy workflow pushes', 'Stripe data exports'],
    timeline: 'now'
  }
];

const curatedIdeas: Idea[] = [
  {
    domain: 'promptforge.ai',
    tld: '.ai',
    thesis:
      'Forge-as-a-service platform branding for teams building bespoke multi-agent workflows as on-device inference takes off.',
    priceWindow: '$2.2k → $12k',
    conviction: 88,
    catalysts: ['WWDC24: Apple Intelligence SDK', 'Meta Llama 4 release wave', 'Indie hacker adoption'],
    counterMoves: ['Verify TM conflicts with AI Forge studio', 'Capture alt tlds (.io, .dev)'],
    whyNow: 'High-intent searches for “prompt automation” and “AI agent factory” show 320% QoQ growth.',
    theme: 'AI Builder Stack'
  },
  {
    domain: 'heatshield.tech',
    tld: '.tech',
    thesis:
      'Climate resilience brand targeting B2B microgrid or HVAC retrofits; Google Trends show multi-year summer spikes.',
    priceWindow: '$1.1k → $8.5k',
    conviction: 81,
    catalysts: ['US South heat dome coverage', 'DOE Heat Pump rebate rollouts', 'Climate venture funding uptick'],
    counterMoves: ['Secure matching brand socials', 'Bundle HVAC/industrial keywords in blog cluster'],
    whyNow: 'Seasonal heat extremes and grid failures drive emergency procurement budgets in next 60 days.',
    theme: 'Climate Resilience'
  },
  {
    domain: 'meshverse.social',
    tld: '.social',
    thesis:
      'Positioning for corporate-fediverse onboarding solutions; attractive for SaaS bridging Slack/Discord to ActivityPub.',
    priceWindow: '$680 → $5.2k',
    conviction: 75,
    catalysts: ['Threads ActivityPub expansion', 'Mastodon enterprise pilots', 'EU DMA messaging interoperability push'],
    counterMoves: ['Consider .io to attract B2B SaaS buyers', 'Publish positioning deck fast'],
    whyNow: 'Keyword “fediverse onboarding” growing 410% MoM; corporate compliance teams scouting brandables.',
    theme: 'Open Social / Fediverse'
  },
  {
    domain: 'longevist.com',
    tld: '.com',
    thesis:
      'Hybrid editorial + marketplace brand for high-end longevity stacks; name blends “longevity” + “vist” (futurist vision).',
    priceWindow: '$2.8k → $17k',
    conviction: 83,
    catalysts: ['GLP-1 OTC trials news cycle', 'A16Z Bio + Tech Summit', 'Reddit r/Biohackers migrating to owned communities'],
    counterMoves: ['Draft thought-leadership microsite', 'Pair with newsletter subdomain'],
    whyNow: 'Longevity commerce search demand hitting ATH; premium .com supply tightening rapidly.',
    theme: 'Longevity Consumerization'
  },
  {
    domain: 'quotaops.com',
    tld: '.com',
    thesis:
      'Operator-focused sales ops automation brand; cross of “quota” + “ops” aligns with exploding RevOps SaaS tooling.',
    priceWindow: '$1.9k → $9.1k',
    conviction: 78,
    catalysts: ['Salesforce Hyperforce updates', 'Clari/HubSpot AI copilot hype', 'LinkedIn RevOps community growth'],
    counterMoves: ['Secure LinkedIn showcase page', 'Publish MVP automations dataset'],
    whyNow: 'RevOps job listings up 72% YoY; customers actively hunting turnkey naming assets.',
    theme: 'Micro-SaaS Niches'
  },
  {
    domain: 'gridcache.io',
    tld: '.io',
    thesis:
      'Edge microgrid orchestration naming; perfect for startups managing virtual power plant assets or EV fleet load balancing.',
    priceWindow: '$1.4k → $10.2k',
    conviction: 80,
    catalysts: ['Virtual power plant policy incentives', 'EV fleet news cycle', 'Blackout resilience coverage'],
    counterMoves: ['Bundle .energy or .app variant', 'Build expert interview hub to capture lead gen'],
    whyNow: 'Rising RFPs speaking to “grid cache” architectures; low competition for pronounceable two-worders.',
    theme: 'Climate Resilience'
  }
];

const tldSignals: Record<
  string,
  {
    momentum: number;
    narrative: string;
  }
> = {
  '.ai': { momentum: 96, narrative: 'VC-led AI boom anchoring premium comps at 5-8x YoY.' },
  '.io': { momentum: 84, narrative: 'Still beloved by SaaS buyers; liquidity steady on MicroAcquire.', },
  '.com': { momentum: 91, narrative: 'King of resale velocity; brand managers still default here.' },
  '.tech': { momentum: 73, narrative: 'Affordable entry with clear technology signal for climate + robotics.' },
  '.social': { momentum: 62, narrative: 'Rise of ActivityPub + community SaaS increase exit paths.' },
  '.xyz': { momentum: 69, narrative: 'Crypto and DeSci rebound energizes modern brand aesthetics.' }
};

const palettes = [
  { primary: '#6c5ce7', accent: '#00cec9', glass: 'rgba(15, 12, 30, 0.75)' },
  { primary: '#fd79a8', accent: '#81ecec', glass: 'rgba(30, 8, 26, 0.75)' },
  { primary: '#00b894', accent: '#ffeaa7', glass: 'rgba(4, 24, 21, 0.78)' }
];

const baseSuggestions = [
  'forge',
  'mesh',
  'shield',
  'cache',
  'delta',
  'stack',
  'drift',
  'pulse',
  'vista',
  'spark',
  'loop',
  'amp',
  'vector',
  'sprint',
  'horizon',
  'summit',
  'anchor',
  'prime'
];

const extensionOptions = Object.keys(tldSignals);

const riskProfiles = [
  { id: 'aggressive', label: 'Aggressive (flip inside 30 days)', multiplier: 1.35 },
  { id: 'balanced', label: 'Balanced (60-120 day target)', multiplier: 1 },
  { id: 'patient', label: 'Patient (brand build, >6 months)', multiplier: 0.78 }
] as const;

type RiskProfile = (typeof riskProfiles)[number]['id'];

function pickPalette(seed: string) {
  const index =
    seed
      .split('')
      .map((char) => char.charCodeAt(0))
      .reduce((acc, curr) => acc + curr, 0) % palettes.length;

  return palettes[index];
}

function synthesizeDomain(seed: string, ext: string) {
  const normalizedSeed = seed.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  if (!normalizedSeed) {
    return null;
  }

  const word =
    baseSuggestions[
      normalizedSeed.length % baseSuggestions.length
    ];

  const combos = [
    `${normalizedSeed}${word}`,
    `${word}${normalizedSeed}`,
    `${normalizedSeed}${normalizedSeed.slice(-2)}${word.slice(0, 2)}`,
    `${normalizedSeed}${word.slice(-3)}`,
    `${word}${normalizedSeed.slice(0, 3)}`
  ];

  const candidate = combos.find((combo) => combo.length <= 15) ?? combos[0];
  return `${candidate}.${ext.replace('.', '')}`;
}

function computeScore(conviction: number, risk: RiskProfile) {
  const multiplier = riskProfiles.find((profile) => profile.id === risk)?.multiplier ?? 1;
  return Math.min(100, Math.round(conviction * multiplier));
}

export default function Page() {
  const [selectedSignal, setSelectedSignal] = useState<MacroSignal['id']>('aibuilder');
  const [selectedTld, setSelectedTld] = useState<string>('.ai');
  const [riskProfile, setRiskProfile] = useState<RiskProfile>('balanced');
  const [seed, setSeed] = useState<string>('quantum');

  const palette = useMemo(() => pickPalette(selectedSignal + selectedTld), [selectedSignal, selectedTld]);

  const filteredIdeas = useMemo(() => {
    const match = macroSignals.find((signal) => signal.id === selectedSignal)?.label;
    return curatedIdeas
      .filter((idea) => (match ? idea.theme === match : true))
      .map((idea) => ({
        ...idea,
        conviction: computeScore(idea.conviction, riskProfile)
      }));
  }, [selectedSignal, riskProfile]);

  const syntheticDomain = useMemo(() => {
    const candidate = synthesizeDomain(seed || 'alpha', selectedTld);
    if (!candidate) return null;

    const tldMeta = tldSignals[selectedTld];
    return {
      domain: candidate,
      rationale: `Blends seed keyword momentum with ${selectedTld} liquidity profile. ${tldMeta?.narrative ?? ''}`.trim(),
      confidence: Math.round((tldMeta?.momentum ?? 60) * (riskProfile === 'aggressive' ? 1.1 : riskProfile === 'patient' ? 0.85 : 1)),
      momentum: tldMeta?.momentum ?? 60
    };
  }, [seed, selectedTld, riskProfile]);

  return (
    <div
      className="min-h-screen"
      style={{
        background: `radial-gradient(circle at 20% 20%, ${palette.accent}22, transparent 40%), radial-gradient(circle at 80% 0%, ${palette.primary}33, transparent 45%), #04040B`,
        color: '#f4f6ff'
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 sm:px-10 lg:px-16">
        <header className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-semibold sm:text-4xl lg:text-5xl"
          >
            Domain Surge Forecaster
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-2xl text-base text-slate-200/80 sm:text-lg"
          >
            Curated naming intel for fast-moving trends. Pick a signal, dial in risk appetite, and ship a brandable asset positioned to appreciate within the next 30-120 days.
          </motion.p>
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          <div
            className="col-span-2 space-y-4 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 p-6 backdrop-blur"
            style={{ boxShadow: `0 25px 60px -25px ${palette.primary}44` }}
          >
            <h2 className="text-lg font-semibold text-white/90">Macro Signals</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {macroSignals.map((signal) => (
                <button
                  key={signal.id}
                  onClick={() => setSelectedSignal(signal.id)}
                  className={clsx(
                    'rounded-2xl border px-5 py-4 text-left transition',
                    selectedSignal === signal.id
                      ? 'border-white/40 bg-white/10 text-white shadow-lg shadow-black/40'
                      : 'border-white/10 bg-white/5 text-slate-200/80 hover:border-white/20 hover:bg-white/10'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold uppercase tracking-wide text-white/70">
                      {signal.label}
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">
                      {signal.timeline === 'now' ? 'Immediate' : signal.timeline === '60d' ? '30-60d' : '60-120d'}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-200/70">{signal.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {signal.catalysts.map((catalyst) => (
                      <span
                        key={catalyst}
                        className="rounded-full bg-black/40 px-3 py-1 text-[11px] uppercase tracking-wide text-white/60"
                      >
                        {catalyst}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div
            className="space-y-5 rounded-3xl border border-white/10 p-6"
            style={{
              background: palette.glass,
              boxShadow: `0 20px 45px -20px ${palette.accent}66`
            }}
          >
            <h2 className="text-lg font-semibold text-white/90">Control Panel</h2>
            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-wide text-white/60">
                Preferred Extension
              </label>
              <div className="flex flex-wrap gap-2">
                {extensionOptions.map((ext) => (
                  <button
                    key={ext}
                    onClick={() => setSelectedTld(ext)}
                    className={clsx(
                      'rounded-full border px-4 py-1.5 text-sm transition',
                      selectedTld === ext
                        ? 'border-white/40 bg-white/15 text-white shadow-lg shadow-black/30'
                        : 'border-white/15 bg-black/40 text-white/70 hover:border-white/25 hover:text-white'
                    )}
                  >
                    {ext}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-wide text-white/60">
                Risk Appetite
              </label>
              <div className="grid gap-2">
                {riskProfiles.map((profile) => (
                  <button
                    key={profile.id}
                    onClick={() => setRiskProfile(profile.id)}
                    className={clsx(
                      'rounded-2xl border px-4 py-2 text-left text-sm transition',
                      riskProfile === profile.id
                        ? 'border-white/40 bg-white/15 text-white shadow-lg'
                        : 'border-white/15 bg-black/40 text-white/75 hover:border-white/25 hover:text-white'
                    )}
                  >
                    <div className="font-semibold">{profile.label}</div>
                    <div className="text-xs text-white/60">
                      Momentum multiplier {profile.multiplier.toFixed(2)}×
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-wide text-white/60">
                Seed Keyword
              </label>
              <input
                value={seed}
                onChange={(event) => setSeed(event.target.value)}
                placeholder="e.g. quantum, urban, pulse"
                className="w-full rounded-2xl border border-white/20 bg-black/30 px-4 py-3 text-sm text-white outline-none ring-0 transition focus:border-white/50 focus:bg-black/50"
              />
              {syntheticDomain && (
                <div className="rounded-2xl border border-white/15 bg-black/35 px-4 py-3 text-sm text-white/80">
                  <div className="text-xs uppercase tracking-wide text-white/40">Synthetic Pick</div>
                  <div className="mt-1 text-lg font-semibold text-white">
                    {syntheticDomain.domain}
                  </div>
                  <p className="mt-2 text-xs text-white/60">{syntheticDomain.rationale}</p>
                  <div className="mt-3 flex gap-3 text-[11px] text-white/60">
                    <span>Momentum: {syntheticDomain.momentum}</span>
                    <span>Confidence: {syntheticDomain.confidence}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-white/90">High-Conviction Picks</h2>
            <span className="rounded-full border border-white/10 bg-black/30 px-4 py-1 text-xs uppercase tracking-wide text-white/60">
              Signals refreshed {new Date().toLocaleDateString()}
            </span>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {filteredIdeas.map((idea) => (
              <motion.article
                key={idea.domain}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/8 p-6 backdrop-blur"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[13px] uppercase tracking-wide text-white/50">
                        {idea.theme}
                      </div>
                      <h3 className="text-2xl font-semibold text-white">{idea.domain}</h3>
                    </div>
                    <div className="rounded-2xl bg-black/40 px-4 py-2 text-right">
                      <div className="text-xs uppercase tracking-wide text-white/50">
                        Price Trajectory
                      </div>
                      <div className="text-sm font-semibold text-white">{idea.priceWindow}</div>
                    </div>
                  </div>

                  <p className="text-sm text-white/75">{idea.thesis}</p>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span>Conviction Score</span>
                      <span>{idea.conviction}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${idea.conviction}%`,
                          background: `linear-gradient(90deg, ${palette.accent}, ${palette.primary})`
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 grid gap-3 text-sm">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-white/45">Catalysts</div>
                    <ul className="mt-2 space-y-1 text-white/75">
                      {idea.catalysts.map((catalyst) => (
                        <li key={catalyst}>• {catalyst}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-white/45">Counter Moves</div>
                    <ul className="mt-2 space-y-1 text-white/75">
                      {idea.counterMoves.map((move) => (
                        <li key={move}>• {move}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-black/40 px-4 py-3 text-xs text-white/60">
                    <strong className="font-semibold text-white/80">Why now: </strong>
                    {idea.whyNow}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6 text-sm text-white/70">
            <h3 className="text-lg font-semibold text-white/90">Exit Models</h3>
            <ul className="mt-3 space-y-2">
              <li>• Bundle close-comps (.io/.app) and price anchor via GoDaddy Premium.</li>
              <li>• Craft a one-page Notion teaser with target buyer list to accelerate outreach.</li>
              <li>• Track auctions on NameBio + Squadhelp to benchmark actual comps weekly.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6 text-sm text-white/70">
            <h3 className="text-lg font-semibold text-white/90">Execution Playbook</h3>
            <ul className="mt-3 space-y-2">
              <li>• Register domain + matching Twitter/LinkedIn handle same day.</li>
              <li>• Launch lightweight landing page on Vercel with CTA collecting inbound.</li>
              <li>• Syndicate across IndieHackers, Trends.vc, and relevant subreddits.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6 text-sm text-white/70">
            <h3 className="text-lg font-semibold text-white/90">Guardrails</h3>
            <ul className="mt-3 space-y-2">
              <li>• Run USPTO + EUIPO quick search to avoid trademark collisions.</li>
              <li>• Avoid registering clear corporate marks or celebrity names.</li>
              <li>• Monitor regulatory updates that could shift demand narratives.</li>
            </ul>
          </div>
        </section>

        <footer className="rounded-3xl border border-white/8 bg-white/5 px-6 py-5 text-xs text-white/55">
          Not financial advice. Domain market is illiquid; validate with real buyer discovery before overextending capital. Refresh signals weekly to stay aligned with catalysts.
        </footer>
      </div>
    </div>
  );
}

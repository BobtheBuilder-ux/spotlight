import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Play,
  CheckCircle,
  TrendingUp,
  Users,
  Zap,
  Target,
  BarChart3,
  ChevronRight,
  Star,
  Eye,
  MessageSquare,
  DollarSign,
  Award,
  Mic,
  Tv2,
  Filter,
  Globe,
} from 'lucide-react';

// ─── Reusable Components ────────────────────────────────────────────────────

function Badge({ children, color = 'blue' }: { children: React.ReactNode; color?: 'blue' | 'green' | 'red' }) {
  const colors = {
    blue: 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20',
    green: 'bg-brand-green/10 text-brand-green border border-brand-green/20',
    red: 'bg-brand-red/10 text-brand-red border border-brand-red/20',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase font-body ${colors[color]}`}>
      {children}
    </span>
  );
}

function PrimaryButton({ children, onClick, className = '' }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-light text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-200 hover:shadow-[0_0_24px_rgba(31,111,235,0.45)] active:scale-95 font-body text-sm ${className}`}
    >
      {children}
      <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
    </button>
  );
}

function SecondaryButton({ children, onClick, className = '' }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center gap-2 bg-transparent border border-ink-300/30 hover:border-ink-300/60 text-ink-200 hover:text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-200 font-body text-sm ${className}`}
    >
      {children}
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="h-px w-6 bg-brand-blue" />
      <span className="text-brand-blue text-xs font-semibold tracking-widest uppercase font-body">{children}</span>
      <div className="h-px w-6 bg-brand-blue" />
    </div>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─── Nav ────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-navy-950/95 backdrop-blur-md border-b border-white/5 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-brand-blue flex items-center justify-center">
            <Tv2 size={18} className="text-white" />
          </div>
          <span className="font-heading font-800 text-white text-sm tracking-tight">
            Seed Stage <span className="text-brand-blue">Spotlight</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-7">
          {['How It Works', 'For Founders', 'For Investors', 'Episodes'].map((item) => (
            <a key={item} href="#" className="text-ink-300 hover:text-white text-sm font-medium transition-colors duration-150 font-body">
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <SecondaryButton className="!px-4 !py-2 text-xs">Watch Episodes</SecondaryButton>
          <PrimaryButton className="!px-4 !py-2 text-xs">Apply to Pitch</PrimaryButton>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-ink-300 hover:text-white transition-colors p-1">
          <div className="space-y-1.5">
            <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-navy-900/98 backdrop-blur-md border-t border-white/5 px-5 py-4 space-y-4">
          {['How It Works', 'For Founders', 'For Investors', 'Episodes'].map((item) => (
            <a key={item} href="#" className="block text-ink-300 hover:text-white text-sm font-medium transition-colors font-body py-1">
              {item}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <SecondaryButton className="w-full justify-center !py-2.5">Watch Episodes</SecondaryButton>
            <PrimaryButton className="w-full justify-center !py-2.5">Apply to Pitch</PrimaryButton>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function HeroVerdictBadge({ label, color }: { label: string; color: string }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold font-body ${color}`}>
      {label}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy-950">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-100 pointer-events-none" />

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-blue/8 rounded-full blur-[80px] animate-pulse-glow pointer-events-none" style={{ animationDelay: '1.5s' }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="space-y-7">
            <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <Badge color="blue">
                <span className="w-1.5 h-1.5 bg-brand-blue rounded-full inline-block animate-pulse" />
                Live Pitch Platform
              </Badge>
            </div>

            <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <h1 className="font-heading font-black text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.05] tracking-tight">
                Seed Stage{' '}
                <span className="relative inline-block">
                  <span className="text-brand-blue">Spotlight</span>
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-blue to-transparent rounded-full" />
                </span>
              </h1>
            </div>

            <div className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <p className="text-ink-200 text-xl lg:text-2xl font-medium leading-snug font-body max-w-lg">
                Where pre-seed founders pitch live to investors and compete for{' '}
                <span className="text-white font-semibold">real funding opportunities.</span>
              </p>
            </div>

            <div className="animate-fade-up" style={{ animationDelay: '0.35s' }}>
              <p className="text-ink-300 text-base font-body">
                Get visibility. Get feedback. Get in front of investors before your competitors do.
              </p>
            </div>

            <div className="animate-fade-up flex flex-wrap gap-3 pt-1" style={{ animationDelay: '0.45s' }}>
              <PrimaryButton className="!py-4 !px-8 !text-base">
                Apply to Pitch
              </PrimaryButton>
              <SecondaryButton className="!py-4 !px-8 !text-base">
                <Play size={16} />
                Watch Episodes
              </SecondaryButton>
            </div>

            <div className="animate-fade-up flex items-center gap-5 pt-2" style={{ animationDelay: '0.55s' }}>
              {[
                { val: '200+', label: 'Startups Pitched' },
                { val: '50+', label: 'Investor Partners' },
                { val: '$4M+', label: 'Funding Unlocked' },
              ].map(({ val, label }) => (
                <div key={label} className="text-center">
                  <div className="text-white font-heading font-black text-xl">{val}</div>
                  <div className="text-ink-400 text-xs font-body mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Pitch Card Visual */}
          <div className="relative flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="relative w-full max-w-sm lg:max-w-md">
              {/* Floating glow */}
              <div className="absolute inset-0 bg-brand-blue/10 rounded-3xl blur-2xl scale-110" />

              {/* Main card */}
              <div className="relative bg-navy-800/80 backdrop-blur-md border border-white/8 rounded-2xl overflow-hidden shadow-2xl">
                {/* Video frame placeholder */}
                <div className="relative bg-gradient-to-br from-navy-700 to-navy-950 aspect-video flex items-center justify-center">
                  <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
                  <div className="relative flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors group">
                      <Play size={24} className="text-white ml-1 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-center">
                      <div className="text-white text-sm font-semibold font-body">Episode 24 — Live Now</div>
                      <div className="text-ink-400 text-xs font-body mt-0.5">HealthTech · Pre-Seed · $500K Ask</div>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="flex items-center gap-1.5 bg-brand-red/90 px-2.5 py-1 rounded-md text-white text-xs font-semibold font-body">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      LIVE
                    </span>
                  </div>
                </div>

                {/* Verdict panel */}
                <div className="p-4 space-y-3">
                  <div className="text-xs text-ink-400 font-body uppercase tracking-widest font-semibold">Investor Verdict</div>
                  <div className="flex gap-2 flex-wrap">
                    <HeroVerdictBadge label="INVEST" color="bg-brand-green/10 border border-brand-green/30 text-brand-green" />
                    <HeroVerdictBadge label="FOLLOW-UP" color="bg-brand-blue/10 border border-brand-blue/30 text-brand-blue" />
                    <HeroVerdictBadge label="PASS" color="bg-brand-red/10 border border-brand-red/30 text-brand-red" />
                  </div>
                  <div className="h-px bg-white/5" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="w-7 h-7 rounded-full border-2 border-navy-800 bg-gradient-to-br from-brand-blue/60 to-brand-blue/20 flex items-center justify-center">
                            <Users size={10} className="text-white" />
                          </div>
                        ))}
                      </div>
                      <span className="text-ink-300 text-xs font-body">4 investors watching</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" />
                      <span className="text-brand-green text-xs font-body font-semibold">Live Q&A</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating score card */}
              <div className="absolute -bottom-5 -right-4 bg-navy-800/95 border border-white/10 rounded-xl p-3.5 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center">
                    <BarChart3 size={18} className="text-brand-blue" />
                  </div>
                  <div>
                    <div className="text-white font-heading font-black text-lg leading-none">82</div>
                    <div className="text-ink-400 text-xs font-body mt-0.5">Seed Readiness Score</div>
                  </div>
                </div>
              </div>

              {/* Floating interest badge */}
              <div className="absolute -top-4 -left-4 bg-navy-800/95 border border-brand-green/20 rounded-xl p-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-brand-green" />
                  <span className="text-brand-green text-xs font-semibold font-body">Interest expressed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Social Proof Strip ──────────────────────────────────────────────────────

const SOCIAL_LABELS = [
  { icon: <Users size={14} />, label: 'Startup Founders' },
  { icon: <DollarSign size={14} />, label: 'Angel Investors' },
  { icon: <TrendingUp size={14} />, label: 'VC Partners' },
  { icon: <Award size={14} />, label: 'Accelerators' },
  { icon: <Globe size={14} />, label: 'Operators & Advisors' },
  { icon: <Star size={14} />, label: 'Industry Mentors' },
  { icon: <Mic size={14} />, label: 'First-Time Founders' },
  { icon: <Target size={14} />, label: 'Growth-Stage Builders' },
];

function SocialProof() {
  const doubled = [...SOCIAL_LABELS, ...SOCIAL_LABELS];

  return (
    <div className="relative bg-navy-900 border-y border-white/5 py-4 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-navy-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-navy-900 to-transparent z-10 pointer-events-none" />

      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {doubled.map(({ icon, label }, i) => (
          <div key={i} className="flex items-center gap-2 text-ink-400 text-sm font-body shrink-0">
            <span className="text-brand-blue/60">{icon}</span>
            <span>{label}</span>
            {i !== doubled.length - 1 && <span className="ml-4 text-white/10">·</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── What This Is ─────────────────────────────────────────────────────────────

function WhatThisIs() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="relative bg-navy-950 py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-brand-blue/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className={`space-y-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <SectionLabel>What This Is</SectionLabel>
            <h2 className="font-heading font-black text-4xl lg:text-5xl text-white leading-tight">
              A launchpad for{' '}
              <span className="text-brand-blue">early-stage</span> startups
            </h2>
            <p className="text-ink-300 text-lg font-body leading-relaxed">
              Seed Stage Spotlight is a live pitch platform where early founders present their ideas to real investors, receive structured feedback, and gain exposure to potential funding opportunities.
            </p>
            <div className="space-y-2 pt-2">
              <div className="text-ink-400 text-sm font-body uppercase tracking-widest font-semibold mb-3">We help startups move from:</div>
              {[
                { step: 'Idea', desc: 'Validate your concept in front of a live audience' },
                { step: 'Validation', desc: 'Receive expert feedback and structured scoring' },
                { step: 'Investment Conversations', desc: 'Connect directly with interested investors' },
              ].map(({ step, desc }, i) => (
                <div key={step} className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mt-0.5">
                    <span className="text-brand-blue text-xs font-bold font-body">{i + 1}</span>
                  </div>
                  <div>
                    <span className="text-white font-semibold font-body text-sm">{step}</span>
                    <span className="text-ink-400 text-sm font-body"> — {desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <PrimaryButton>Apply to Pitch</PrimaryButton>
            </div>
          </div>

          {/* Right: Stats grid */}
          <div className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {[
              { icon: <Tv2 size={22} />, val: '24+', label: 'Episodes Aired', color: 'blue' },
              { icon: <Users size={22} />, val: '200+', label: 'Startups Featured', color: 'green' },
              { icon: <DollarSign size={22} />, val: '$4M+', label: 'Funding Linked', color: 'blue' },
              { icon: <TrendingUp size={22} />, val: '87%', label: 'Got Investor Feedback', color: 'green' },
            ].map(({ icon, val, label, color }) => (
              <div key={label} className="bg-navy-800/50 border border-white/6 rounded-2xl p-6 hover:border-brand-blue/20 transition-colors duration-300 group">
                <div className={`w-10 h-10 rounded-lg mb-4 flex items-center justify-center transition-colors ${color === 'blue' ? 'bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue/20' : 'bg-brand-green/10 text-brand-green group-hover:bg-brand-green/20'}`}>
                  {icon}
                </div>
                <div className="text-white font-heading font-black text-3xl">{val}</div>
                <div className="text-ink-400 text-sm font-body mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

const STEPS = [
  {
    num: '01',
    icon: <Filter size={20} />,
    title: 'Apply',
    desc: 'Submit your startup for selection. Tell us about your idea, traction, and what you\'re raising.',
    tag: 'For Founders',
  },
  {
    num: '02',
    icon: <Eye size={20} />,
    title: 'Get Selected',
    desc: 'We review early-stage founders and shortlist promising startups for each episode.',
    tag: 'Curation',
  },
  {
    num: '03',
    icon: <Mic size={20} />,
    title: 'Pitch Live',
    desc: 'Present your startup in front of investors on the show. Make your case. Answer hard questions.',
    tag: 'Live Show',
  },
  {
    num: '04',
    icon: <MessageSquare size={20} />,
    title: 'Get Feedback + Opportunities',
    desc: 'Receive investor reactions, a Seed Readiness Score, and direct follow-up interest.',
    tag: 'Outcome',
  },
];

function HowItWorks() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="bg-navy-900 py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionLabel>Process</SectionLabel>
          <h2 className="font-heading font-black text-4xl lg:text-5xl text-white mt-2 mb-4">How It Works</h2>
          <p className="text-ink-300 font-body max-w-xl mx-auto text-lg">
            From application to investment conversations in 4 structured steps.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map(({ num, icon, title, desc, tag }, i) => (
              <div
                key={num}
                className={`relative group transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="bg-navy-800/60 border border-white/6 hover:border-brand-blue/25 rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(31,111,235,0.08)] hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-xl bg-brand-blue/10 border border-brand-blue/15 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue/20 transition-colors">
                      {icon}
                    </div>
                    <span className="text-brand-blue/30 font-heading font-black text-3xl">{num}</span>
                  </div>
                  <div className="mb-2">
                    <Badge color="blue">{tag}</Badge>
                  </div>
                  <h3 className="text-white font-heading font-bold text-xl mt-3 mb-2">{title}</h3>
                  <p className="text-ink-300 text-sm font-body leading-relaxed">{desc}</p>
                </div>

                {i < STEPS.length - 1 && (
                  <div className="hidden lg:flex absolute top-12 -right-3 z-10 items-center justify-center">
                    <ChevronRight size={16} className="text-brand-blue/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Investor Section ─────────────────────────────────────────────────────────

const CRITERIA = [
  { icon: <Target size={16} />, label: 'Market Potential' },
  { icon: <Zap size={16} />, label: 'Execution Strength' },
  { icon: <BarChart3 size={16} />, label: 'Business Model' },
  { icon: <TrendingUp size={16} />, label: 'Traction' },
];

const INVESTOR_ACTIONS = [
  { icon: <CheckCircle size={16} />, label: 'Express Interest', color: 'text-brand-green', bg: 'bg-brand-green/10 border-brand-green/20' },
  { icon: <MessageSquare size={16} />, label: 'Request Follow-Ups', color: 'text-brand-blue', bg: 'bg-brand-blue/10 border-brand-blue/20' },
  { icon: <Eye size={16} />, label: 'Pass With Feedback', color: 'text-ink-300', bg: 'bg-white/5 border-white/10' },
];

function InvestorSection() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="bg-navy-950 py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual panel */}
          <div className={`space-y-4 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-navy-800/60 border border-white/8 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex -space-x-2">
                  {['A', 'B', 'C', 'D'].map((l) => (
                    <div key={l} className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-blue/40 to-brand-blue/10 border-2 border-navy-800 flex items-center justify-center">
                      <span className="text-white text-xs font-bold font-body">{l}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-white text-sm font-semibold font-body">Episode Panel</div>
                  <div className="text-ink-400 text-xs font-body">4 active investors</div>
                </div>
                <div className="ml-auto">
                  <span className="flex items-center gap-1.5 bg-brand-red/10 border border-brand-red/20 px-2.5 py-1 rounded-md text-brand-red text-xs font-semibold font-body">
                    <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
                    LIVE
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {CRITERIA.map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-3 bg-navy-900/60 rounded-lg px-4 py-3">
                    <span className="text-brand-blue">{icon}</span>
                    <span className="text-ink-200 text-sm font-body font-medium">{label}</span>
                    <div className="ml-auto flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i < 4 ? 'bg-brand-blue' : 'bg-white/10'}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {INVESTOR_ACTIONS.map(({ icon, label, color, bg }) => (
                <div key={label} className={`${bg} border rounded-xl p-3.5 text-center transition-colors hover:opacity-90`}>
                  <div className={`flex justify-center mb-2 ${color}`}>{icon}</div>
                  <div className={`text-xs font-semibold font-body ${color}`}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Copy */}
          <div className={`space-y-6 transition-all duration-700 delay-150 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <SectionLabel>For Investors</SectionLabel>
            <h2 className="font-heading font-black text-4xl lg:text-5xl text-white leading-tight">
              Real investors.{' '}
              <span className="text-brand-blue">Real feedback.</span>{' '}
              Real decisions.
            </h2>
            <p className="text-ink-300 text-lg font-body leading-relaxed">
              Each episode features active investors, operators, and advisors who evaluate startups based on rigorous criteria — and deliver verdicts in real time.
            </p>
            <div className="bg-navy-800/40 border border-white/6 rounded-xl p-5 space-y-4">
              <div className="text-xs text-ink-400 font-body uppercase tracking-widest font-semibold">Investor Benefits</div>
              {[
                'Early deal flow before mainstream rounds',
                'Founder-first insights and candid pitches',
                'Direct pitch interaction and Q&A',
                'Build your public profile as an investor',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle size={14} className="text-brand-green mt-0.5 flex-shrink-0" />
                  <span className="text-ink-200 text-sm font-body">{item}</span>
                </div>
              ))}
            </div>
            <PrimaryButton>Become an Investor Panel Guest</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Scoring System ───────────────────────────────────────────────────────────

const SCORING_CRITERIA = [
  { label: 'Problem Clarity', score: 90 },
  { label: 'Market Size', score: 75 },
  { label: 'Solution Strength', score: 82 },
  { label: 'Traction', score: 60 },
  { label: 'Founder Execution', score: 88 },
  { label: 'Business Model', score: 70 },
];

function ScoreBar({ label, score, inView }: { label: string; score: number; inView: boolean }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-ink-200 text-sm font-body font-medium">{label}</span>
        <span className="text-white font-heading font-bold text-sm">{score}</span>
      </div>
      <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-blue to-brand-blue-light rounded-full transition-all duration-1000 ease-out"
          style={{ width: inView ? `${score}%` : '0%', transitionDelay: '300ms' }}
        />
      </div>
    </div>
  );
}

function ScoringSection() {
  const { ref, inView } = useInView();

  const totalScore = Math.round(SCORING_CRITERIA.reduce((sum, c) => sum + c.score, 0) / SCORING_CRITERIA.length);

  return (
    <section ref={ref} className="bg-navy-900 py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div className={`space-y-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <SectionLabel>Scoring System</SectionLabel>
            <h2 className="font-heading font-black text-4xl lg:text-5xl text-white leading-tight">
              Seed Readiness Score{' '}
              <span className="text-ink-400 font-normal text-2xl">(0–100)</span>
            </h2>
            <p className="text-ink-300 text-lg font-body leading-relaxed">
              Every startup that pitches receives a structured Seed Readiness Score based on six key dimensions — giving founders actionable, comparable feedback.
            </p>
            <div className="bg-navy-800/40 border border-white/6 rounded-xl p-5">
              <p className="text-ink-400 text-sm font-body">
                The score benchmarks founders against funded startups at the same stage and helps investors make faster, more informed decisions.
              </p>
            </div>
            <PrimaryButton>Apply to Get Scored</PrimaryButton>
          </div>

          {/* Right: Score visualization */}
          <div className={`transition-all duration-700 delay-150 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-navy-800/60 border border-white/8 rounded-2xl p-7">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-ink-400 text-xs font-body uppercase tracking-widest font-semibold mb-1">Overall Score</div>
                  <div className="flex items-end gap-2">
                    <span className="text-white font-heading font-black text-5xl">{totalScore}</span>
                    <span className="text-ink-400 font-body text-lg mb-1">/100</span>
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-brand-blue/30 flex items-center justify-center relative">
                  <div
                    className="absolute inset-0 rounded-full border-4 border-brand-blue border-r-transparent transition-all duration-1000"
                    style={{ transform: `rotate(${inView ? totalScore * 3.6 : 0}deg)`, transitionDelay: '200ms' }}
                  />
                  <BarChart3 size={20} className="text-brand-blue" />
                </div>
              </div>

              <div className="space-y-4">
                {SCORING_CRITERIA.map(({ label, score }) => (
                  <ScoreBar key={label} label={label} score={score} inView={inView} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── For Founders CTA Block ───────────────────────────────────────────────────

function ForFounders() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="bg-navy-950 py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className={`max-w-3xl mx-auto text-center space-y-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionLabel>For Founders</SectionLabel>
          <h2 className="font-heading font-black text-4xl lg:text-5xl text-white leading-tight">
            Want to pitch your startup?
          </h2>
          <p className="text-ink-300 text-lg font-body leading-relaxed">
            We're looking for builders who are serious about their vision and ready to face hard questions from investors.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 text-left">
            {[
              { icon: <Zap size={16} />, label: 'Pre-seed startups', desc: 'Raising your first round' },
              { icon: <CheckCircle size={16} />, label: 'MVP-stage companies', desc: 'Product built, now seeking validation' },
              { icon: <TrendingUp size={16} />, label: 'Early traction businesses', desc: 'Revenue or user growth underway' },
              { icon: <Star size={16} />, label: 'First-time founders', desc: 'Strong ideas, strong drive' },
            ].map(({ icon, label, desc }) => (
              <div key={label} className="flex items-start gap-3 bg-navy-800/40 border border-white/6 rounded-xl p-4 hover:border-brand-blue/20 transition-colors duration-300">
                <span className="text-brand-blue mt-0.5 flex-shrink-0">{icon}</span>
                <div>
                  <div className="text-white font-semibold text-sm font-body">{label}</div>
                  <div className="text-ink-400 text-xs font-body mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-2">
            <PrimaryButton className="!px-10 !py-4 !text-base">
              Apply to Pitch Now
            </PrimaryButton>
            <p className="text-ink-400 text-sm font-body">
              Selection is limited per episode. Apply early.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Episodes Section ─────────────────────────────────────────────────────────

const EPISODES = [
  {
    title: 'MindBridge AI — Mental health platform using adaptive therapy models',
    ep: 'EP 24',
    outcome: 'INVEST',
    sector: 'HealthTech',
    ask: '$750K',
    outcomeColor: 'text-brand-green border-brand-green/30 bg-brand-green/10',
    thumbnail: 'https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'FlowChain — Supply chain automation for SMBs using blockchain verification',
    ep: 'EP 23',
    outcome: 'FOLLOW-UP',
    sector: 'FinTech',
    ask: '$1.2M',
    outcomeColor: 'text-brand-blue border-brand-blue/30 bg-brand-blue/10',
    thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'GreenGrid — Smart energy management for residential solar installations',
    ep: 'EP 22',
    outcome: 'PASS',
    sector: 'CleanTech',
    ask: '$500K',
    outcomeColor: 'text-brand-red border-brand-red/30 bg-brand-red/10',
    thumbnail: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'CodeMentor Pro — AI-powered code review and mentorship for junior developers',
    ep: 'EP 21',
    outcome: 'INVEST',
    sector: 'EdTech',
    ask: '$400K',
    outcomeColor: 'text-brand-green border-brand-green/30 bg-brand-green/10',
    thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'HireOS — Automated candidate screening powered by behavioral analytics',
    ep: 'EP 20',
    outcome: 'FOLLOW-UP',
    sector: 'HRTech',
    ask: '$800K',
    outcomeColor: 'text-brand-blue border-brand-blue/30 bg-brand-blue/10',
    thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'NutriSense — Personalized nutrition tracking using continuous glucose monitoring',
    ep: 'EP 19',
    outcome: 'INVEST',
    sector: 'HealthTech',
    ask: '$1M',
    outcomeColor: 'text-brand-green border-brand-green/30 bg-brand-green/10',
    thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

function EpisodeCard({ ep, title, outcome, sector, ask, outcomeColor, thumbnail }: typeof EPISODES[0]) {
  return (
    <div className="group bg-navy-800/50 border border-white/6 hover:border-white/12 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
      <div className="relative overflow-hidden">
        <img src={thumbnail} alt={title} className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-navy-950/80 backdrop-blur-sm text-ink-300 text-xs font-semibold font-body px-2.5 py-1 rounded-md">{ep}</span>
          <span className="bg-navy-950/80 backdrop-blur-sm text-ink-300 text-xs font-semibold font-body px-2.5 py-1 rounded-md">{sector}</span>
        </div>
        <div className="absolute bottom-3 right-3">
          <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play size={14} className="text-white ml-0.5" />
          </div>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <p className="text-ink-200 text-sm font-body leading-snug line-clamp-2">{title}</p>
        <div className="flex items-center justify-between">
          <span className={`text-xs font-bold font-body border px-2.5 py-1 rounded-md ${outcomeColor}`}>{outcome}</span>
          <span className="text-ink-400 text-xs font-body">Ask: <span className="text-ink-200 font-semibold">{ask}</span></span>
        </div>
      </div>
    </div>
  );
}

function Episodes() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="bg-navy-900 py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <SectionLabel>Episodes</SectionLabel>
            <h2 className="font-heading font-black text-4xl lg:text-5xl text-white mt-2">Latest Episodes</h2>
          </div>
          <SecondaryButton>
            <Play size={14} />
            View All Episodes
          </SecondaryButton>
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {EPISODES.map((ep) => (
            <EpisodeCard key={ep.ep} {...ep} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTA() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="bg-navy-950 py-24 lg:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-blue/8 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

      <div className="relative max-w-4xl mx-auto px-5 lg:px-8 text-center">
        <div className={`space-y-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Badge color="blue">
            <span className="w-1.5 h-1.5 bg-brand-blue rounded-full inline-block animate-pulse" />
            Limited Spots Per Episode
          </Badge>

          <h2 className="font-heading font-black text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.05]">
            Be early.{' '}
            <span className="text-brand-blue">Not late.</span>
          </h2>

          <p className="text-ink-300 text-xl font-body max-w-xl mx-auto leading-relaxed">
            The best startups don't wait for opportunity — they get discovered here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <PrimaryButton className="!px-10 !py-4 !text-base sm:w-auto w-full justify-center">
              Apply to Pitch
            </PrimaryButton>
            <SecondaryButton className="!px-10 !py-4 !text-base sm:w-auto w-full justify-center">
              <Play size={16} />
              Watch Episodes
            </SecondaryButton>
          </div>

          <div className="flex flex-wrap justify-center gap-6 pt-4">
            {[
              { icon: <CheckCircle size={14} className="text-brand-green" />, label: 'No upfront fees' },
              { icon: <CheckCircle size={14} className="text-brand-green" />, label: 'Real investor feedback' },
              { icon: <CheckCircle size={14} className="text-brand-green" />, label: 'Global audience' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-ink-300 text-sm font-body">
                {icon}
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-brand-blue flex items-center justify-center">
              <Tv2 size={15} className="text-white" />
            </div>
            <span className="font-heading font-800 text-white text-sm">
              Seed Stage <span className="text-brand-blue">Spotlight</span>
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {['How It Works', 'For Founders', 'For Investors', 'Episodes', 'Privacy', 'Terms'].map((item) => (
              <a key={item} href="#" className="text-ink-400 hover:text-ink-200 text-xs font-body transition-colors duration-150">
                {item}
              </a>
            ))}
          </div>

          <p className="text-ink-500 text-xs font-body text-center">
            &copy; {new Date().getFullYear()} Seed Stage Spotlight. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="bg-navy-950 min-h-screen font-body">
      <Nav />
      <main>
        <Hero />
        <SocialProof />
        <WhatThisIs />
        <HowItWorks />
        <InvestorSection />
        <ScoringSection />
        <ForFounders />
        <Episodes />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

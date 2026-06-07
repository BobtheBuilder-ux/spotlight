import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import SocialProof from '@/components/SocialProof';
import WhatThisIs from '@/components/WhatThisIs';
import HowItWorks from '@/components/HowItWorks';
import InvestorSection from '@/components/InvestorSection';
import ScoringSection from '@/components/ScoringSection';
import ForFounders from '@/components/ForFounders';
import Episodes from '@/components/Episodes';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
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

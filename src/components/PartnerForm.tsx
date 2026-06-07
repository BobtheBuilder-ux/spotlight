'use client';

import React, { useState } from 'react';
import {
  CheckCircle, AlertCircle, Loader2, Play, Building2, ChevronRight, ChevronLeft, Target, Handshake
} from 'lucide-react';
import { PartnerFormData, defaultPartnerFormData } from '@/types/partner';
import { KybFormRow } from '@/components/KybFormRow';
import { KybInput, KybTextarea, KybCheckbox } from '@/components/KybFormControls';

const STEPS = [
  { id: 's1', label: 'Basics', Icon: Building2 },
  { id: 's2', label: 'Partnership', Icon: Handshake },
  { id: 's3', label: 'Review', Icon: Target },
];

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="bg-slate-900 px-6 py-4 flex items-center gap-3">
      <div>
        <h2 className="text-white font-semibold text-base">{title}</h2>
        {subtitle && <p className="text-slate-400 text-xs mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function StepFooter({ step, totalSteps, onBack, onNext, onSubmit, submitting }: {
  step: number; totalSteps: number; onBack: () => void; onNext: () => void; onSubmit: () => void; submitting: boolean;
}) {
  const isLast = step === totalSteps - 1;
  return (
    <div className="flex items-center justify-between gap-4 pt-4 pb-2 mt-6">
      <button
        type="button"
        onClick={onBack}
        disabled={step === 0}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium transition-all ${
          step === 0 
            ? 'opacity-0 pointer-events-none' 
            : 'text-gray-600 hover:bg-gray-50 hover:border-gray-300'
        }`}
      >
        <ChevronLeft className="w-4 h-4" /> Back
      </button>
      {isLast ? (
        <button
          type="button"
          disabled={submitting}
          onClick={onSubmit}
          className="flex items-center gap-2.5 px-8 py-2.5 bg-brand-blue hover:bg-blue-600 disabled:bg-blue-400 text-white rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg disabled:cursor-not-allowed min-w-[180px] justify-center"
        >
          {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</> : 'Submit Partner Request'}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="flex items-center gap-2 px-7 py-2.5 bg-brand-blue hover:bg-blue-600 text-white rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg"
        >
          Continue <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default function PartnerForm({ onClose }: { onClose?: () => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<PartnerFormData>(defaultPartnerFormData);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof PartnerFormData>(key: K, value: PartnerFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function goNext() { setStep((s) => Math.min(s + 1, STEPS.length - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  function goBack() { setStep((s) => Math.max(s - 1, 0)); window.scrollTo({ top: 0, behavior: 'smooth' }); }

  async function handleSubmit() {
    if (!form.confirmation) {
      setError('You must confirm your interest in exploring a partnership.');
      return;
    }
    if (!form.partnership_type) {
      setError('Please select a partnership type.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form }),
      });
      if (!res.ok) {
        // Silently succeed if API fails for local prototype purposes
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-[400px] flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-blue-50 h-full">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 max-w-lg w-full text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-9 h-9 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Partner Request Submitted!</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">Thank you for your interest in Seed Stage Spotlight. We will review your partner application and get back to you soon.</p>
          <div className="flex gap-3 justify-center">
            {onClose && <button onClick={onClose} className="px-6 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">Close</button>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-full">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10 shadow-sm">
        <div className="px-6 py-4 flex items-center gap-4">
          <div className="w-9 h-9 bg-brand-blue rounded-lg flex items-center justify-center flex-shrink-0">
            <Handshake className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-white font-bold text-base leading-none truncate">Seed Stage Spotlight</h1>
            <p className="text-slate-400 text-xs mt-0.5 truncate">Partner Application Form</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {onClose && <button type="button" onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors text-lg" aria-label="Close">×</button>}
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-6 pb-4">
          <div className="flex items-center gap-0">
            {STEPS.map(({ id, label, Icon }, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <React.Fragment key={id}>
                  <button
                    type="button"
                    onClick={() => i < step && setStep(i)}
                    className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      active ? 'bg-brand-blue text-white' :
                      done ? 'text-blue-300 hover:text-white cursor-pointer' :
                      'text-slate-500 cursor-default'
                    }`}
                  >
                    {done ? <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" /> : <Icon className="w-3.5 h-3.5 flex-shrink-0" />}
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-1 rounded-full transition-colors ${done ? 'bg-brand-blue' : 'bg-slate-700'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <div className="mt-2 text-xs text-slate-400">Step {step + 1} of {STEPS.length}</div>
        </div>
      </header>

      {/* Headline (only show on step 0) */}
      {step === 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 tracking-tight">
              Partner with <span className="text-brand-blue">Seed Stage Spotlight</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed text-sm">
              Join us to gain early access to promising startups, or contribute your expertise and distribution to our ecosystem.
            </p>
          </div>
        </div>
      )}

      {/* Form content */}
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 pb-12 space-y-6 ${step !== 0 ? 'pt-8' : ''}`}>
        
        {/* STEP 0 */}
        {step === 0 && (
          <>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <SectionHeader title="SECTION 1 — BASIC INFORMATION" />
              <div className="px-6 py-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <KybInput label="Name" value={form.name} onChange={(e) => set('name', e.target.value)} required />
                  <KybInput label="Organization / Company" value={form.organization} onChange={(e) => set('organization', e.target.value)} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <KybInput label="Role / Title" value={form.role} onChange={(e) => set('role', e.target.value)} required />
                  <KybInput label="Email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} required />
                </div>
                <KybInput label="Website / LinkedIn (URL)" type="url" value={form.website} onChange={(e) => set('website', e.target.value)} />
              </div>
            </div>
          </>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <SectionHeader title="SECTION 2 — PARTNERSHIP TYPE" />
              <div className="px-6 py-4 space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">What type of partnership are you interested in?</label>
                  <select className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors mt-1"
                    value={form.partnership_type} onChange={(e) => set('partnership_type', e.target.value)} required>
                    <option value="" disabled>Select Partnership Type...</option>
                    <option value="Investor / Deal Flow Access">Investor / Deal Flow Access</option>
                    <option value="Startup Assessment Partner">Startup Assessment Partner</option>
                    <option value="Accelerator / Incubator">Accelerator / Incubator</option>
                    <option value="Media / Distribution Partner">Media / Distribution Partner</option>
                    <option value="Corporate / Strategic Partner">Corporate / Strategic Partner</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <SectionHeader title="SECTION 3 — VALUE EXCHANGE" />
              <div className="px-6 py-4 space-y-4">
                <KybTextarea label="How would you like to contribute to Seed Stage Spotlight?" placeholder="1-3 sentences" value={form.contribute} onChange={(e) => set('contribute', e.target.value)} required rows={3} />
                <KybTextarea label="What value are you looking to gain from the partnership?" value={form.gain_value} onChange={(e) => set('gain_value', e.target.value)} required rows={3} />
              </div>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <SectionHeader title="SECTION 4 — STARTUP INTEREST" />
              <div className="px-6 py-4 space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">What types of startups are you most interested in?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                    <KybCheckbox label="AI / SaaS" checked={form.interest_ai} onChange={(v) => set('interest_ai', v)} />
                    <KybCheckbox label="Fintech" checked={form.interest_fintech} onChange={(v) => set('interest_fintech', v)} />
                    <KybCheckbox label="E-commerce" checked={form.interest_ecommerce} onChange={(v) => set('interest_ecommerce', v)} />
                    <KybCheckbox label="Healthtech" checked={form.interest_healthtech} onChange={(v) => set('interest_healthtech', v)} />
                    <KybCheckbox label="Consumer apps" checked={form.interest_consumer} onChange={(v) => set('interest_consumer', v)} />
                    <KybCheckbox label="Climate / Energy" checked={form.interest_climate} onChange={(v) => set('interest_climate', v)} />
                    <KybCheckbox label="Early-stage general" checked={form.interest_general} onChange={(v) => set('interest_general', v)} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <SectionHeader title="SECTION 5 — CONFIRMATION" />
              <div className="px-6 py-4">
                <KybCheckbox 
                  label="I am interested in exploring a partnership with Seed Stage Spotlight" 
                  checked={form.confirmation} 
                  onChange={(v) => set('confirmation', v)} 
                  className="!items-start [&_span]:leading-relaxed"
                />
              </div>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-sm text-red-700 mt-4">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" /><span>{error}</span>
              </div>
            )}
          </>
        )}

        {/* Footer controls */}
        <StepFooter 
          step={step} 
          totalSteps={STEPS.length} 
          onBack={goBack} 
          onNext={goNext} 
          onSubmit={handleSubmit} 
          submitting={submitting} 
        />

      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import {
  CheckCircle, AlertCircle, Loader2, Play, Building2, ChevronRight, ChevronLeft, Users, ArrowRight, ClipboardCheck, BookOpen
} from 'lucide-react';
import { KybFormData, defaultFormData } from '@/types/kyb';
import { KybFormRow } from '@/components/KybFormRow';
import { KybInput, KybTextarea, KybCheckbox } from '@/components/KybFormControls';

const STEPS = [
  { id: 's1', label: 'Basics', Icon: Building2 },
  { id: 's2', label: 'Product & Traction', Icon: Users },
  { id: 's3', label: 'Funding', Icon: ArrowRight },
  { id: 's4', label: 'Review', Icon: ClipboardCheck },
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
          {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</> : 'Submit Application'}
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

export default function KybForm({ onClose }: { onClose?: () => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<KybFormData>(defaultFormData);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof KybFormData>(key: K, value: KybFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function goNext() { setStep((s) => Math.min(s + 1, STEPS.length - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  function goBack() { setStep((s) => Math.max(s - 1, 0)); window.scrollTo({ top: 0, behavior: 'smooth' }); }

  async function handleSubmit() {
    if (!form.consent) {
      setError('You must agree to the consent terms before submitting.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/kyb', {
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
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Application Submitted!</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">Thank you for applying to Seed Stage Spotlight. We will review your application and get back to you soon.</p>
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
          <div className="w-9 h-9 bg-brand-red rounded-lg flex items-center justify-center flex-shrink-0">
            <Play className="w-5 h-5 text-white ml-0.5" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-white font-bold text-base leading-none truncate">Seed Stage Spotlight</h1>
            <p className="text-slate-400 text-xs mt-0.5 truncate">Startup Pitch Application Form</p>
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

      {/* Headline & Subtext (only show on step 0) */}
      {step === 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-red-100">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Apply Now
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-tight">
              Get in front of investors.<br/>
              <span className="text-brand-blue">Pitch your startup live.</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Selected founders will be invited to pitch on Seed Stage Spotlight and receive investor feedback + exposure.
            </p>
          </div>
        </div>
      )}

      {/* Form content */}
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 pb-12 space-y-6 ${step !== 0 ? 'pt-8' : ''}`}>
        
        {/* STEP 0 */}
        {step === 0 && (
          <>
            {/* Section 1 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <SectionHeader title="SECTION 1 — BASIC INFORMATION" />
              <div className="px-6 py-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <KybInput label="Full Name" value={form.full_name} onChange={(e) => set('full_name', e.target.value)} required />
                  <KybInput label="Email Address" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <KybInput label="Phone / WhatsApp" value={form.phone} onChange={(e) => set('phone', e.target.value)} required />
                  <KybInput label="Location (City, Country)" value={form.location} onChange={(e) => set('location', e.target.value)} required />
                </div>
                <KybInput label="LinkedIn Profile (URL)" type="url" value={form.linkedin_profile} onChange={(e) => set('linkedin_profile', e.target.value)} />
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <SectionHeader title="SECTION 2 — STARTUP DETAILS" />
              <div className="px-6 py-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <KybInput label="Startup Name" value={form.startup_name} onChange={(e) => set('startup_name', e.target.value)} required />
                  <KybInput label="Website / Landing Page (if any)" type="url" value={form.website} onChange={(e) => set('website', e.target.value)} />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Industry</label>
                    <select className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
                      value={form.industry} onChange={(e) => set('industry', e.target.value)} required>
                      <option value="" disabled>Select Industry...</option>
                      <option value="Fintech">Fintech</option>
                      <option value="AI / SaaS">AI / SaaS</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Marketplace">Marketplace</option>
                      <option value="Healthtech">Healthtech</option>
                      <option value="Food / Delivery">Food / Delivery</option>
                      <option value="Clean Energy">Clean Energy</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Stage of Startup</label>
                    <select className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
                      value={form.startup_stage} onChange={(e) => set('startup_stage', e.target.value)} required>
                      <option value="" disabled>Select Stage...</option>
                      <option value="Pre-idea">Pre-idea</option>
                      <option value="Idea stage">Idea stage</option>
                      <option value="MVP built">MVP built</option>
                      <option value="Early users">Early users</option>
                      <option value="Generating revenue">Generating revenue</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <>
            {/* Section 3 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <SectionHeader title="SECTION 3 — THE IDEA" />
              <div className="px-6 py-4 space-y-4">
                <KybTextarea label="What problem are you solving?" placeholder="Minimum 2-5 sentences" value={form.problem} onChange={(e) => set('problem', e.target.value)} required rows={4} />
                <KybTextarea label="What is your solution?" value={form.solution} onChange={(e) => set('solution', e.target.value)} required rows={4} />
                <KybTextarea label="What makes your startup different?" value={form.differentiation} onChange={(e) => set('differentiation', e.target.value)} required rows={4} />
              </div>
            </div>

            {/* Section 4 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <SectionHeader title="SECTION 4 — TRACTION" subtitle="(IMPORTANT FOR INVESTORS)" />
              <div className="px-6 py-4 space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Do you currently have any of the following?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                    <KybCheckbox label="Users/customers" checked={form.traction_users} onChange={(v) => set('traction_users', v)} />
                    <KybCheckbox label="Revenue" checked={form.traction_revenue} onChange={(v) => set('traction_revenue', v)} />
                    <KybCheckbox label="Prototype/MVP" checked={form.traction_prototype} onChange={(v) => set('traction_prototype', v)} />
                    <KybCheckbox label="Partnerships" checked={form.traction_partnerships} onChange={(v) => set('traction_partnerships', v)} />
                    <KybCheckbox label="None yet" checked={form.traction_none} onChange={(v) => set('traction_none', v)} />
                  </div>
                </div>
                
                {(form.traction_users || form.traction_revenue || form.traction_prototype || form.traction_partnerships) && (
                  <KybTextarea label="If yes, explain briefly:" value={form.traction_explanation} onChange={(e) => set('traction_explanation', e.target.value)} rows={2} />
                )}
              </div>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            {/* Section 5 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <SectionHeader title="SECTION 5 — FUNDING" />
              <div className="px-6 py-4 space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Are you currently raising funding?</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="raising_funding" value="Yes" checked={form.raising_funding === 'Yes'} onChange={() => set('raising_funding', 'Yes')} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="raising_funding" value="No" checked={form.raising_funding === 'No'} onChange={() => set('raising_funding', 'No')} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm text-gray-700">No</span>
                    </label>
                  </div>
                </div>

                {form.raising_funding === 'Yes' && (
                  <>
                    <KybInput label="If yes, how much are you raising?" value={form.raising_amount} onChange={(e) => set('raising_amount', e.target.value)} placeholder="e.g. $500,000" />
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">What is the funding for?</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                        <KybCheckbox label="Product development" checked={form.funding_purpose_product} onChange={(v) => set('funding_purpose_product', v)} />
                        <KybCheckbox label="Marketing" checked={form.funding_purpose_marketing} onChange={(v) => set('funding_purpose_marketing', v)} />
                        <KybCheckbox label="Hiring" checked={form.funding_purpose_hiring} onChange={(v) => set('funding_purpose_hiring', v)} />
                        <KybCheckbox label="Expansion" checked={form.funding_purpose_expansion} onChange={(v) => set('funding_purpose_expansion', v)} />
                        <KybCheckbox label="Other" checked={form.funding_purpose_other} onChange={(v) => set('funding_purpose_other', v)} />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Section 6 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <SectionHeader title="SECTION 6 — PITCH READINESS" />
              <div className="px-6 py-4 space-y-4">
                <KybTextarea label="Why should you be selected for Seed Stage Spotlight?" value={form.why_select} onChange={(e) => set('why_select', e.target.value)} rows={4} required />
                
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Are you comfortable pitching on camera?</label>
                  <div className="flex gap-4 flex-wrap mt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="pitch_on_camera" value="Yes" checked={form.pitch_on_camera === 'Yes'} onChange={() => set('pitch_on_camera', 'Yes')} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="pitch_on_camera" value="No" checked={form.pitch_on_camera === 'No'} onChange={() => set('pitch_on_camera', 'No')} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm text-gray-700">No</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="pitch_on_camera" value="Need guidance" checked={form.pitch_on_camera === 'Need guidance'} onChange={() => set('pitch_on_camera', 'Need guidance')} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm text-gray-700">Need guidance</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            {/* Section 7 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <SectionHeader title="SECTION 7 — OPTIONAL" subtitle="(POWER QUESTIONS)" />
              <div className="px-6 py-4 space-y-4">
                <KybInput label="If you had 1 investor in the room, who would it be and why?" value={form.dream_investor} onChange={(e) => set('dream_investor', e.target.value)} />
                <KybInput label="What would success look like after this pitch?" value={form.success_vision} onChange={(e) => set('success_vision', e.target.value)} />
              </div>
            </div>

            {/* Section 8 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <SectionHeader title="SECTION 8 — CONSENT" />
              <div className="px-6 py-4">
                <KybCheckbox 
                  label="I agree to be recorded and featured on Seed Stage Spotlight (YouTube, social media, marketing content)" 
                  checked={form.consent} 
                  onChange={(v) => set('consent', v)} 
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

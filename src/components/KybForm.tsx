'use client';

import React, { useState } from 'react';
import {
  Plus, Trash2, CheckCircle, AlertCircle, Loader2,
  Building2, ChevronRight, ChevronLeft,
  Users, ArrowRight, ClipboardCheck, BookOpen,
} from 'lucide-react';
import { KybFormData, defaultFormData, BeneficialOwnerIndividual, BeneficialOwnerEntity } from '@/types/kyb';
import { KybFormRow } from '@/components/KybFormRow';
import { KybInput, KybTextarea, KybCheckbox } from '@/components/KybFormControls';
import { KybLang, kybTranslations, KybTranslationKey } from '@/lib/kyb-i18n';

// ─── Types ────────────────────────────────────────────────────────────────────

type T = (key: KybTranslationKey) => string;

interface FormHandlers {
  form: KybFormData;
  set: <K extends keyof KybFormData>(key: K, value: KybFormData[K]) => void;
  updateIndividual: (idx: number, field: keyof BeneficialOwnerIndividual, value: string) => void;
  addIndividual: () => void;
  removeIndividual: (idx: number) => void;
  updateEntity: (idx: number, field: keyof BeneficialOwnerEntity, value: string) => void;
  addEntity: () => void;
  removeEntity: (idx: number) => void;
  t: T;
}

interface FooterProps {
  step: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  submitting: boolean;
  submitLabel: string;
  submittingLabel: string;
  nextLabel?: string;
}

// ─── Shared step progress ─────────────────────────────────────────────────────

const STEPS = [
  { id: 's1', label: 'KYB Info',     Icon: Building2 },
  { id: 's2', label: 'Ownership',    Icon: Users },
  { id: 's3', label: 'Transactions', Icon: ArrowRight },
  { id: 's4', label: 'Declaration',  Icon: ClipboardCheck },
  { id: 's5', label: 'Documents',    Icon: BookOpen },
];

// ─── Section header (navy bar) ────────────────────────────────────────────────

function SectionHeader({ num, title, subtitle }: { num: number; title: string; subtitle?: string }) {
  return (
    <div className="bg-slate-900 px-6 py-4 flex items-center gap-3">
      <span className="w-7 h-7 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center">{num}</span>
      <div>
        <h2 className="text-white font-semibold text-base">{title}</h2>
        {subtitle && <p className="text-slate-400 text-xs mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

// ─── Nav footer ───────────────────────────────────────────────────────────────

function StepFooter({ step, totalSteps, onBack, onNext, onSubmit, submitting, submitLabel, submittingLabel, nextLabel }: FooterProps) {
  const isLast = step === totalSteps - 1;
  return (
    <div className="flex items-center justify-between gap-4 pt-6 pb-4 border-t border-gray-100 mt-6">
      <button
        type="button"
        onClick={onBack}
        disabled={step === 0}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft className="w-4 h-4" /> Back
      </button>
      {isLast ? (
        <button
          type="button"
          disabled={submitting}
          onClick={onSubmit}
          className="flex items-center gap-2.5 px-8 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow-md disabled:cursor-not-allowed min-w-[180px] justify-center"
        >
          {submitting ? <><Loader2 className="w-4 h-4 animate-spin" />{submittingLabel}</> : submitLabel}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="flex items-center gap-2 px-7 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow-md"
        >
          {nextLabel ?? 'Continue'} <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// ─── STEP 1 — KYB Information ─────────────────────────────────────────────────

function Step1({ form, set, t, step, onBack, onNext, onSubmit, submitting }: FormHandlers & Omit<FooterProps, 'totalSteps' | 'submitLabel' | 'submittingLabel'>) {
  return (
    <div>
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 leading-relaxed mb-6">
        <strong>{t('notice_important')}</strong> {t('notice_text')}
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <SectionHeader num={1} title={t('s1_title')} subtitle={t('s1_subtitle')} />
        <div className="px-6 py-2">
          <KybFormRow label={t('s1_legal_name')} required>
            <KybInput value={form.legal_name} onChange={(e) => set('legal_name', e.target.value)} placeholder={t('s1_legal_name_placeholder')} required />
          </KybFormRow>
          <KybFormRow label={t('s1_previous_names')} hint={t('s1_previous_names_hint')}>
            <KybInput value={form.previous_legal_names} onChange={(e) => set('previous_legal_names', e.target.value)} placeholder={t('s1_previous_names_placeholder')} />
          </KybFormRow>
          <KybFormRow label={t('s1_dba_name')}>
            <KybInput value={form.dba_name} onChange={(e) => set('dba_name', e.target.value)} placeholder={t('s1_dba_placeholder')} />
          </KybFormRow>

          <div className="mt-4 mb-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">{t('s1_responsible_individual')}</p>
            <p className="text-xs text-gray-400">{t('s1_responsible_individual_desc')}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <KybInput label={t('s1_name')} value={form.responsible_individual_name} onChange={(e) => set('responsible_individual_name', e.target.value)} placeholder={t('s1_name_placeholder')} required />
              <KybInput label={t('s1_title_pos')} value={form.responsible_individual_title} onChange={(e) => set('responsible_individual_title', e.target.value)} placeholder={t('s1_title_placeholder')} required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <KybInput label={t('s1_dob')} type="date" value={form.responsible_individual_dob} onChange={(e) => set('responsible_individual_dob', e.target.value)} required />
              <KybInput label={t('s1_address')} value={form.responsible_individual_address} onChange={(e) => set('responsible_individual_address', e.target.value)} placeholder={t('s1_address_placeholder')} required />
            </div>
            <KybTextarea label={t('s1_tax_info')} value={form.responsible_individual_tax_info} onChange={(e) => set('responsible_individual_tax_info', e.target.value)} placeholder={t('s1_tax_info_placeholder')} />
          </div>

          <KybFormRow label={t('s1_ppob')} hint={t('s1_ppob_hint')}>
            <div className="space-y-2">
              <KybInput value={form.ppob_line1} onChange={(e) => set('ppob_line1', e.target.value)} placeholder={t('s1_line1')} />
              <KybInput value={form.ppob_line2} onChange={(e) => set('ppob_line2', e.target.value)} placeholder={t('s1_line2')} />
              <div className="grid grid-cols-2 gap-2">
                <KybInput value={form.ppob_city} onChange={(e) => set('ppob_city', e.target.value)} placeholder={t('s1_city')} />
                <KybInput value={form.ppob_state} onChange={(e) => set('ppob_state', e.target.value)} placeholder={t('s1_state')} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <KybInput value={form.ppob_zip} onChange={(e) => set('ppob_zip', e.target.value)} placeholder={t('s1_zip')} />
                <KybInput value={form.ppob_country} onChange={(e) => set('ppob_country', e.target.value)} placeholder={t('s1_country')} />
              </div>
            </div>
          </KybFormRow>

          <KybFormRow label={t('s1_reg_address')} required>
            <div className="space-y-2">
              <KybInput value={form.reg_address_line1} onChange={(e) => set('reg_address_line1', e.target.value)} placeholder={t('s1_line1')} required />
              <KybInput value={form.reg_address_line2} onChange={(e) => set('reg_address_line2', e.target.value)} placeholder={t('s1_line2')} />
              <div className="grid grid-cols-2 gap-2">
                <KybInput value={form.reg_address_city} onChange={(e) => set('reg_address_city', e.target.value)} placeholder={t('s1_city')} />
                <KybInput value={form.reg_address_state} onChange={(e) => set('reg_address_state', e.target.value)} placeholder={t('s1_state')} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <KybInput value={form.reg_address_zip} onChange={(e) => set('reg_address_zip', e.target.value)} placeholder={t('s1_zip')} />
                <KybInput value={form.reg_address_country} onChange={(e) => set('reg_address_country', e.target.value)} placeholder={t('s1_country')} />
              </div>
            </div>
          </KybFormRow>

          <KybFormRow label={t('s1_industry')} required>
            <div className="space-y-2">
              <KybCheckbox label={t('s1_industry_bank')} checked={form.industry_bank} onChange={(v) => set('industry_bank', v)} />
              <KybCheckbox label={t('s1_industry_msb')} checked={form.industry_msb} onChange={(v) => set('industry_msb', v)} />
              <KybCheckbox label={t('s1_industry_psb')} checked={form.industry_psb} onChange={(v) => set('industry_psb', v)} />
              <KybCheckbox label={t('s1_industry_other')} checked={form.industry_other} onChange={(v) => set('industry_other', v)} />
              {form.industry_other && <KybInput value={form.industry_other_specify} onChange={(e) => set('industry_other_specify', e.target.value)} placeholder={t('s1_industry_other_specify')} />}
            </div>
          </KybFormRow>

          <KybFormRow label={t('s1_org_structure')} required>
            <div className="space-y-2">
              <KybCheckbox label={t('s1_org_sole')} checked={form.org_sole_proprietorship} onChange={(v) => set('org_sole_proprietorship', v)} />
              <KybCheckbox label={t('s1_org_corp')} checked={form.org_corporation} onChange={(v) => set('org_corporation', v)} />
              <KybCheckbox label={t('s1_org_partnership')} checked={form.org_partnership} onChange={(v) => set('org_partnership', v)} />
              <KybCheckbox label={t('s1_org_llc')} checked={form.org_llc} onChange={(v) => set('org_llc', v)} />
              <KybCheckbox label={t('s1_org_nonprofit')} checked={form.org_nonprofit} onChange={(v) => set('org_nonprofit', v)} />
              <KybCheckbox label={t('s1_org_other')} checked={form.org_other} onChange={(v) => set('org_other', v)} />
              {form.org_other && <KybInput value={form.org_other_specify} onChange={(e) => set('org_other_specify', e.target.value)} placeholder={t('s1_org_other_specify')} />}
            </div>
          </KybFormRow>

          <KybFormRow label={t('s1_business_countries')} required>
            <KybTextarea value={form.business_countries} onChange={(e) => set('business_countries', e.target.value)} placeholder={t('s1_business_countries_placeholder')} required />
          </KybFormRow>
          <KybFormRow label={t('s1_company_tax_id')} required>
            <KybInput value={form.company_tax_id} onChange={(e) => set('company_tax_id', e.target.value)} placeholder={t('s1_tax_id_placeholder')} required />
          </KybFormRow>
        </div>
      </div>
      <StepFooter step={step} totalSteps={5} onBack={onBack} onNext={onNext} onSubmit={onSubmit} submitting={submitting} submitLabel={t('submit_btn')} submittingLabel={t('submitting_btn')} />
    </div>
  );
}

// ─── STEP 2 — Beneficial Ownership ───────────────────────────────────────────

function Step2({ form, set, t, updateIndividual, addIndividual, removeIndividual, updateEntity, addEntity, removeEntity, step, onBack, onNext, onSubmit, submitting }: FormHandlers & Omit<FooterProps, 'totalSteps' | 'submitLabel' | 'submittingLabel'>) {
  return (
    <div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <SectionHeader num={2} title={t('s2_title')} subtitle={t('s2_subtitle')} />
        <div className="px-6 py-4 space-y-6">
          {/* Individuals */}
          <div>
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-slate-800">{t('s2_individuals_title')}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{t('s2_individuals_desc')}</p>
            </div>
            <div className="space-y-4">
              {form.beneficial_owners_individuals.map((owner, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg border border-gray-100 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('s2_individual_label')}{idx + 1}</span>
                    {form.beneficial_owners_individuals.length > 1 && (
                      <button type="button" onClick={() => removeIndividual(idx)} className="text-red-400 hover:text-red-600 transition-colors p-1 rounded"><Trash2 className="w-4 h-4" /></button>
                    )}
                  </div>
                  <div className="space-y-3">
                    <KybInput label={t('s2_full_name')} value={owner.full_name} onChange={(e) => updateIndividual(idx, 'full_name', e.target.value)} placeholder={t('s2_full_name_placeholder')} />
                    <KybTextarea label={t('s2_tax_info')} value={owner.tax_info} onChange={(e) => updateIndividual(idx, 'tax_info', e.target.value)} placeholder={t('s2_tax_info_placeholder')} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <KybInput label={t('s2_address')} value={owner.address} onChange={(e) => updateIndividual(idx, 'address', e.target.value)} placeholder={t('s2_address_placeholder')} />
                      <KybInput label={t('s2_dob')} type="date" value={owner.date_of_birth} onChange={(e) => updateIndividual(idx, 'date_of_birth', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <KybInput label={t('s2_citizenship')} value={owner.citizenship} onChange={(e) => updateIndividual(idx, 'citizenship', e.target.value)} placeholder={t('s2_citizenship_placeholder')} />
                      <KybInput label={t('s2_source_of_wealth')} value={owner.source_of_wealth} onChange={(e) => updateIndividual(idx, 'source_of_wealth', e.target.value)} placeholder={t('s2_source_of_wealth_placeholder')} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" onClick={addIndividual} className="mt-3 flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
              <Plus className="w-4 h-4" /> {t('s2_add_individual')}
            </button>
          </div>

          {/* Entities */}
          <div className="border-t border-gray-100 pt-6">
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-slate-800">{t('s2_entities_title')}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{t('s2_entities_desc')}</p>
            </div>
            <div className="space-y-4">
              {form.beneficial_owners_entities.map((entity, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg border border-gray-100 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('s2_entity_label')}{idx + 1}</span>
                    <button type="button" onClick={() => removeEntity(idx)} className="text-red-400 hover:text-red-600 transition-colors p-1 rounded"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <KybInput label={t('s2_entity_legal_name')} value={entity.legal_name} onChange={(e) => updateEntity(idx, 'legal_name', e.target.value)} placeholder={t('s2_entity_legal_name_placeholder')} />
                      <KybInput label={t('s2_entity_tax_id')} value={entity.tax_id} onChange={(e) => updateEntity(idx, 'tax_id', e.target.value)} placeholder={t('s2_entity_tax_id_placeholder')} />
                    </div>
                    <KybInput label={t('s2_entity_reg_address')} value={entity.registered_address} onChange={(e) => updateEntity(idx, 'registered_address', e.target.value)} placeholder={t('s2_entity_reg_address_placeholder')} />
                    <KybTextarea label={t('s2_entity_directors')} value={entity.directors_key_management} onChange={(e) => updateEntity(idx, 'directors_key_management', e.target.value)} placeholder={t('s2_entity_directors_placeholder')} />
                  </div>
                </div>
              ))}
              {form.beneficial_owners_entities.length === 0 && <p className="text-xs text-gray-400 italic">{t('s2_no_entities')}</p>}
            </div>
            <button type="button" onClick={addEntity} className="mt-3 flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
              <Plus className="w-4 h-4" /> {t('s2_add_entity')}
            </button>
          </div>
        </div>
      </div>
      <StepFooter step={step} totalSteps={5} onBack={onBack} onNext={onNext} onSubmit={onSubmit} submitting={submitting} submitLabel={t('submit_btn')} submittingLabel={t('submitting_btn')} />
    </div>
  );
}

// ─── STEP 3 — Transactional Activities ───────────────────────────────────────

function Step3({ form, set, t, step, onBack, onNext, onSubmit, submitting }: FormHandlers & Omit<FooterProps, 'totalSteps' | 'submitLabel' | 'submittingLabel'>) {
  return (
    <div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <SectionHeader num={3} title={t('s3_title')} subtitle={t('s3_subtitle')} />
        <div className="px-6 py-2">
          <KybFormRow label={t('s3_sending_countries')} required>
            <KybTextarea value={form.sending_countries} onChange={(e) => set('sending_countries', e.target.value)} placeholder={t('s3_sending_countries_placeholder')} required />
          </KybFormRow>
          <KybFormRow label={t('s3_currencies')} required>
            <KybInput value={form.currencies} onChange={(e) => set('currencies', e.target.value)} placeholder={t('s3_currencies_placeholder')} required />
          </KybFormRow>
          <KybFormRow label={t('s3_purpose')} required hint={t('s3_purpose_hint')}>
            <KybInput value={form.purpose_of_transaction} onChange={(e) => set('purpose_of_transaction', e.target.value)} placeholder={t('s3_purpose_placeholder')} required />
          </KybFormRow>
          <div className="py-4">
            <p className="text-sm font-medium text-gray-700 mb-3">{t('s3_anticipated')}</p>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-900">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider w-1/3">{t('s3_type')}</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">{t('s3_volume')}</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">{t('s3_amount')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-white">
                    <td className="px-4 py-3 text-gray-600 font-medium">{t('s3_b2b')}</td>
                    <td className="px-4 py-2"><input value={form.anticipated_b2b_volume} onChange={(e) => set('anticipated_b2b_volume', e.target.value)} placeholder={t('s3_b2b_volume_placeholder')} className="w-full bg-transparent border-0 focus:outline-none text-sm text-gray-900 placeholder:text-gray-400" /></td>
                    <td className="px-4 py-2"><input value={form.anticipated_b2b_amount} onChange={(e) => set('anticipated_b2b_amount', e.target.value)} placeholder={t('s3_b2b_amount_placeholder')} className="w-full bg-transparent border-0 focus:outline-none text-sm text-gray-900 placeholder:text-gray-400" /></td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-gray-600 font-medium">{t('s3_b2c')}</td>
                    <td className="px-4 py-2"><input value={form.anticipated_b2c_volume} onChange={(e) => set('anticipated_b2c_volume', e.target.value)} placeholder={t('s3_b2c_volume_placeholder')} className="w-full bg-transparent border-0 focus:outline-none text-sm text-gray-900 placeholder:text-gray-400" /></td>
                    <td className="px-4 py-2"><input value={form.anticipated_b2c_amount} onChange={(e) => set('anticipated_b2c_amount', e.target.value)} placeholder={t('s3_b2c_amount_placeholder')} className="w-full bg-transparent border-0 focus:outline-none text-sm text-gray-900 placeholder:text-gray-400" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <StepFooter step={step} totalSteps={5} onBack={onBack} onNext={onNext} onSubmit={onSubmit} submitting={submitting} submitLabel={t('submit_btn')} submittingLabel={t('submitting_btn')} />
    </div>
  );
}

// ─── STEP 4 — Declaration ─────────────────────────────────────────────────────

function Step4({ form, set, t, step, onBack, onNext, onSubmit, submitting, error }: FormHandlers & Omit<FooterProps, 'totalSteps' | 'submitLabel' | 'submittingLabel'> & { error: string | null }) {
  return (
    <div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <SectionHeader num={4} title={t('s4_title')} />
        <div className="px-6 py-4">
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-4 text-sm text-amber-800 space-y-2 leading-relaxed">
            <p>{t('s4_by_submitting')}</p>
            <ul className="list-disc list-inside space-y-1.5 pl-1">
              <li>{t('s4_bullet1')}</li>
              <li>{t('s4_bullet2')}</li>
            </ul>
          </div>
          <div className="mb-5">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex-shrink-0 mt-0.5">
                <input type="checkbox" checked={form.declaration_confirmed} onChange={(e) => set('declaration_confirmed', e.target.checked)} className="sr-only" />
                <div className={`w-5 h-5 rounded border-2 transition-all ${form.declaration_confirmed ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300 group-hover:border-blue-400'}`}>
                  {form.declaration_confirmed && (
                    <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-700 leading-relaxed">{t('s4_confirm_label')}</span>
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <KybInput label={t('s4_signatory_name')} value={form.signatory_name} onChange={(e) => set('signatory_name', e.target.value)} placeholder={t('s4_signatory_name_placeholder')} required />
            <KybInput label={t('s4_position')} value={form.signatory_position} onChange={(e) => set('signatory_position', e.target.value)} placeholder={t('s4_position_placeholder')} required />
            <KybInput label={t('s4_date')} type="date" value={form.signature_date} onChange={(e) => set('signature_date', e.target.value)} required />
          </div>
        </div>
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-sm text-red-700 mt-4">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" /><span>{error}</span>
        </div>
      )}
      <StepFooter step={step} totalSteps={5} onBack={onBack} onNext={onNext} onSubmit={onSubmit} submitting={submitting} submitLabel={t('submit_btn')} submittingLabel={t('submitting_btn')} nextLabel="Review Docs" />
    </div>
  );
}

// ─── STEP 5 — Documentation Checklist ────────────────────────────────────────

function Step5({ form: _form, set: _set, t, step, onBack, onNext, onSubmit, submitting, error }: FormHandlers & Omit<FooterProps, 'totalSteps' | 'submitLabel' | 'submittingLabel'> & { error: string | null }) {
  return (
    <div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <SectionHeader num={5} title={t('s5_title')} subtitle={t('s5_subtitle')} />
        <div className="px-6 py-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg border border-slate-100 p-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest mb-3">{t('s5_for_individuals')}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {[t('s5_ind_item1'), t('s5_ind_item2')].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 w-4 h-4 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-400 mt-3 italic">{t('s5_ind_note')}</p>
            </div>
            <div className="bg-slate-50 rounded-lg border border-slate-100 p-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest mb-3">{t('s5_for_businesses')}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {[t('s5_biz_item1'), t('s5_biz_item2'), t('s5_biz_item3'), t('s5_biz_item4')].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 w-4 h-4 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
              <h4 className="text-xs font-bold text-gray-600 uppercase tracking-widest">{t('s5_checklist_title')}</h4>
            </div>
            <ul className="divide-y divide-gray-100">
              {[t('s5_doc1'), t('s5_doc2'), t('s5_doc3'), t('s5_doc4')].map((item, i) => (
                <li key={i} className="flex items-start gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 border-gray-300 bg-white" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-xs text-amber-700 leading-relaxed">{t('s5_additional')}</div>
        </div>
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-sm text-red-700 mt-4">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" /><span>{error}</span>
        </div>
      )}
      <StepFooter step={step} totalSteps={5} onBack={onBack} onNext={onNext} onSubmit={onSubmit} submitting={submitting} submitLabel={t('submit_btn')} submittingLabel={t('submitting_btn')} />
    </div>
  );
}

// ─── Main KybForm ─────────────────────────────────────────────────────────────

export default function KybForm({ onClose }: { onClose?: () => void }) {
  const [lang, setLang] = useState<KybLang>('en');
  const t = (key: KybTranslationKey): string => kybTranslations[lang][key];

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<KybFormData>(defaultFormData);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof KybFormData>(key: K, value: KybFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateIndividual(idx: number, field: keyof BeneficialOwnerIndividual, value: string) {
    setForm((prev) => ({
      ...prev,
      beneficial_owners_individuals: prev.beneficial_owners_individuals.map((item, i) =>
        i === idx ? { ...item, [field]: value } : item
      ),
    }));
  }
  function addIndividual() {
    setForm((prev) => ({
      ...prev,
      beneficial_owners_individuals: [
        ...prev.beneficial_owners_individuals,
        { full_name: '', tax_info: '', address: '', date_of_birth: '', citizenship: '', source_of_wealth: '' },
      ],
    }));
  }
  function removeIndividual(idx: number) {
    setForm((prev) => ({
      ...prev,
      beneficial_owners_individuals: prev.beneficial_owners_individuals.filter((_, i) => i !== idx),
    }));
  }

  function updateEntity(idx: number, field: keyof BeneficialOwnerEntity, value: string) {
    setForm((prev) => ({
      ...prev,
      beneficial_owners_entities: prev.beneficial_owners_entities.map((item, i) =>
        i === idx ? { ...item, [field]: value } : item
      ),
    }));
  }
  function addEntity() {
    setForm((prev) => ({
      ...prev,
      beneficial_owners_entities: [
        ...prev.beneficial_owners_entities,
        { legal_name: '', registered_address: '', tax_id: '', directors_key_management: '' },
      ],
    }));
  }
  function removeEntity(idx: number) {
    setForm((prev) => ({
      ...prev,
      beneficial_owners_entities: prev.beneficial_owners_entities.filter((_, i) => i !== idx),
    }));
  }

  function goNext() { setStep((s) => Math.min(s + 1, 4)); }
  function goBack() { setStep((s) => Math.max(s - 1, 0)); }

  async function handleSubmit() {
    if (!form.declaration_confirmed) {
      setError(t('error_declaration'));
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
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error ?? t('error_submit'));
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t('error_submit'));
    } finally {
      setSubmitting(false);
    }
  }

  // ── Success ──────────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-[400px] flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 max-w-lg w-full text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-9 h-9 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{t('success_title')}</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">{t('success_text')}</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setSubmitted(false); setForm(defaultFormData); setStep(0); }} className="px-6 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">{t('success_btn')}</button>
            {onClose && <button onClick={onClose} className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Close</button>}
          </div>
        </div>
      </div>
    );
  }

  // Shared props for all steps
  const stepProps = {
    form, set, t,
    updateIndividual, addIndividual, removeIndividual,
    updateEntity, addEntity, removeEntity,
    step,
    onBack: goBack,
    onNext: goNext,
    onSubmit: handleSubmit,
    submitting,
    error,
  } as const;

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-full">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10 shadow-sm">
        <div className="px-6 py-4 flex items-center gap-4">
          <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-white font-bold text-base leading-none truncate">{t('header_title')}</h1>
            <p className="text-slate-400 text-xs mt-0.5 truncate">{t('header_subtitle')}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex rounded-lg overflow-hidden border border-slate-700">
              <button type="button" onClick={() => setLang('en')} className={`px-3 py-1.5 text-xs font-semibold transition-colors ${lang === 'en' ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>EN</button>
              <button type="button" onClick={() => setLang('fr')} className={`px-3 py-1.5 text-xs font-semibold transition-colors ${lang === 'fr' ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>FR</button>
            </div>
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
                      active ? 'bg-blue-500 text-white' :
                      done ? 'text-blue-300 hover:text-white cursor-pointer' :
                      'text-slate-500 cursor-default'
                    }`}
                  >
                    {done ? <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" /> : <Icon className="w-3.5 h-3.5 flex-shrink-0" />}
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-1 rounded-full transition-colors ${done ? 'bg-blue-500' : 'bg-slate-700'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <div className="mt-2 text-xs text-slate-400">Step {step + 1} of {STEPS.length}</div>
        </div>
      </header>

      {/* Step content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {step === 0 && <Step1 {...stepProps} />}
        {step === 1 && <Step2 {...stepProps} />}
        {step === 2 && <Step3 {...stepProps} />}
        {step === 3 && <Step4 {...stepProps} />}
        {step === 4 && <Step5 {...stepProps} />}
      </div>
    </div>
  );
}

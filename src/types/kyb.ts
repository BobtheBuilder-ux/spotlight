export interface BeneficialOwnerIndividual {
  id?: string;
  full_name: string;
  tax_info: string;
  address: string;
  date_of_birth: string;
  citizenship: string;
  source_of_wealth: string;
}

export interface BeneficialOwnerEntity {
  id?: string;
  legal_name: string;
  registered_address: string;
  tax_id: string;
  directors_key_management: string;
}

export interface KybFormData {
  legal_name: string;
  previous_legal_names: string;
  dba_name: string;
  responsible_individual_name: string;
  responsible_individual_title: string;
  responsible_individual_dob: string;
  responsible_individual_address: string;
  responsible_individual_tax_info: string;
  ppob_line1: string;
  ppob_line2: string;
  ppob_city: string;
  ppob_state: string;
  ppob_zip: string;
  ppob_country: string;
  reg_address_line1: string;
  reg_address_line2: string;
  reg_address_city: string;
  reg_address_state: string;
  reg_address_zip: string;
  reg_address_country: string;
  industry_bank: boolean;
  industry_msb: boolean;
  industry_psb: boolean;
  industry_other: boolean;
  industry_other_specify: string;
  org_sole_proprietorship: boolean;
  org_corporation: boolean;
  org_partnership: boolean;
  org_llc: boolean;
  org_nonprofit: boolean;
  org_other: boolean;
  org_other_specify: string;
  business_countries: string;
  company_tax_id: string;
  beneficial_owners_individuals: BeneficialOwnerIndividual[];
  beneficial_owners_entities: BeneficialOwnerEntity[];
  sending_countries: string;
  currencies: string;
  purpose_of_transaction: string;
  anticipated_b2b_volume: string;
  anticipated_b2b_amount: string;
  anticipated_b2c_volume: string;
  anticipated_b2c_amount: string;
  declaration_confirmed: boolean;
  signatory_name: string;
  signatory_position: string;
  signature_date: string;
}

export const defaultFormData: KybFormData = {
  legal_name: '',
  previous_legal_names: '',
  dba_name: '',
  responsible_individual_name: '',
  responsible_individual_title: '',
  responsible_individual_dob: '',
  responsible_individual_address: '',
  responsible_individual_tax_info: '',
  ppob_line1: '',
  ppob_line2: '',
  ppob_city: '',
  ppob_state: '',
  ppob_zip: '',
  ppob_country: '',
  reg_address_line1: '',
  reg_address_line2: '',
  reg_address_city: '',
  reg_address_state: '',
  reg_address_zip: '',
  reg_address_country: '',
  industry_bank: false,
  industry_msb: false,
  industry_psb: false,
  industry_other: false,
  industry_other_specify: '',
  org_sole_proprietorship: false,
  org_corporation: false,
  org_partnership: false,
  org_llc: false,
  org_nonprofit: false,
  org_other: false,
  org_other_specify: '',
  business_countries: '',
  company_tax_id: '',
  beneficial_owners_individuals: [
    { full_name: '', tax_info: '', address: '', date_of_birth: '', citizenship: '', source_of_wealth: '' },
  ],
  beneficial_owners_entities: [],
  sending_countries: '',
  currencies: '',
  purpose_of_transaction: '',
  anticipated_b2b_volume: '',
  anticipated_b2b_amount: '',
  anticipated_b2c_volume: '',
  anticipated_b2c_amount: '',
  declaration_confirmed: false,
  signatory_name: '',
  signatory_position: '',
  signature_date: '',
};

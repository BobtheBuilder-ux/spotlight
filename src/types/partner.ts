export interface PartnerFormData {
  // Basic Information
  name: string;
  organization: string;
  role: string;
  email: string;
  website: string;
  
  // Partnership Type
  partnership_type: string;
  
  // Value Exchange
  contribute: string;
  gain_value: string;
  
  // Startup Interest
  interest_ai: boolean;
  interest_fintech: boolean;
  interest_ecommerce: boolean;
  interest_healthtech: boolean;
  interest_consumer: boolean;
  interest_climate: boolean;
  interest_general: boolean;
  
  // Confirmation
  confirmation: boolean;
}

export const defaultPartnerFormData: PartnerFormData = {
  name: '',
  organization: '',
  role: '',
  email: '',
  website: '',
  partnership_type: '',
  contribute: '',
  gain_value: '',
  interest_ai: false,
  interest_fintech: false,
  interest_ecommerce: false,
  interest_healthtech: false,
  interest_consumer: false,
  interest_climate: false,
  interest_general: false,
  confirmation: false,
};

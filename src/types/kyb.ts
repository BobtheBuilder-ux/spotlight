export interface KybFormData {
  // Section 1
  full_name: string;
  email: string;
  phone: string;
  location: string;
  linkedin_profile: string;
  // Section 2
  startup_name: string;
  website: string;
  industry: string;
  startup_stage: string;
  // Section 3
  problem: string;
  solution: string;
  differentiation: string;
  // Section 4
  traction_users: boolean;
  traction_revenue: boolean;
  traction_prototype: boolean;
  traction_partnerships: boolean;
  traction_none: boolean;
  traction_explanation: string;
  // Section 5
  raising_funding: string;
  raising_amount: string;
  funding_purpose_product: boolean;
  funding_purpose_marketing: boolean;
  funding_purpose_hiring: boolean;
  funding_purpose_expansion: boolean;
  funding_purpose_other: boolean;
  // Section 6
  why_select: string;
  pitch_on_camera: string;
  // Section 7
  dream_investor: string;
  success_vision: string;
  // Section 8
  consent: boolean;
}

export const defaultFormData: KybFormData = {
  full_name: '',
  email: '',
  phone: '',
  location: '',
  linkedin_profile: '',
  startup_name: '',
  website: '',
  industry: '',
  startup_stage: '',
  problem: '',
  solution: '',
  differentiation: '',
  traction_users: false,
  traction_revenue: false,
  traction_prototype: false,
  traction_partnerships: false,
  traction_none: false,
  traction_explanation: '',
  raising_funding: '',
  raising_amount: '',
  funding_purpose_product: false,
  funding_purpose_marketing: false,
  funding_purpose_hiring: false,
  funding_purpose_expansion: false,
  funding_purpose_other: false,
  why_select: '',
  pitch_on_camera: '',
  dream_investor: '',
  success_vision: '',
  consent: false,
};

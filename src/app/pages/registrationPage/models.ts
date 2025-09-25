
export type RegistrationMethod = 'email' | 'social';

export type SocialType = 'google' | 'meta' | 'github' | 'telegram';

export type Gender = 'male' | 'female';


export interface Address {
  country: string;
  city: string;
  street: string;
}

export interface SocialData {
  provider: SocialType;
  email: string;
  name: string;
  country: string;
  phone?: string;
}

export interface GuardianData {
  name: string;
  email: string;
}

export interface RegistrationData {
  method: RegistrationMethod;
  socialData?: SocialData;

  email?: string;
  name?: string;
  country?: string;
  phone?: string;

  address?: Address;
  birthDate?: string;
  gender?: Gender;

  isMinor?: boolean;
  guardianData?: GuardianData;

  acceptTerms: boolean;
  acceptPrivacy: boolean;
  subscribeNewsletter?: boolean;
}


export const COUNTRIES = [
  { code: 'RU', name: 'Russia' },
  { code: 'BY', name: 'Belarus' },
  { code: 'KZ', name: 'Kazakhstan' },
  { code: 'UA', name: 'Ukraine' },
  { code: 'US', name: 'United States' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' }
];

export const SOCIAL_PROVIDERS = [
  { id: 'google', name: 'Google', icon: 'google' },
  { id: 'meta', name: 'Meta (Facebook)', icon: 'facebook' },
  { id: 'github', name: 'GitHub', icon: 'github' },
  { id: 'telegram', name: 'Telegram', icon: 'telegram' }
];

export const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

export const MOCK_SOCIAL_DATA: Record<SocialType, SocialData> = {
  google: {
    provider: 'google',
    email: 'user@gmail.com',
    name: 'Иван Иванов',
    country: 'BY',
    phone: '+375 29 123-45-67'
  },
  meta: {
    provider: 'meta',
    email: 'user@facebook.com',
    name: 'Петр Петров',
    country: 'BY',
    phone: '+375 29234-56-78'
  },
  github: {
    provider: 'github',
    email: 'user@github.com',
    name: 'Анна Сидорова',
    country: 'BY',
    phone: '+375 29 345-67-89'
  },
  telegram: {
    provider: 'telegram',
    email: 'user@telegram.org',
    name: 'Мария Козлова',
    country: 'BY',
    phone: '+375 29 456-78-90'
  }
};

import { Language, LanguageCode } from '../types';

export const SUPPORTED_LANGUAGES: Language[] = [
  {
    code: 'sr',
    name: 'Sranantongo',
    nativeName: 'Sranantongo',
    flag: '🇸🇷',
    defaultVoice: 'Puck',
    commonGreeting: 'Fa waka! Fa yu tan tide?',
    samplePhrases: [
      'Mi sa lobi wan koffie, grantangi.',
      'Pe a treinstasi de?',
      'A bun fu miti yu.',
      'Yu kan taki srabii pikinso?'
    ]
  }
];

export function getLanguageByCode(code: LanguageCode): Language {
  return SUPPORTED_LANGUAGES[0];
}


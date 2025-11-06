import { ZodiacSign } from '../types';

export const ZODIAC_SIGNS: { label: string; value: ZodiacSign }[] = [
  { label: 'Aries ♈', value: 'aries' },
  { label: 'Taurus ♉', value: 'taurus' },
  { label: 'Gemini ♊', value: 'gemini' },
  { label: 'Cancer ♋', value: 'cancer' },
  { label: 'Leo ♌', value: 'leo' },
  { label: 'Virgo ♍', value: 'virgo' },
  { label: 'Libra ♎', value: 'libra' },
  { label: 'Scorpio ♏', value: 'scorpio' },
  { label: 'Sagittarius ♐', value: 'sagittarius' },
  { label: 'Capricorn ♑', value: 'capricorn' },
  { label: 'Aquarius ♒', value: 'aquarius' },
  { label: 'Pisces ♓', value: 'pisces' },
];


export const getZodiacDisplayName = (sign: ZodiacSign): string => {
  return sign.charAt(0).toUpperCase() + sign.slice(1);
};

export type ZodiacSign =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

export interface Horoscope {
  current_date: string;
  description: string;
  compatibility: string;
  mood: string;
  color: string;
  lucky_number: string;
  lucky_time: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  zodiacSign: ZodiacSign;
  createdAt: string;
  updatedAt: string;
}

export interface AppState {
  selectedZodiacSign: ZodiacSign;
  horoscope: Horoscope | null;
  journalEntries: JournalEntry[];
  error: string | null;
}

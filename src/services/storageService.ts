import AsyncStorage from '@react-native-async-storage/async-storage';
import { JournalEntry, ZodiacSign } from '../types';

const STORAGE_KEYS = {
  JOURNAL_ENTRIES: 'journal_entries',
  SELECTED_ZODIAC_SIGN: 'selected_zodiac_sign',
} as const;

export class StorageService {
  static async saveJournalEntry(entry: JournalEntry): Promise<void> {
    try {
      const existingEntries = await this.getJournalEntries();
      const updatedEntries = existingEntries.filter(e => e.id !== entry.id);
      updatedEntries.push(entry);
      
      await AsyncStorage.setItem(
        STORAGE_KEYS.JOURNAL_ENTRIES,
        JSON.stringify(updatedEntries)
      );
    } catch (error) {
      console.error('Error saving journal entry:', error);
      throw error;
    }
  }

  static async getJournalEntries(): Promise<JournalEntry[]> {
    try {
      const entriesJson = await AsyncStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES);
      return entriesJson ? JSON.parse(entriesJson) : [];
    } catch (error) {
      console.error('Error getting journal entries:', error);
      return [];
    }
  }

  static async getJournalEntryByDate(date: string): Promise<JournalEntry | null> {
    try {
      const entries = await this.getJournalEntries();
      return entries.find(entry => entry.date === date) || null;
    } catch (error) {
      console.error('Error getting journal entry by date:', error);
      return null;
    }
  }

  static async deleteJournalEntry(entryId: string): Promise<void> {
    try {
      const existingEntries = await this.getJournalEntries();
      const updatedEntries = existingEntries.filter(e => e.id !== entryId);
      
      await AsyncStorage.setItem(
        STORAGE_KEYS.JOURNAL_ENTRIES,
        JSON.stringify(updatedEntries)
      );
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      throw error;
    }
  }

  static async saveSelectedZodiacSign(sign: ZodiacSign): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SELECTED_ZODIAC_SIGN, sign);
    } catch (error) {
      console.error('Error saving zodiac sign:', error);
      throw error;
    }
  }

  static async getSelectedZodiacSign(): Promise<ZodiacSign> {
    try {
      const sign = await AsyncStorage.getItem(STORAGE_KEYS.SELECTED_ZODIAC_SIGN);
      return (sign as ZodiacSign) || 'aries';
    } catch (error) {
      console.error('Error getting zodiac sign:', error);
      return 'aries';
    }
  }

  static async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.JOURNAL_ENTRIES,
        STORAGE_KEYS.SELECTED_ZODIAC_SIGN,
      ]);
    } catch (error) {
      console.error('Error clearing all data:', error);
      throw error;
    }
  }
}

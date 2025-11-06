import React, { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from 'react';
import { AppState, ZodiacSign, JournalEntry, Horoscope } from '../types';
import { HoroscopeService } from '../services/horoscopeService';
import { StorageService } from '../services/storageService';

type AppAction =
  | { type: 'SET_ZODIAC_SIGN'; payload: ZodiacSign }
  | { type: 'SET_HOROSCOPE'; payload: Horoscope }
  | { type: 'SET_JOURNAL_ENTRIES'; payload: JournalEntry[] }
  | { type: 'ADD_JOURNAL_ENTRY'; payload: JournalEntry }
  | { type: 'UPDATE_JOURNAL_ENTRY'; payload: JournalEntry }
  | { type: 'DELETE_JOURNAL_ENTRY'; payload: string };

const initialState: AppState = {
  selectedZodiacSign: 'aries',
  horoscope: null,
  journalEntries: [],
  error: null,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_ZODIAC_SIGN':
      return { ...state, selectedZodiacSign: action.payload };
    case 'SET_HOROSCOPE':
      return { ...state, horoscope: action.payload };
    case 'SET_JOURNAL_ENTRIES':
      return { ...state, journalEntries: action.payload };
    case 'ADD_JOURNAL_ENTRY':
      return {
        ...state,
        journalEntries: [...state.journalEntries, action.payload],
      };
    case 'UPDATE_JOURNAL_ENTRY':
      return {
        ...state,
        journalEntries: state.journalEntries.map(entry =>
          entry.id === action.payload.id ? action.payload : entry
        ),
      };
    case 'DELETE_JOURNAL_ENTRY':
      return {
        ...state,
        journalEntries: state.journalEntries.filter(entry => entry.id !== action.payload),
      };
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  actions: {
    setZodiacSign: (sign: ZodiacSign) => Promise<void>;
    fetchHoroscope: (sign?: ZodiacSign) => Promise<void>;
    saveJournalEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    updateJournalEntry: (entry: JournalEntry) => Promise<void>;
    deleteJournalEntry: (entryId: string) => Promise<void>;
    loadJournalEntries: () => Promise<void>;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const fetchHoroscope = useCallback(async (sign?: ZodiacSign) => {
    try {
      const targetSign = sign || state.selectedZodiacSign;
      const horoscope = await HoroscopeService.getHoroscope(targetSign);
      dispatch({ type: 'SET_HOROSCOPE', payload: horoscope });
    } catch (error) {
      console.error('Failed to fetch horoscope:', error);
    }
  }, [state.selectedZodiacSign]);

  const setZodiacSign = async (sign: ZodiacSign) => {
    try {
      dispatch({ type: 'SET_ZODIAC_SIGN', payload: sign });
      await StorageService.saveSelectedZodiacSign(sign);
      await fetchHoroscope(sign);
    } catch (error) {
      console.error('Failed to update zodiac sign:', error);
    }
  };

  const saveJournalEntry = async (entryData: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const now = new Date().toISOString();
      const entry: JournalEntry = {
        ...entryData,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        createdAt: now,
        updatedAt: now,
      };

      await StorageService.saveJournalEntry(entry);
      dispatch({ type: 'ADD_JOURNAL_ENTRY', payload: entry });
    } catch (error) {
      console.error('Failed to save journal entry:', error);
    }
  };

  const updateJournalEntry = async (entry: JournalEntry) => {
    try {
      const updatedEntry = {
        ...entry,
        updatedAt: new Date().toISOString(),
      };

      await StorageService.saveJournalEntry(updatedEntry);
      dispatch({ type: 'UPDATE_JOURNAL_ENTRY', payload: updatedEntry });
    } catch (error) {
      console.error('Failed to update journal entry:', error);
    }
  };

  const deleteJournalEntry = async (entryId: string) => {
    try {
      await StorageService.deleteJournalEntry(entryId);
      dispatch({ type: 'DELETE_JOURNAL_ENTRY', payload: entryId });
    } catch (error) {
      console.error('Failed to delete journal entry:', error);
    }
  };

  const loadJournalEntries = useCallback(async () => {
    try {
      const entries = await StorageService.getJournalEntries();
      dispatch({ type: 'SET_JOURNAL_ENTRIES', payload: entries });
    } catch (error) {
      console.error('Failed to load journal entries:', error);
    }
  }, []);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const savedZodiacSign = await StorageService.getSelectedZodiacSign();
        dispatch({ type: 'SET_ZODIAC_SIGN', payload: savedZodiacSign });
        
        await Promise.all([
          fetchHoroscope(savedZodiacSign),
          loadJournalEntries(),
        ]);
      } catch (error) {
        console.error('Failed to initialize app:', error);
      }
    };

    initializeApp();
  }, [fetchHoroscope, loadJournalEntries]);

  const contextValue: AppContextType = {
    state,
    actions: {
      setZodiacSign,
      fetchHoroscope,
      saveJournalEntry,
      updateJournalEntry,
      deleteJournalEntry,
      loadJournalEntries,
    },
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

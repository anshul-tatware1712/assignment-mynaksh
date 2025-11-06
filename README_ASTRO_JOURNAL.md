# 🌟 Astro Journal

> A beautiful, modern mobile app that combines daily horoscopes with personal journaling. Write your thoughts, explore your zodiac sign, and reflect on your day with personalized astrological insights.

![React Native](https://img.shields.io/badge/React%20Native-0.71+-blue?style=flat-square)
![Expo](https://img.shields.io/badge/Expo-49+-green?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

## ✨ Key Features

### 🏠 Home Screen
- **Personalized Daily Horoscopes** - Get unique horoscope readings for your zodiac sign
- **Zodiac Sign Selector** - Beautiful modal picker to switch between all 12 zodiac signs with emojis
- **Refresh Horoscopes** - Pull to refresh for new horoscope insights
- **Quick Navigation** - One-tap access to today's journal entry
- **Modern UI** - Clean, intuitive design with smooth animations

### 📝 Journal Screen
- **Rich Text Editor** - Multi-line text input for detailed journal entries
- **Smart Saving** - Entries automatically persist to local storage
- **Edit & Update** - Modify existing entries with timestamp tracking
- **Delete Entries** - Remove entries with confirmation dialog
- **Entry Metadata** - View creation and last updated dates
- **Keyboard Handling** - Optimized keyboard behavior for seamless typing

### 🔮 Horoscope Engine
- **Dynamic Mock Data** - Varied, randomized horoscope content for each sign
- **Multiple Descriptions** - 3 unique descriptions per zodiac sign
- **Randomized Elements** - Lucky numbers and times change on each refresh
- **Rich Information** - Includes mood, color, number, time, and compatibility
- **Beautiful Display** - Elegant card layout with detailed formatting

### 💾 Data & Storage
- **Local Persistence** - All journal entries saved using AsyncStorage
- **100% Offline** - Full functionality without internet connection
- **Data Integrity** - Robust error handling and validation
- **Zodiac Preference** - Remember your selected zodiac sign

## 🏗️ Architecture

### Project Structure
```
assignment-myNaksh/
├── app/
│   ├── _layout.tsx          # Root navigation layout
│   ├── index.tsx            # Home screen entry point
│   └── journal.tsx          # Journal screen route
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── HoroscopeCard.tsx
│   │   └── ZodiacPicker.tsx
│   ├── screens/             # Screen components
│   │   ├── HomeScreen.tsx
│   │   └── JournalScreen.tsx
│   ├── services/            # Business logic & API
│   │   ├── horoscopeService.ts
│   │   └── storageService.ts
│   ├── store/               # State management
│   │   └── AppContext.tsx
│   ├── types/               # TypeScript definitions
│   │   └── index.ts
│   └── utils/               # Helper functions
│       ├── dateUtils.ts
│       └── zodiacUtils.ts
├── package.json
├── tsconfig.json
└── README_ASTRO_JOURNAL.md
```

### Tech Stack
- **Framework**: React Native with Expo
- **Navigation**: React Navigation v6
- **State Management**: Context API with useReducer
- **Storage**: AsyncStorage for local persistence
- **TypeScript**: Full type safety throughout the app
- **Styling**: StyleSheet with responsive design

### Key Design Patterns
- **Context API**: Centralized state management for app-wide data
- **Service Layer**: Separated business logic from UI components
- **Type Safety**: Comprehensive TypeScript interfaces and types
- **Error Handling**: Robust error boundaries and user feedback
- **Modular Components**: Reusable, well-structured components

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Use Expo Go app to scan QR code or run on simulator

### Dependencies
- `@react-native-async-storage/async-storage`: Local data persistence
- `@react-navigation/native`: Navigation framework
- `@react-navigation/stack`: Stack navigation
- `expo`: Development platform
- `expo-router`: File-based routing system

## 📱 Usage

### Home Screen
1. **Select Zodiac Sign**: Use the dropdown to choose your zodiac sign
2. **View Horoscope**: Read your daily horoscope with detailed insights
3. **Refresh**: Tap refresh to get updated horoscope data
4. **Write Journal**: Tap the journal button to create today's entry

### Journal Screen
1. **Write Entry**: Type your thoughts in the text area
2. **Save**: Tap save to store your entry locally
3. **Edit**: Return to modify existing entries
4. **Delete**: Remove entries with confirmation dialog

## 🎨 Design Features

### Visual Elements
- **Modern UI**: Clean, minimalist design with subtle shadows
- **Responsive Layout**: Adapts to different screen sizes
- **Color Scheme**: Carefully chosen colors for readability and aesthetics
- **Typography**: Clear, readable fonts with proper hierarchy
- **Icons**: Zodiac symbols and intuitive navigation icons

### User Experience
- **Smooth Navigation**: Seamless transitions between screens
- **Loading States**: Clear feedback during data operations
- **Error Handling**: User-friendly error messages
- **Accessibility**: Proper contrast and touch targets
- **Keyboard Handling**: Optimized for text input

## 🔧 Technical Implementation

### State Management
The app uses React Context API with useReducer for predictable state updates:
- Centralized app state
- Type-safe actions and reducers
- Async action handlers for API calls and storage

### Data Flow
1. **Initialization**: Load saved zodiac sign and journal entries from AsyncStorage
2. **Horoscope Generation**: Dynamic mock data with randomized elements
3. **Journal Operations**: CRUD operations with AsyncStorage persistence
4. **State Updates**: Dispatch actions to update UI with Context API

### Error Handling
- Storage errors logged and user notified with alerts
- Input validation prevents empty or invalid entries
- Comprehensive try-catch blocks throughout
- User-friendly error messages for all operations
- Confirmation dialogs for destructive actions

## 🌟 Future Enhancements

### Planned Features
- **Push Notifications**: Daily reminders to journal
- **Entry Search**: Find specific journal entries
- **Export Functionality**: Share or backup journal entries
- **Themes**: Dark mode and custom color schemes
- **Calendar View**: Visual calendar of journal entries
- **Mood Tracking**: Emotional state tracking with entries

### Technical Improvements
- **SQLite Integration**: More robust local database
- **Cloud Sync**: Backup entries to cloud storage
- **Performance Optimization**: Lazy loading and caching
- **Testing**: Unit and integration tests
- **Analytics**: Usage tracking and insights

## 📄 License

This project is built as an assignment and follows best practices for React Native development.

## 🤝 Contributing

This is an assignment project, but feedback and suggestions are welcome for learning purposes.

---

Built with ❤️ using React Native and Expo

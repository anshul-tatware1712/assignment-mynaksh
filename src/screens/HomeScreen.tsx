import { useRouter } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HoroscopeCard } from "../components/HoroscopeCard";
import { ZodiacPicker } from "../components/ZodiacPicker";
import { useApp } from "../store/AppContext";
import { formatDisplayDate } from "../utils/dateUtils";
import { getZodiacDisplayName } from "../utils/zodiacUtils";

export const HomeScreen: React.FC = () => {
  const router = useRouter();
  const { state, actions } = useApp();

  const handleZodiacChange = async (sign: any) => {
    try {
      await actions.setZodiacSign(sign);
    } catch (error) {
      Alert.alert("Error", "Failed to update zodiac sign");
    }
  };

  const handleWriteJournal = () => {
    router.push("/journal");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Astro Journal</Text>
          <Text style={styles.subtitle}>{formatDisplayDate(new Date())}</Text>
        </View>

        <ZodiacPicker
          selectedSign={state.selectedZodiacSign}
          onSignChange={handleZodiacChange}
        />

        <View style={styles.horoscopeSection}>
          <View style={styles.horoscopeHeader}>
            <Text style={styles.horoscopeTitle}>
              {getZodiacDisplayName(state.selectedZodiacSign)} Horoscope
            </Text>
          </View>

          {state.horoscope && <HoroscopeCard horoscope={state.horoscope} />}
        </View>

        {state.error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{state.error}</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.journalButton}
          onPress={handleWriteJournal}
        >
          <Text style={styles.journalButtonText}> Write Journal Entry</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 4,
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
  },
  horoscopeSection: {
    flex: 1,
    marginBottom: 20,
  },
  horoscopeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  horoscopeTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2c3e50",
  },
  placeholderCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  placeholderText: {
    fontSize: 16,
    color: "#95a5a6",
    textAlign: "center",
  },
  errorContainer: {
    backgroundColor: "#e74c3c",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  journalButton: {
    backgroundColor: "#9b59b6",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  journalButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

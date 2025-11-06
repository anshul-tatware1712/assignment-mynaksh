import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Horoscope } from "../types";

interface HoroscopeCardProps {
  horoscope: Horoscope;
}

export const HoroscopeCard: React.FC<HoroscopeCardProps> = ({ horoscope }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.currentDate}>{horoscope.current_date}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today&apos;s Forecast</Text>
        <Text style={styles.description}>{horoscope.description}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Mood</Text>
            <Text style={styles.detailValue}>{horoscope.mood}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Lucky Color</Text>
            <Text style={styles.detailValue}>{horoscope.color}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Lucky Number</Text>
            <Text style={styles.detailValue}>{horoscope.lucky_number}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Lucky Time</Text>
            <Text style={styles.detailValue}>{horoscope.lucky_time}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compatibility</Text>
          <Text style={styles.compatibility}>{horoscope.compatibility}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  currentDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#555",
  },
  detailsContainer: {
    marginTop: 8,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  compatibility: {
    fontSize: 15,
    color: "#555",
    fontWeight: "500",
  },
});

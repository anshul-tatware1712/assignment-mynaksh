import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useApp } from "../store/AppContext";
import { JournalEntry } from "../types";
import { formatDisplayDate, getTodayString, isToday } from "../utils/dateUtils";

export const JournalScreen: React.FC = () => {
  const { state, actions } = useApp();

  const targetDate = getTodayString();
  const [content, setContent] = useState("");
  const [existingEntry, setExistingEntry] = useState<JournalEntry | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadExistingEntry = () => {
      const entry = state.journalEntries.find((e) => e.date === targetDate);
      if (entry) {
        setExistingEntry(entry);
        setContent(entry.content);
      }
    };

    loadExistingEntry();
  }, [state.journalEntries, targetDate]);

  const handleSave = async () => {
    if (!content.trim()) {
      Alert.alert("Empty Entry", "Please write something before saving.");
      return;
    }

    setIsSaving(true);
    try {
      if (existingEntry) {
        await actions.updateJournalEntry({
          ...existingEntry,
          content: content.trim(),
        });
        Alert.alert("Success", "Journal entry updated!");
      } else {
        await actions.saveJournalEntry({
          date: targetDate,
          content: content.trim(),
          zodiacSign: state.selectedZodiacSign,
        });
        Alert.alert("Success", "Journal entry saved!");
      }
    } catch (error) {
      console.error("Failed to save journal entry:", error);
      Alert.alert("Error", "Failed to save journal entry. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    if (!existingEntry) return;

    Alert.alert(
      "Delete Entry",
      "Are you sure you want to delete this journal entry?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await actions.deleteJournalEntry(existingEntry.id);
              setContent("");
              setExistingEntry(null);
              Alert.alert("Success", "Journal entry deleted.");
            } catch (error) {
              console.error("Failed to delete journal entry:", error);
              Alert.alert("Error", "Failed to delete journal entry.");
            }
          },
        },
      ]
    );
  };

  const displayDate = new Date(targetDate + "T00:00:00");
  const isCurrentDay = isToday(targetDate);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>
            {isCurrentDay ? "Write Journal" : "Journal Entry"}
          </Text>
          <Text style={styles.date}>{formatDisplayDate(displayDate)}</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              How was your day? What&apos;s on your mind?
            </Text>
            <TextInput
              style={styles.textInput}
              multiline
              placeholder="Write your thoughts here..."
              placeholderTextColor="#95a5a6"
              value={content}
              onChangeText={setContent}
              textAlignVertical="top"
            />
          </View>

          {existingEntry && (
            <View style={styles.metaInfo}>
              <Text style={styles.metaText}>
                Created:{" "}
                {new Date(existingEntry.createdAt).toLocaleDateString()}
              </Text>
              {existingEntry.updatedAt !== existingEntry.createdAt && (
                <Text style={styles.metaText}>
                  Updated:{" "}
                  {new Date(existingEntry.updatedAt).toLocaleDateString()}
                </Text>
              )}
            </View>
          )}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.saveButton, isSaving && styles.disabledButton]}
            onPress={handleSave}
            disabled={isSaving}
          >
            <Text style={styles.saveButtonText}>
              {isSaving
                ? "Saving..."
                : existingEntry
                ? "Update Entry"
                : "Save Entry"}
            </Text>
          </TouchableOpacity>

          {existingEntry && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Text style={styles.deleteButtonText}>Delete Entry</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: "#3498db",
    fontWeight: "500",
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2c3e50",
  },
  date: {
    fontSize: 14,
    color: "#7f8c8d",
    marginTop: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginTop: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2c3e50",
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    lineHeight: 24,
    color: "#2c3e50",
    minHeight: 300,
    borderWidth: 1,
    borderColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  metaInfo: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  metaText: {
    fontSize: 12,
    color: "#6c757d",
    marginBottom: 2,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 24,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  saveButton: {
    backgroundColor: "#27ae60",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  disabledButton: {
    backgroundColor: "#95a5a6",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

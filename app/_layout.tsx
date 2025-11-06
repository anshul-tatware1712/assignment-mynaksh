import { Stack } from "expo-router";
import React from "react";
import { AppProvider } from "../src/store/AppContext";

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerShown: true,
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#fff",
          },
        }}
      />
    </AppProvider>
  );
}

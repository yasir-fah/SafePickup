import { LinearGradient } from "expo-linear-gradient";
import { Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout() {
  const pathname = usePathname();

  const hideLayout = pathname === "/" || pathname === "/register";

  return (
    <LinearGradient
      colors={["#0E6B3B", "#0A4F2A", "#041E12"]}
      style={styles.container}
    >
      <StatusBar style="light" />

      {!hideLayout && <Navbar />}

      <View style={styles.content}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "transparent" },
            animation: "fade",
            animationDuration: 40,
            presentation: "card",
            gestureEnabled: true,
            fullScreenGestureEnabled: true,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              animation: "fade_from_bottom",
            }}
          />

          <Stack.Screen
            name="register"
            options={{
              animation: "fade_from_bottom",
            }}
          />

          <Stack.Screen name="dashboard" />
          <Stack.Screen name="available-nfcs" />
          <Stack.Screen name="parents-status" />
          <Stack.Screen name="student-assignment" />
          <Stack.Screen name="nfc-linking" />
          <Stack.Screen name="add-student" />
        </Stack>
      </View>

      {!hideLayout && <Footer />}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
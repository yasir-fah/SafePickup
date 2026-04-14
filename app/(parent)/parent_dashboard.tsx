import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export default function ParentDashboard() {
  const router = useRouter();

  return (
    <>
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Pickup */}
        <BlurView intensity={60} tint="light" style={styles.card}>
          <Text style={styles.title}>Student Pickup Request</Text>
          <Text style={styles.desc}>
            Once you arrive, tap here to request your child's school pickup.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/pickup_request")}
          >
            <Ionicons name="car" size={18} color="#0E6B3B" />
            <Text style={styles.buttonText}>Request Pickup</Text>
          </TouchableOpacity>
        </BlurView>

        {/* Attendance */}
        <BlurView intensity={60} tint="light" style={styles.card}>
          <Text style={styles.title}>Attendance Record</Text>
          <Text style={styles.desc}>
            Use this page to track your child's school entry and exit times.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/childLog")}
          >
            <Ionicons name="time" size={18} color="#0E6B3B" />
            <Text style={styles.buttonText}>View Attendance</Text>
          </TouchableOpacity>
        </BlurView>

        {/* Congestion */}
        <BlurView intensity={60} tint="light" style={styles.card}>
          <Text style={styles.title}>Congestion Overview</Text>
          <Text style={styles.desc}>
            Before arriving, you can see congestion near the school.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/Congestion_page")}
          >
            <Ionicons name="analytics" size={18} color="#0E6B3B" />
            <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>
        </BlurView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  logoutBtn: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 8,
    borderRadius: 10,
  },

  content: {
    padding: 20,
    gap: 25,
  },

  card: {
    borderRadius: 30,
    padding: 25,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
  },

  desc: {
    color: "rgba(255,255,255,0.85)",
    marginBottom: 20,
    fontSize: 13,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-end",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },

  buttonText: {
    color: "#0E6B3B",
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 200
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginTop: 10,
    marginBottom: 8,
  },
  modalText: {
    fontSize: 15,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  otpBoxContainer: {
    width: "100%",
    maxWidth: 320,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  otpBox: {
    width: 52,
    height: 52,
    borderWidth: 1,
    borderColor: "#0E6B3B",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6f9fc",
  },
  otpDigit: {
    color: "#0E6B3B",
    fontSize: 20,
    fontWeight: "700",
  },
  otpInputHidden: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
    left: -1000,
  },
  resendRow: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 15,
  },
  resendLink: {
    color: "#0E6B3B",
    fontWeight: "700",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 15,
  },
  modalCancelButton: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalCancelText: {
    color: "#666",
    fontWeight: "600",
  },
  modalConfirmButton: {
    backgroundColor: "#0E6B3B",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
  },
  modalConfirmText: {
    color: "#fff",
    fontWeight: "600",
  },
  chooseModalBox: {
    backgroundColor: "#ECFDF3",
    borderColor: "#C6F6D5",
    borderWidth: 1,
  },
  authCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#F0FFF4",
    borderColor: "#0E6B3B",
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  authCardIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: "#D9F9E5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  authCardContent: {
    flex: 1,
  },
  authCardTitle: {
    color: "#0E6B3B",
    fontWeight: "700",
    fontSize: 14,
  },
  authCardSubtitle: {
    color: "#335846",
    fontSize: 12,
    marginTop: 2,
  },
});

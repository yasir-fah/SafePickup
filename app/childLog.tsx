import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Table from "../components/table";
import { parentService, AttendanceLogDto } from "../services/parentService";
import { useAuth } from "../context/AuthContext";

export default function ChildLog() {
  const router = useRouter();
  const { username } = useAuth();

  const { data, isLoading, isError, error } = useQuery<AttendanceLogDto[]>({
    queryKey: ["parent", "attendance-logs"],
    queryFn: () => parentService.getAttendanceLogs(),
  });

  useEffect(() => {
    if (isError) {
      Alert.alert(
        "Error",
        (error as Error)?.message || "Failed to load attendance logs."
      );
    }
  }, [isError, error]);

  const rows = (data ?? []).map((log, idx) => ({
    id: String(idx),
    student: log.studentName,
    nfc: log.nfcUid,
    time: log.requestTime,
    status: log.status,
  }));

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.screen}>
        <View style={styles.parentBox}>
          <Text>
            Parent: <Text style={styles.blue}>{username ?? ""}</Text>
          </Text>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="#2A6FD6" style={{ marginTop: 20 }} />
        ) : (
          <Table
            title="Student Record"
            data={rows}
            columns={[
              { key: "student", title: "STUDENT", flex: 2 },
              { key: "nfc", title: "NFC UID", flex: 2 },
              { key: "time", title: "REQUEST TIME", flex: 2 },
              {
                key: "status",
                title: "STATUS",
                flex: 1,
                render: (item: { status: string }) => {
                  const s = (item.status || "").toLowerCase();
                  if (s === "approved")
                    return (
                      <Ionicons
                        name="checkmark-circle"
                        size={22}
                        color="#2E7D32"
                      />
                    );
                  return (
                    <Ionicons
                      name="alert-circle"
                      size={22}
                      color="#D32F2F"
                    />
                  );
                },
              },
            ]}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  header: { marginTop: 20, paddingHorizontal: 20 },
  backButton: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 8,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  screen: { flex: 1, alignItems: "center", paddingTop: 10 },
  parentBox: {
    width: "92%",
    backgroundColor: "#F3F3F3",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  blue: { color: "#2A6FD6" },
});

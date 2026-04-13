import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Table from "../../components/table";
import {
  parentService,
  MyStudentDto,
  CongestionDto,
} from "../../services/parentService";

type CongestionResult = { avgJamFactor: number; status: string };

export default function CongestionScreen() {
  const router = useRouter();
  const [results, setResults] = useState<Record<number, CongestionResult>>({});
  const [pendingId, setPendingId] = useState<number | null>(null);

  const {
    data: students,
    isLoading,
    isError,
    error,
  } = useQuery<MyStudentDto[]>({
    queryKey: ["parent", "my-students"],
    queryFn: () => parentService.getMyStudents(),
  });

  React.useEffect(() => {
    if (isError) {
      Alert.alert(
        "Error",
        (error as Error)?.message || "Failed to load students."
      );
    }
  }, [isError, error]);

  const congestionMutation = useMutation<
    CongestionDto,
    Error,
    { studentId: number }
  >({
    mutationFn: ({ studentId }) =>
      parentService.checkCongestion(Number(studentId)),
    onSuccess: (data, variables) => {
      setResults((prev) => ({
        ...prev,
        [variables.studentId]: {
          avgJamFactor: data.avgJamFactor,
          status: data.status,
        },
      }));
      setPendingId(null);
    },
    onError: (err) => {
      setPendingId(null);
      Alert.alert("Error", err?.message || "Failed to check congestion.");
    },
  });

  const handleCheck = (student: MyStudentDto) => {
    const id = Number(student.id);
    if (Number.isNaN(id)) {
      Alert.alert("Error", "Invalid student ID.");
      return;
    }
    setPendingId(id);
    congestionMutation.mutate({ studentId: id });
  };

  const rows = (students ?? []).map((s) => ({
    id: String(s.id),
    rawId: Number(s.id),
    name: s.username,
  }));

  const renderCongestion = (item: { rawId: number }) => {
    if (pendingId === item.rawId) {
      return <ActivityIndicator size="small" color="#2A6FD6" />;
    }
    const result = results[item.rawId];
    if (!result) {
      return <Ionicons name="time-outline" size={22} color="#999" />;
    }

    const status = (result.avgJamFactor / 10);
    let iconName: keyof typeof Ionicons.glyphMap = "alert-circle";
    let color = "#999";
    if (status >= 0.0 && status <= 0.30) {
      iconName = "checkmark-circle";
      color = "#2E7D32";
    } 
    if (status > 0.3 && status <= 0.7) {
      iconName = "alert-circle";
      color = "#F9A825";
    } 
    if (status > 0.7) {
      iconName = "close-circle";
      color = "#D32F2F";
    }

    return (
      <View style={styles.congestionCell}>
        <Text style={styles.jamText}>
          {(result.avgJamFactor / 10).toFixed(1)}
        </Text>
        <Ionicons name={iconName} size={20} color={color} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.screen}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#2A6FD6" style={{ marginTop: 20 }} />
        ) : (
          <Table
            title="Check Congestion"
            data={rows}
            columns={[
              { key: "name", title: "NAME", flex: 2.2 },
              {
                key: "action",
                title: "ACTION",
                flex: 1.3,
                render: (item: { rawId: number }) => (
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() =>
                      handleCheck(
                        (students ?? []).find(
                          (s) => Number(s.id) === item.rawId
                        )!
                      )
                    }
                    disabled={pendingId === item.rawId}
                  >
                    <Text style={styles.actionText}>Check</Text>
                  </TouchableOpacity>
                ),
              },
              {
                key: "congestion",
                title: "CONGESTION",
                flex: 1.5,
                render: renderCongestion,
              },
            ]}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { marginTop: 20, paddingHorizontal: 20 },
  backButton: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 8,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  screen: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
    paddingBottom: 100,
  },
  actionBtn: {
    backgroundColor: "#0E6B3B",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  actionText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  congestionCell: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 6,
    paddingHorizontal: 4,
  },
  jamText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
});

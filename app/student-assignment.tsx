import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminService, StudentWithNationalIdDto } from "../services/adminService";
import { useAuth } from "../context/AuthContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function StudentAssignment() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const parentName = (params.name as string) || "";
  const parentId = Number(params.parentId);
  const [query, setQuery] = useState("");
  const { role } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["students"],
    queryFn: adminService.getAllStudents,
    enabled: role === "ADMIN",
  });

  const linkMutation = useMutation({
    mutationFn: (studentId: number) =>
      adminService.linkParentToStudent(parentId!, studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parents", "assignment"] });
      queryClient.invalidateQueries({ queryKey: ["students"] });
      Alert.alert("Success", "Student linked to parent successfully.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    },
    onError: (err: any) => {
      Alert.alert("Error", err?.response?.data?.message || err?.message || "Failed to link.");
    },
  });

  if (role && role !== "ADMIN") {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#fff" }}>Admin access required.</Text>
      </SafeAreaView>
    );
  }

  const students: StudentWithNationalIdDto[] = data ?? [];
  const filtered = students.filter((s) => {
    const name = (s.username || "").toLowerCase();
    return name.includes(query.toLowerCase());
  });

  const renderRow = ({ item, index }: { item: StudentWithNationalIdDto; index: number }) => {
    const backgroundColor = index % 2 === 0 ? "#ffffff" : "#fcfcfc";
    const name = item.username || "";
    const grade = item.grade || "";

    return (
      <View style={[styles.row, { backgroundColor }]}>
        <View style={[styles.cell, styles.nameCell]}>
          <Text style={styles.nameText}>{name}</Text>
        </View>

        <View style={[styles.cell, styles.centerCell]}>
          <Text style={styles.normalText}>{item.NationalId}</Text>
        </View>

        <View style={[styles.cell, styles.centerCell]}>
          <Text style={styles.gradeBadge}>{grade}</Text>
        </View>

        <View style={[styles.cell, styles.actionsCell]}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => {
              if (!parentId) {
                Alert.alert("Error", "Missing parent id.");
                return;
              }
              Alert.alert(
                "Confirm Assignment",
                `Link student ${name} to parent ${parentName}?`,
                [
                  { text: "Cancel", style: "cancel" },
                  { text: "Confirm", onPress: () => linkMutation.mutate(Number(item.id)) },
                ]
              );
            }}
            disabled={linkMutation.isPending}
          >
            {linkMutation.isPending ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.actionBtnText}>Confirm</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />

        <View style={styles.screen}>
          <View style={styles.card}>
            <Text style={styles.title}>
              Link student to:
              <Text style={styles.parentName}> {parentName}</Text>
            </Text>

            <View style={styles.searchContainer}>
              <TextInput
                placeholder="Find student by name"
                value={query}
                onChangeText={setQuery}
                style={styles.searchInput}
                placeholderTextColor="#999"
              />
            </View>

            {isLoading ? (
              <ActivityIndicator color="#0E6B3B" style={{ marginVertical: 30 }} />
            ) : isError ? (
              <Text style={{ color: "#D32F2F", textAlign: "center" }}>
                Failed to load students.
              </Text>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={[styles.table, { minWidth: 460 }]}>
                  <View style={styles.headerRow}>
                    <View style={[styles.cell, styles.nameCell]}>
                      <Text style={styles.tableHeaderText}>NAME</Text>
                    </View>

                    <View style={[styles.cell, styles.centerCell]}>
                      <Text style={styles.tableHeaderText}>NATIONAL ID</Text>
                    </View>

                    <View style={[styles.cell, styles.centerCell]}>
                      <Text style={styles.tableHeaderText}>GRADE</Text>
                    </View>

                    <View style={[styles.cell, styles.actionsCell]}>
                      <Text style={styles.tableHeaderText}>ACTION</Text>
                    </View>
                  </View>

                  <FlatList
                    data={filtered}
                    keyExtractor={(i) => String(i.id)}
                    renderItem={renderRow}
                    showsVerticalScrollIndicator={false}
                    style={styles.list}
                  />
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  backButton: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 8,
    borderRadius: 10,
    marginHorizontal: 8,
    marginBottom: 20,
  },

  card: {
    borderRadius: 28,
    padding: 14,
    backgroundColor: "#ffffff",
    overflow: "hidden",
    elevation: 6,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0E6B3B",
    marginBottom: 18,
  },

  parentName: {
    color: "#0E6B3B",
    fontWeight: "700",
  },

  searchContainer: { marginBottom: 18 },

  searchInput: {
    height: 44,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },

  table: { flexDirection: "column" },

  headerRow: {
    flexDirection: "row",
    paddingVertical: 10,
  },

  tableHeaderText: {
    fontSize: 11,
    color: "#555",
    textTransform: "uppercase",
    fontWeight: "800",
  },

  list: { maxHeight: 200 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },

  cell: {
    paddingHorizontal: 2,
    justifyContent: "center",
  },

  nameCell: {
    width: 140,
    paddingHorizontal: 4,
    justifyContent: "center",
  },

  centerCell: {
    width: 110,
    alignItems: "center",
    paddingHorizontal: 4,
  },

  actionsCell: {
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },

  nameText: { fontSize: 13, color: "#111" },
  normalText: { fontSize: 12, color: "#333" },

  gradeBadge: {
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: "600",
  },

  actionBtn: {
    backgroundColor: "#0E6B3B",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    minWidth: 56,
    alignItems: "center",
    justifyContent: "center",
  },

  actionBtnText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
});

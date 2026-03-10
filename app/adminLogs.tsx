import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Table from "../components/table";

type Log = {
  id: string;
  student: string;
  nfc: string;
  time: string;
  status: "APPROVED" | "REJECTED" | "FREE";
};

export default function AdminLogs() {
  const router = useRouter();

  const rows: Log[] = [
    { id: "1", student: "abdullah", nfc: "ASWD2478", time: "2026-02-12", status: "APPROVED" },
    { id: "2", student: "abdullah", nfc: "ASWD2478", time: "2026-02-11", status: "REJECTED" },
    { id: "3", student: "Ali", nfc: "JDENAP34", time: "2026-02-10", status: "FREE" },
  ];

  return (
    <View style={styles.page}>
      {/* Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.screen}>
        <Table
          title="Exit Logs"
          data={rows}
          columns={[
            {
              key: "student",
              title: "STUDENT",
              flex: 2,
            },
            {
              key: "nfc",
              title: "NFC UID",
              flex: 2,
            },
            {
              key: "time",
              title: "REQUEST TIME",
              flex: 2,
            },
            {
              key: "status",
              title: "STATUS",
              flex: 1,
              render: (item: Log) => {
                if (item.status === "APPROVED")
                  return (
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color="#2E7D32"
                    />
                  );

                if (item.status === "REJECTED")
                  return (
                    <Ionicons
                      name="alert-circle"
                      size={22}
                      color="#D32F2F"
                    />
                  );

                return (
                  <Ionicons
                    name="time-outline"
                    size={22}
                    color="#999"
                  />
                );
              },
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },

  header: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  backButton: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 8,
    borderRadius: 10,
    alignSelf: "flex-start",
  },

  screen: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
  },
});
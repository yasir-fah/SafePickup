import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Footer() {
  const goAbout = () => {
    router.push("/about");
  };

  return (
    <View style={styles.footer}>
      
      {/* Links */}
      <View style={styles.links}>
        <TouchableOpacity>
          <Text style={styles.link}>Contact Us</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.link}>Terms and Conditions</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.link}>Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goAbout}>
          <Text style={styles.link}>About</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  links: {
    flexDirection: "row",
    gap: 20,
    flexWrap: "wrap",
    justifyContent: "center",
  },

  link: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
});
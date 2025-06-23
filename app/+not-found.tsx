import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not Found" }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">Page Not Found</ThemedText>
        <ThemedText style={{ marginTop: 8, marginBottom: 16 }}>
          Sorry, the page you are looking for does not exist.
        </ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to Home</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

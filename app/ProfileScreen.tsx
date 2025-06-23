import { useAuth } from "@/hooks/useAuth";
import { useFavorite } from "@/hooks/useFavorite";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function ProfileScreen() {
  const { logout } = useAuth();
  const { favoriteTeam, setFavoriteTeam, favoritePlayer, setFavoritePlayer } =
    useFavorite();
  const [teamInput, setTeamInput] = useState(favoriteTeam || "");
  const [playerInput, setPlayerInput] = useState(favoritePlayer || "");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.label}>Favorite Team:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your favorite team"
        value={teamInput}
        onChangeText={setTeamInput}
        onBlur={() => setFavoriteTeam(teamInput)}
      />
      <Text style={styles.label}>Favorite Player:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your favorite player"
        value={playerInput}
        onChangeText={setPlayerInput}
        onBlur={() => setFavoritePlayer(playerInput)}
      />
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});

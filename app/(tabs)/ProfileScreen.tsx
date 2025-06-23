import { useAuth } from "@/hooks/useAuth";
import { usePreferences } from "@/hooks/usePreferences";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const LEAGUES = [
  { label: "Premier League", value: "premier-league" },
  { label: "La Liga", value: "la-liga" },
  { label: "Bundesliga", value: "bundesliga" },
  { label: "Serie A", value: "serie-a" },
  { label: "Champions League", value: "ucl" },
];

const LANGUAGES = [
  { label: "English", value: "en" },
  { label: "Español", value: "es" },
  { label: "Français", value: "fr" },
  { label: "Deutsch", value: "de" },
  { label: "Italiano", value: "it" },
];

export default function ProfileScreen() {
  const { logout } = useAuth();
  const { league, setLeague, language, setLanguage } = usePreferences();
  const router = useRouter();
  const PROFILE_PIC_KEY = "profilePicUri";
  const storage = {
    async getItem(key: string) {
      if (Platform.OS === "web") {
        return localStorage.getItem(key);
      } else {
        return await SecureStore.getItemAsync(key);
      }
    },
    async setItem(key: string, value: string) {
      if (Platform.OS === "web") {
        localStorage.setItem(key, value);
      } else {
        await SecureStore.setItemAsync(key, value);
      }
    },
    async removeItem(key: string) {
      if (Platform.OS === "web") {
        localStorage.removeItem(key);
      } else {
        await SecureStore.deleteItemAsync(key);
      }
    },
  };

  const [profilePic, setProfilePic] = useState<string | null>(null);

  useEffect(() => {
    storage.getItem(PROFILE_PIC_KEY).then((uri) => {
      if (uri) setProfilePic(uri);
    });
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace("/LoginScreen");
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setProfilePic(uri);
      await storage.setItem(PROFILE_PIC_KEY, uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={{ marginBottom: 16 }}>
        {profilePic ? (
          <Image source={{ uri: profilePic }} style={styles.profilePic} />
        ) : (
          <View
            style={[
              styles.profilePic,
              {
                backgroundColor: "#eee",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text style={{ fontSize: 32, color: "#aaa" }}>👤</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.info}>Username: demo_user</Text>

      <Text style={styles.label}>Select League/Tournament:</Text>
      <Picker
        selectedValue={league}
        onValueChange={setLeague}
        style={styles.picker}
      >
        <Picker.Item label="Select a league..." value={null} />
        {LEAGUES.map((l) => (
          <Picker.Item key={l.value} label={l.label} value={l.value} />
        ))}
      </Picker>

      <Text style={styles.label}>Select Language:</Text>
      <Picker
        selectedValue={language}
        onValueChange={setLanguage}
        style={styles.picker}
      >
        {LANGUAGES.map((lang) => (
          <Picker.Item key={lang.value} label={lang.label} value={lang.value} />
        ))}
      </Picker>

      <Button title="Logout" onPress={handleLogout} />
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
  info: {
    fontSize: 18,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 4,
  },
  picker: {
    width: 250,
    marginBottom: 8,
  },
  profilePic: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
});

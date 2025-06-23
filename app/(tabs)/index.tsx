import { useAuth } from "@/hooks/useAuth";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const COLORS = {
  background: "#f6f8fa",
  primary: "#1e90ff",
  accent: "#21c065",
  userBubble: "#1e90ff",
  aiBubble: "#e5e5ea",
  inputBg: "#fff",
  sendBtn: "#21c065",
  headerBg: "#22223b",
  headerText: "#fff",
};

const DUMMY_AVATAR =
  "https://ui-avatars.com/api/?name=User&background=1e90ff&color=fff&rounded=true&size=64";
const AI_AVATAR =
  "https://ui-avatars.com/api/?name=AI&background=21c065&color=fff&rounded=true&size=64";

const initialMessages = [
  {
    id: "1",
    sender: "ai",
    text: "Hi! I’m BetGPT, your football betting assistant. Ask me anything about teams, matches, or stats!",
  },
];

export default function HomeScreen() {
  const { userToken } = useAuth();
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now().toString(), sender: "user", text: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "ai",
          text: "[AI is thinking... connect me to your backend for real answers!]",
        },
      ]);
    }, 1000);
  };

  const renderMessage = ({ item }: any) => (
    <View
      style={[
        styles.messageRow,
        item.sender === "user" ? styles.userRow : styles.aiRow,
      ]}
    >
      <Image
        source={{ uri: item.sender === "user" ? DUMMY_AVATAR : AI_AVATAR }}
        style={styles.avatar}
      />
      <View
        style={[
          styles.bubble,
          item.sender === "user" ? styles.userBubble : styles.aiBubble,
        ]}
      >
        <Text
          style={[
            styles.bubbleText,
            item.sender === "user" ? styles.userText : styles.aiText,
          ]}
        >
          {item.text}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Image
              source={require("../../assets/images/icon.png")}
              style={styles.logo}
            />
            <Text style={styles.headerTitle}>BetGPTx</Text>
            <Image source={{ uri: DUMMY_AVATAR }} style={styles.headerAvatar} />
          </View>
          {/* Chat */}
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.chat}
            showsVerticalScrollIndicator={false}
          />
          {/* Input Bar */}
          <View style={styles.inputBar}>
            <TextInput
              style={styles.input}
              placeholder="Ask BetGPTx about football..."
              value={input}
              onChangeText={setInput}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
              <Text style={styles.sendBtnText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.headerBg,
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  headerTitle: {
    color: COLORS.headerText,
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  chat: {
    padding: 16,
    paddingBottom: 80,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 12,
  },
  userRow: {
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },
  aiRow: {
    alignSelf: "flex-start",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  bubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 18,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: COLORS.userBubble,
    borderTopRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: COLORS.aiBubble,
    borderTopLeftRadius: 4,
  },
  bubbleText: {
    fontSize: 16,
  },
  userText: {
    color: "#fff",
  },
  aiText: {
    color: "#22223b",
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#e5e5ea",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e5ea",
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: COLORS.sendBtn,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  sendBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

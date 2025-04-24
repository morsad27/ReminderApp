import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styles } from "../../components/styles/todoStyle";

const EditTodo = () => {
  const { editTodo } = useLocalSearchParams();
  const router = useRouter();

  const todo = JSON.parse(decodeURIComponent(editTodo));
  const [text, setText] = useState(todo?.text || "");

  const updateTodo = async () => {
    try {
      const storedList = await AsyncStorage.getItem("TodoList");
      if (storedList) {
        const parsedList = JSON.parse(storedList);
        const updatedList = parsedList.map((item) =>
          item.id === todo.id ? { ...item, text } : item
        );
        await AsyncStorage.setItem("TodoList", JSON.stringify(updatedList));
        router.back();
      }
    } catch (err) {
      Alert.alert("Error", "Failed to update todo: " + err.message);
    }
  };

  const deleteTodo = async () => {
    try {
      const storedList = await AsyncStorage.getItem("TodoList");
      if (storedList) {
        const parsedList = JSON.parse(storedList);
        const updatedList = parsedList.filter((item) => item.id !== todo.id);
        await AsyncStorage.setItem("TodoList", JSON.stringify(updatedList));
        router.back();
      }
    } catch (err) {
      Alert.alert("Error", "Failed to delete todo: " + err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Update your task..."
          placeholderTextColor="gray"
        />

        <Pressable style={styles.saveButton} onPress={updateTodo}>
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>

        <Pressable
          style={styles.deleteButton}
          onPress={() =>
            Alert.alert("Confirm Delete", "Are you sure you want to delete this to-do?", [
              { text: "Cancel", style: "cancel" },
              { text: "Delete", style: "destructive", onPress: deleteTodo },
            ])
          }
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default EditTodo;

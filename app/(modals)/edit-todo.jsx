import {
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { styles } from "../../components/styles/modalsStyles";

const EditTodoModal = () => {
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.modalContainer}>
        <BlurView intensity={50} tint="light" style={StyleSheet.absoluteFill} />

        <View style={styles.modalContent}>
          <TextInput
            style={styles.editInput}
            value={text}
            onChangeText={setText}
            placeholder="Update your task..."
            placeholderTextColor="gray"
          />

          <View style={styles.actionRow}>
            <Pressable style={styles.actionButton} onPress={updateTodo}>
              <Image
                source={require("../../assets/images/circle-checked.png")}
                style={styles.icon}
              />
              <Text style={styles.iconText}>Save</Text>
            </Pressable>

            <Pressable
              style={styles.actionButton}
              onPress={() =>
                Alert.alert(
                  "Confirm Delete",
                  "Are you sure you want to delete this to-do?",
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: deleteTodo,
                    },
                  ]
                )
              }
            >
              <Image
                source={require("../../assets/images/delete.png")}
                style={styles.icon}
              />
              <Text style={styles.iconText}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditTodoModal;

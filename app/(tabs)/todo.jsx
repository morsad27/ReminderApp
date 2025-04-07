import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../components/styles/todoStyle";

const Todo = ({ showAddButton = true }) => {
  const [todoList, setTodoList] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const saveTodoList = async (list) => {
    try {
      await AsyncStorage.setItem("TodoList", JSON.stringify(list));
    } catch (err) {
      alert("Error saving to-do list: " + err);
    }
  };

  const addTodo = async () => {
    if (todoText.trim()) {
      const newTodo = { id: Date.now(), text: todoText.trim() };
      const updatedList = [...todoList, newTodo];
      setTodoList(updatedList);
      setTodoText("");
      await saveTodoList(updatedList);
    }
  };

  const removeTodo = async (id) => {
    try {
      const updatedList = todoList.filter((item) => item.id !== id);
      setTodoList(updatedList);
      await saveTodoList(updatedList);
    } catch (err) {
      alert("Error removing to-do: " + err);
    }
  };

  const loadTodoList = async () => {
    try {
      const storedList = await AsyncStorage.getItem("TodoList");
      if (storedList !== null) {
        setTodoList(JSON.parse(storedList));
      }
    } catch (err) {
      alert("Error loading to-do list: " + err);
    }
  };

  useEffect(() => {
    loadTodoList();
  }, []);

  const toggleTodo = async (id) => {
    try {
      const updatedList = todoList.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      setTodoList(updatedList);
      await saveTodoList(updatedList);
    } catch (err) {
      alert("Error toggling to-do: " + err);
    }
  };

  const editTodo = async (id, newText) => {
    try {
      const updatedList = todoList.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      );
      setTodoList(updatedList);
      await saveTodoList(updatedList);
    } catch (err) {
      alert("error mo to sa update:" + err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {showAddButton && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a new To Do"
            placeholderTextColor="gray"
            value={todoText}
            onChangeText={(text) => setTodoText(text)}
          />
          <Pressable style={styles.addButton} onPress={addTodo}>
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>
      )}

      <FlatList
        data={todoList}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            {item.id === editingId ? (
              <TextInput
                style={styles.input}
                value={editingText}
                onChangeText={(text) => setEditingText(text)}
                onBlur={() => {
                  editTodo(item.id, editingText);
                  setEditingId(null);
                }}
              />
            ) : (
              <Text
                style={[
                  styles.todoText,
                  item.completed && styles.completedText,
                ]}
                // onPress={() => toggleTodo(item.id)}
                onPress={() => {
                  setEditingId(item.id);
                  setEditingText(item.text);
                }}
              >
                {item.text}
              </Text>
            )}

            <Pressable onPress={() => removeTodo(item.id)}>
              <Image
                source={require("../../assets/images/removeicon.png")}
                style={styles.icon}
              />
            </Pressable>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </SafeAreaView>
  );
};

export default Todo;

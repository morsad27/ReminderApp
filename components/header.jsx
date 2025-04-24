import { Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styles from "./styles/headerStyles";
import { ReminderContext } from "../constant/reminderContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const Header = () => {
  const { reminderList } = useContext(ReminderContext);
  const [reminders, setReminders] = useState([]);
  const [todoList, setTodoList] = useState([]);

  // Function to load to-do list
  const loadTodoList = async () => {
    try {
      const storedList = await AsyncStorage.getItem("TodoList");
      if (storedList !== null) {
        setTodoList(JSON.parse(storedList));
      }
    } catch (err) {
      console.error("Error loading to-do list:", err);
    }
  };

  // Function to load reminders
  const fetchReminders = async () => {
    try {
      const storedReminders = await AsyncStorage.getItem("reminders");
      if (storedReminders) {
        setReminders(JSON.parse(storedReminders));
      }
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  // Reload data when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadTodoList();
      fetchReminders();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Re:Mind</Text>
      <View style={styles.circleRow}>
        <View style={styles.circle}>
          <Text style={styles.text}>{reminders.length}</Text>
          <Text style={styles.textTitle}>Reminds</Text>
        </View>

        <View style={styles.circle}>
          <Text style={styles.text}>{todoList.length}</Text>
          <Text style={styles.textTitle}>To-Do</Text>
        </View>
      </View>
      <Text style={styles.bottomText}>
        Lorem ipsum is a dummy text
      </Text>
    </View>
  );
};

export default Header;
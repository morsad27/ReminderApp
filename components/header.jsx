import { Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styles from "./styles/headerStyles";
import { TodoContext } from "../constant/todoContext";
import { ReminderContext } from "../constant/reminderContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = () => {
  const { reminderList, addReminder } = useContext(ReminderContext);
  const [reminders, setReminders] = useState([]);

  const [todoList, setTodoList] = useState([TodoContext]);

  useEffect(() => {
    loadTodoList();
  }, []);

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

    fetchReminders();
  }, []); // Runs only once when the component mounts

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Re:Mind</Text>
      <View style={styles.circleRow}>
        <View style={styles.circle}>
          <Text style={styles.text}>{reminders.length}</Text>  
          {/* Using reminders.length instead of reminderList.length */}
          <Text style={styles.textTitle}>Reminds</Text>
        </View>

        <View style={styles.circle}>
          <Text style={styles.text}>{todoList.length}</Text>
          <Text style={styles.textTitle}>To-Do</Text>
        </View>
      </View>
      <Text style={styles.bottomText}>
        Never mind, I'll find someone like you.
      </Text>
    </View>
  );
};

export default Header;
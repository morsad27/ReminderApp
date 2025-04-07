import { Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styles from "./styles/headerStyles";
import { TodoContext } from "../constant/todoContext";
import { ReminderContext } from "../constant/reminderContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const header = () => {
  const { todoList, addTodo } = useContext(TodoContext);  
  const { reminderList, addReminder } = useContext(ReminderContext);

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Re:Mind</Text>
      <View style={styles.circleRow}>
        <View style={styles.circle}>
          <Text style={styles.text}>{reminderList.length}</Text>
          <Text style={styles.textTitle}>Reminds</Text>
        </View>

        <View style={styles.circle}>
          <Text style={styles.text}>{todoList.length}</Text>
          <Text style={styles.textTitle}>To-Do</Text>
        </View>
      </View>
      <Text style={styles.bottomText}>
        Never mind ill find someone like you
      </Text>
    </View>
  );
};

export default header;

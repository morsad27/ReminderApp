import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ReminderContext = createContext();

export const ReminderProvider = ({ children }) => {
  const [reminderList, setReminderList] = useState([]);

  useEffect(() => {
    loadReminderList();
  }, []);

  const loadReminderList = async () => {
    try {
      const storedList = await AsyncStorage.getItem("reminders");
      if (storedList !== null) {
        setReminderList(JSON.parse(storedList));
      }
    } catch (err) {
      alert("Error loading reminders: " + err);
    }
  };

  const saveReminderList = async (list) => {
    try {
      await AsyncStorage.setItem("reminders", JSON.stringify(list));
    } catch (err) {
      alert("Error saving reminders: " + err);
    }
  };

  const addReminder = async (reminderText) => {
    if (reminderText.trim()) {
      const newReminder = { id: Date.now(), text: reminderText.trim() };
      const updatedList = [...reminderList, newReminder];
      setReminderList(updatedList); // Fixed the issue here
      await saveReminderList(updatedList);
    }
  };

  return (
    <ReminderContext.Provider value={{ reminderList, addReminder }}>
      {children}
    </ReminderContext.Provider>
  );
};
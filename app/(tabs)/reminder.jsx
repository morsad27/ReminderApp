import React, { useState, useEffect } from "react";
import {
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
  Image,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CalendarPicker from "react-native-calendar-picker";
import { TimePickerModal } from "react-native-paper-dates";
import { styles } from "../../components/styles/addreminderStyles";

const Reminder = ({ showAddReminder = true }) => {
  const [state, setState] = useState({
    title: "",
    description: "",
    selectedDate: "Select Date",
    selectedTime: "Select Time",
    timeModalVisible: false,
    reminders: [],
    editingId: null,
    isCalendarVisible: false,
    time: { hours: 0, minutes: 0 },
    editingText: "",
  });

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }

    const fetchReminders = async () => {
      const storedReminders = await AsyncStorage.getItem("reminders");
      if (storedReminders) {
        setState((prevState) => ({
          ...prevState,
          reminders: JSON.parse(storedReminders),
        }));
      }
    };
    fetchReminders();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      state.reminders.forEach(({ title, date, time }) => {
        const now = new Date();
        const reminderTime = new Date(`${date} ${time}`);
        if (reminderTime - now <= 60000 && reminderTime - now > 0) {
          new Notification("Reminder Alert!", { body: `Time for: ${title}` });
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [state.reminders]);

  const updateState = (newValues) => {
    setState((prevState) => ({ ...prevState, ...newValues }));
  };

  const handleDateChange = (date) => {
    updateState({
      selectedDate: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
      isCalendarVisible: false,
    });
  };

  const addReminder = async () => {
    const { title, selectedDate, selectedTime, reminders } = state;
    if (!title || selectedDate === "Select Date" || selectedTime === "Select Time") {
      return Alert.alert("Incomplete Fields", "Please enter all details!");
    }
    const newReminder = { title, description: state.description, date: selectedDate, time: selectedTime };
    const updatedReminders = [...reminders, newReminder];

    updateState({ reminders: updatedReminders, title: "", description: "", selectedDate: "Select Date", selectedTime: "Select Time" });
    await AsyncStorage.setItem("reminders", JSON.stringify(updatedReminders));
  };

  const deleteReminder = async (index) => {
    const updatedReminders = state.reminders.filter((_, i) => i !== index);
    updateState({ reminders: updatedReminders });
    await AsyncStorage.setItem("reminders", JSON.stringify(updatedReminders));
  };

  const onConfirmTime = ({ hours, minutes }) => {
    updateState({
      time: { hours, minutes },
      selectedTime: `${hours}:${minutes < 10 ? "0" + minutes : minutes}`,
      timeModalVisible: false,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {showAddReminder && (
        <View style={styles.mainContainer}>
          <Text style={styles.text}>Title</Text>
          <TextInput style={styles.input} placeholder="Title" value={state.title} onChangeText={(title) => updateState({ title })} />

          <Text style={styles.text}>Description</Text>
          <TextInput style={styles.multiInput} placeholder="Description" multiline value={state.description} onChangeText={(description) => updateState({ description })} />

          <Text style={styles.text}>Date</Text>
          <Pressable style={styles.inputWithIcon} onPress={() => updateState({ isCalendarVisible: true })}>
            <Image source={require("../../assets/images/calendaricon.png")} style={styles.icon} />
            <Text>{state.selectedDate}</Text>
          </Pressable>

          <Text style={styles.text}>Time</Text>
          <Pressable style={styles.inputWithIcon} onPress={() => updateState({ timeModalVisible: true })}>
            <Image source={require("../../assets/images/timeicon.png")} style={styles.icon} />
            <Text>{state.selectedTime}</Text>
          </Pressable>

          <Pressable style={styles.addButton} onPress={addReminder}>
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>
      )}

      <FlatList
        data={state.reminders}
        renderItem={({ item, index }) => (
          <View style={styles.reminderItem}>
            <Text style={styles.reminderTitle}>{item.title}</Text>
            <Pressable style={styles.deleteButton} onPress={() => deleteReminder(index)}>
              <Image source={require("../../assets/images/removeicon.png")} style={styles.icon} />
            </Pressable>
          </View>
        )}
      />

      <Modal visible={state.isCalendarVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <Pressable style={styles.modalOverlay} onPress={() => updateState({ isCalendarVisible: false })} />
          <View style={styles.modalContent}>
            <CalendarPicker onDateChange={handleDateChange} />
            <Pressable style={styles.closeButton} onPress={() => updateState({ isCalendarVisible: false })}>
              <Text>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <TimePickerModal visible={state.timeModalVisible} onDismiss={() => updateState({ timeModalVisible: false })} onConfirm={onConfirmTime} label="Select a time" hours={state.time.hours} minutes={state.time.minutes} />
    </SafeAreaView>
  );
};

export default Reminder;
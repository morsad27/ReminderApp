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

const reminder = ( {showAddReminder = true }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("Select Date");
  const [selectedTime, setSelectedTime] = useState("Select Time");
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [time, setTime] = useState({ hours: 0, minutes: 0 });
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }

    //LILIPAT TONG FUNCTION SA ROOT
    const fetchReminders = async () => {
      const storedReminders = await AsyncStorage.getItem("reminders");
      if (storedReminders) setReminders(JSON.parse(storedReminders));
    };
    fetchReminders();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      reminders.forEach(({ title, date, time }) => {
        const now = new Date();
        const reminderTime = new Date(`${date} ${time}`);
        if (reminderTime - now <= 60000 && reminderTime - now > 0) {
          new Notification("Reminder Alert!", { body: `Time for: ${title}` });
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [reminders]);

  const handleDateChange = (date) => {
    setSelectedDate(
      `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    );
    setIsCalendarVisible(false);
  };

  const addReminder = async () => {
    if (
      !title ||
      selectedDate === "Select Date" ||
      selectedTime === "Select Time"
    ) {
      return Alert.alert("Incomplete Fields", "Please enter all details!");
    }
    const newReminder = {
      title,
      description,
      date: selectedDate,
      time: selectedTime,
    };
    const updatedReminders = [...reminders, newReminder];
    setReminders(updatedReminders);
    await AsyncStorage.setItem("reminders", JSON.stringify(updatedReminders));
    //optional for reminder
    // new Notification("Reminder Added!", {
    //   body: `Upcoming: ${title} at ${selectedTime}`,
    // });

    setTitle("");
    setDescription("");
    setSelectedDate("Select Date");
    setSelectedTime("Select Time");
  };

  const deleteReminder = async (index) => {
    const updatedReminders = reminders.filter((_, i) => i !== index);
    setReminders(updatedReminders);
    await AsyncStorage.setItem("reminders", JSON.stringify(updatedReminders));
  };

  const onConfirmTime = ({ hours, minutes }) => {
    setTime({ hours, minutes });
    setSelectedTime(`${hours}:${minutes < 10 ? "0" + minutes : minutes}`);
    setTimeModalVisible(false);
  };

  const editReminder = async (id, newText) => {
    try {
      const updatedReminders = reminders.map((item, index) =>
        index === id ? { ...item, title: newText } : item
      );
      setReminders(updatedReminders);
      await AsyncStorage.setItem("reminders", JSON.stringify(updatedReminders));
    } catch (err) {
      alert("Error updating reminder: " + err);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {showAddReminder && (
      <View style={styles.mainContainer}>
        <Text style={styles.text}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.text}>Description</Text>
        <TextInput
          style={styles.multiInput}
          placeholder="Description"
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.text}>Date</Text>
        <Pressable
          style={styles.inputWithIcon}
          onPress={() => setIsCalendarVisible(true)}
        >
          <Image
            source={require("../../assets/images/calendaricon.png")}
            style={styles.icon}
          />
          <Text>{selectedDate}</Text>
        </Pressable>

        <Text style={styles.text}>Time</Text>
        <Pressable
          style={styles.inputWithIcon}
          onPress={() => setTimeModalVisible(true)}
        >
          <Image
            source={require("../../assets/images/timeicon.png")}
            style={styles.icon}
          />
          <Text>{selectedTime}</Text>
        </Pressable>

        <Pressable style={styles.addButton} onPress={addReminder}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View> )}

      <FlatList
        data={reminders}
        renderItem={({ item, index }) => (
          <View style={styles.reminderItem}>
            {item.id === editingId ? (
              <TextInput
                style={styles.input}
                value={editingText}
                onChangeText={(text) => setEditingText(text)}
                onBlur={() => {
                  editReminder(item.id, editingText);
                  setEditingId(null);
                }}
              />
            ) : (
              <Text
                style={styles.reminderTitle}
                onPress={() => {
                  setEditingId(item.id);
                  setEditingText(item.text);
                }}
              >
                {item.title}
              </Text>
            )}

            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteReminder(index)}
            >
              <Image
                source={require("../../assets/images/removeicon.png")}
                style={styles.icon}
              />
            </Pressable>
          </View>
        )}
      />

      <Modal visible={isCalendarVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setIsCalendarVisible(false)}
          />
          <View style={styles.modalContent}>
            <CalendarPicker onDateChange={handleDateChange} />
            <Pressable
              style={styles.closeButton}
              onPress={() => setIsCalendarVisible(false)}
            >
              <Text>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Time Picker Modal */}
      <TimePickerModal
        visible={timeModalVisible}
        onDismiss={() => setTimeModalVisible(false)}
        onConfirm={onConfirmTime}
        label="Select a time"
        hours={time.hours}
        minutes={time.minutes}
      />
    </SafeAreaView>
  );
};

export default reminder;

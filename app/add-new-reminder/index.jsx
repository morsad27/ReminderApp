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
import * as Notifications from "expo-notifications";
import { styles } from "../../components/styles/addreminderStyles";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";

const Index = ({
  showAddReminder = true,
  showlist = false,
  showdelete = false,
  showAdd = true,
}) => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("Select Date");
  const [selectedTime, setSelectedTime] = useState("Select Time");
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [time, setTime] = useState({ hours: 0, minutes: 0 });
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState();

  //load reminder pag focus sa page
  useFocusEffect(
    React.useCallback(() => {
      loadReminders();
      requestPermissions();
    }, [])
  );

  //load reminders galing sa asyncstorage
  const loadReminders = async () => {
    try {
      const storedReminders = await AsyncStorage.getItem("reminders");
      if (storedReminders) {
        setReminders(JSON.parse(storedReminders));
      }
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  //request notification permissions
  const requestPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      await Notifications.requestPermissionsAsync();
    }
  };

  //editing make the fields editable
  useEffect(() => {
    if (params.editReminder) {
      const reminder = JSON.parse(decodeURIComponent(params.editReminder));
      setTitle(reminder.title);
      setDescription(reminder.description);
      setSelectedDate(reminder.date);
      setSelectedTime(reminder.time);
      setEditingId(reminder.id);

      console.log("Editing reminder ID:", reminder.id);
    }
  }, [params]);

  //date selection
  const handleDateChange = (date) => {
    setSelectedDate(
      `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    );
    setIsCalendarVisible(false);
  };

  //scheduling Expo Notifications
  const scheduleExpoNotification = async (title, scheduledDate) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Reminder: ${title}`,
        body: description,
      },
      trigger: scheduledDate,
    });
  };

  //add or update reminder
  const addReminder = async () => {
    if (
      !title ||
      selectedDate === "Select Date" ||
      selectedTime === "Select Time"
    ) {
      return Alert.alert("Incomplete Fields", "Please enter all details!");
    }

    const [month, day, year] = selectedDate.split("/");
    const [hours, minutes] = selectedTime.split(":").map(Number);
    const reminderDate = new Date(year, month - 1, day, hours, minutes);

    if (reminderDate < new Date()) {
      return Alert.alert("Invalid Time", "Please select a future time.");
    }

    await scheduleExpoNotification(title, reminderDate);

    const newReminder = {
      id: editingId || Date.now().toString,
      title,
      description,
      date: selectedDate,
      time: selectedTime,
      timestamp: reminderDate.getTime(),
    };

    let updatedReminders = [...reminders];

    if (editingId !== null) {
      // If we are editing, update the reminder in the list
      updatedReminders = updatedReminders.map((reminder) =>
        reminder.id === editingId ? newReminder : reminder
      );
    } else {
      updatedReminders.push(newReminder);
    }

    setReminders(updatedReminders);
    await AsyncStorage.setItem("reminders", JSON.stringify(updatedReminders));

    setTitle("");
    setDescription("");
    setSelectedDate("Select Date");
    setSelectedTime("Select Time");
    setEditingId(null);
  };

  //delete reminder
  const deleteReminder = async (id) => {
    if (typeof id !== "string") {
      console.warn("Expected a string ID but got:", id);
      return;
    }
    const updatedReminders = reminders.filter((item) => item.id !== id);
    setReminders(updatedReminders);
    await AsyncStorage.setItem("reminders", JSON.stringify(updatedReminders));
  };

  //confirm time selection
  const onConfirmTime = ({ hours, minutes }) => {
    setTime({ hours, minutes });
    setSelectedTime(`${hours}:${minutes < 10 ? "0" + minutes : minutes}`);
    setTimeModalVisible(false);
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

          {showAdd && (
            <Pressable style={styles.addButton} onPress={addReminder}>
              <Text style={styles.addButtonText}>Add</Text>
            </Pressable>
          )}

          {showdelete && (
            <View style={styles.row}>
              <Pressable
                //on click it will save updated texts/changes
                style={styles.updateButton}
                onPress={() => deleteReminder(selectedItem.id)}
              >
                <Text style={styles.addButtonText}>Update</Text>
              </Pressable>
              <Pressable
                //remove from list
                style={styles.deleteButton}
                onPress={() => {
                  if (selectedItem) {
                    deleteReminder(selectedItem.id);
                  } else {
                    Alert.alert("Error", "No item selected for deletion.");
                  }
                }}
              >
                <Text style={styles.addButtonText}>Delete</Text>
              </Pressable>
            </View>
          )}
        </View>
      )}

      {showlist && (
        <View style={styles.padbot}>
          <FlatList
            data={reminders}
            renderItem={({ item }) => (
              <View style={styles.reminderItem}>
                <Text
                  style={styles.reminderTitle}
                  onPress={() => {
                    setEditingId(item.id);
                    setSelectedItem(item);
                  }}
                >
                  {item.title}
                </Text>

                <Text>
                  🕒{item.time} {"\n"} 
                  🗓️ {item.date}
                </Text>
                <Pressable
                  style={styles.editButton}
                  onPress={() => {
                    const params = encodeURIComponent(JSON.stringify(item));
                    router.push(`/edit-reminder?editReminder=${params}`);
                  }}
                >
                  <Image
                    source={require("../../assets/images/arrow.png")}
                    style={styles.icon}
                  />
                </Pressable>
              </View>
            )}
          />
        </View>
      )}

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
              <Text style={{ color: "#fff" }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

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

export default Index;

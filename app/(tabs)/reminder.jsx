import { Dimensions, SafeAreaView, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { styles } from "../../components/styles/reminderStyle";
import Reminders from "../../app/add-new-reminder/index";

const reminder = ({ showAddReminder = true }) => {
  return (
    <SafeAreaView style={styles.container}>
      {showAddReminder && (
        <Link href="../add-new-reminder" style={styles.addButton}>
          <Text style={styles.addButtonText}> Add new Reminder </Text>
        </Link>
      )}
      <Reminders style={{flex: 1}} showAddReminder={false} showlist={true} showdelete={false}/>
    </SafeAreaView>
  );
};

export default reminder;
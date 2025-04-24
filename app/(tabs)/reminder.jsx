import { Image, SafeAreaView, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { styles } from "../../components/styles/reminderStyle";
import Reminders from "../../app/add-new-reminder/index";

const reminder = ({ showAddReminder = true }) => {
  return (
    <SafeAreaView style={styles.container}>
      {showAddReminder && (
        <Link href="../add-new-reminder" style={styles.addButton}>
          <View style={styles.addContent}>
            <Image
              source={require("../../assets/images/add.png")}
              style={styles.icon}
            />
            <Text style={styles.addButtonText}>Add reminder</Text>
          </View>
        </Link>
      )}
      <Reminders
        style={{ flex: 1 }}
        showAddReminder={false}
        showlist={true}
        showdelete={false}
      />
    </SafeAreaView>
  );
};

export default reminder;

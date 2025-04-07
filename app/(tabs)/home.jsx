import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Header from "../../components/header";
import QuickView from "../../components/quickview";
import styles from "../../components/styles/homeStyles";
import { TodoProvider } from "../../constant/todoContext";
import { ReminderProvider } from "../../constant/reminderContext";

const Home = () => {
  const [selectedCapsule, setSelectedCapsule] = useState("Reminders");

  const handleCapsuleClick = (capsule) => {
    setSelectedCapsule(capsule);
  };

  return (
    <>
        <SafeAreaView style={styles.safeArea}>
          <Header />

          <Text style={styles.text}>Quick View</Text>

          <View style={styles.containerRow}>
            
            {/* Reminders Capsule */}
            <TouchableOpacity
              style={[
                styles.capsule,
                selectedCapsule === "Reminders" && styles.capsuleActive,
              ]}
              onPress={() => handleCapsuleClick("Reminders")}
            >
              <Text
                style={[
                  styles.capsuleText,
                  selectedCapsule === "Reminders" && styles.capsuleTextActive,
                ]}
              >
                Reminders
              </Text>
            </TouchableOpacity>

            {/* To-Dos Capsule */}
            <TouchableOpacity
              style={[
                styles.capsule,
                selectedCapsule === "To-Dos" && styles.capsuleActive,
              ]}
              onPress={() => handleCapsuleClick("To-Dos")}
            >
              <Text
                style={[
                  styles.capsuleText,
                  selectedCapsule === "To-Dos" && styles.capsuleTextActive,
                ]}
              >
                To-Dos
              </Text>
            </TouchableOpacity>
          </View>

          {/* QuickView Component */}
          <QuickView selectedCapsule={selectedCapsule} />
        </SafeAreaView>
    </>
  );
};

export default Home;
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import Add from "../add-new-reminder/index";
import { useLocalSearchParams } from "expo-router";
import { BlurView } from "expo-blur";
import { styles } from "../../components/styles/modalsStyles";

const index = () => {
  const { editReminder } = useLocalSearchParams();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.modalContainer}>
        <BlurView intensity={50} tint="light" style={StyleSheet.absoluteFill} />
        <View style={{ flex: 1 }}>
          <Add showdelete={true} showAdd={false} editReminder={editReminder} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default index;

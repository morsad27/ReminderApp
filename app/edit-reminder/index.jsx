import { View } from "react-native";
import React from "react";
import Add from "../add-new-reminder/index";
import { useLocalSearchParams } from "expo-router";

const index = () => {
  const { editReminder } = useLocalSearchParams();
  return (
    <View style={{ flex: 1 }}>
      <Add showdelete={true} showAdd={false} editReminder={editReminder} />
    </View>
  );
};

export default index;

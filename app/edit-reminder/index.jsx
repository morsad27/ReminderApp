import { View } from "react-native";
import React from "react";
import Add from "../add-new-reminder/index";

const index = () => {
  return (
    <View style={{ flex: 1 }}>
      <Add showdelete={true} showAdd={false} />
    </View>
  );
};

export default index;

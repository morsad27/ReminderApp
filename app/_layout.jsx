import { Stack } from "expo-router";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync();
        if (newStatus !== "granted") {
          Alert.alert("Permission Required", "Please enable notifications.");
        }
      }
    };

    requestPermissions();
  }, []);

  return (
    <>
      <StatusBar style="light" backgroundColor="#06f" />

      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="add-new-reminder/index"
          options={{
            headerShown: true,
            title: "Add New Reminder",
            headerStyle: {
              backgroundColor: "#06f",
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 30,
            },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold", alignSelf: "center" },
          }}
        />

        <Stack.Screen
          name="edit-reminder/index"
          options={{
            headerShown: true,
            title: "Edit reminder",
            headerStyle: {
              backgroundColor: "#06f",
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 30,
            },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold", alignSelf: "center" },
          }}
        />
      </Stack>
    </>
  );
}

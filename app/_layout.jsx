import { Stack } from "expo-router";

export default function RootLayout() {
  return (
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
    </Stack>
  );
}

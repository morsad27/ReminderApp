import { Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Image, View } from "react-native";
import { ReminderProvider } from "../../constant/reminderContext";
import { TodoProvider } from "../../constant/todoContext";

const TabsLayout = () => {
  return (
    <ReminderProvider>
      <TodoProvider>
        <SafeAreaProvider>
          <Tabs
            screenOptions={({ route }) => ({
              tabBarShowLabel: true,
              tabBarActiveTintColor: "#fff",
              tabBarInactiveTintColor: "#fff",
              tabBarStyle: {
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                paddingTop: 15,
                height: 88,
                backgroundColor: "#06f",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
              },
              tabBarLabelStyle: {
                fontSize: 16,
                fontFamily: "Segoe UI",
                fontWeight: "bold",
                paddingTop: 5,
              },
              tabBarIcon: ({ focused, color }) => (
                <View style={{ alignItems: "center" }}>
                  {/* Line  */}
                  {focused && (
                    <View
                      style={{
                        height: 4,
                        width: 60,
                        backgroundColor: "#fff",
                        borderRadius: 2,
                        marginBottom: 5,
                      }}
                    />
                  )}
                  {/*tab icon */}
                  <Image
                    source={
                      route.name === "home"
                        ? require("../../assets/images/homeicon.png")
                        : route.name === "reminder"
                        ? require("../../assets/images/remindericon.png")
                        : require("../../assets/images/todoicon.png")
                    }
                    style={{ width: 45, height: 44, tintColor: color }}
                  />
                </View>
              ),
            })}
          >
            <Tabs.Screen
              name="home"
              options={{
                headerShown: false,
                title: "Home",
                headerStyle: {
                  backgroundColor: "#06f",
                  borderBottomRightRadius: 30,
                  borderBottomLeftRadius: 30,
                },
                headerTintColor: "#fff",
                headerTitleStyle: { fontWeight: "bold", alignSelf: "center" },
              }}
            />
            <Tabs.Screen
              name="reminder"
              options={{
                headerShown: true,
                title: "Reminders",
                headerStyle: {
                  backgroundColor: "#06f",
                  // borderBottomRightRadius: 30,
                  // borderBottomLeftRadius: 30,
                },
                headerTintColor: "#fff",
                headerTitleStyle: { fontWeight: "bold", alignSelf: "center" },
              }}
            />
            <Tabs.Screen
              name="todo"
              options={{
                headerShown: true,
                title: "To-Dos",
                headerStyle: {
                  backgroundColor: "#06f",
                  // borderBottomRightRadius: 30,
                  // borderBottomLeftRadius: 30,
                },
                headerTintColor: "#fff",
                headerTitleStyle: { fontWeight: "bold", alignSelf: "center" },
              }}
            />
          </Tabs>
        </SafeAreaProvider>
       </TodoProvider>
     </ReminderProvider>
  );
};

export default TabsLayout;

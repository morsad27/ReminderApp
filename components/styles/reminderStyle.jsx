import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  addButton: {
    marginTop: 20,
    marginHorizontal: 10,
    backgroundColor: "#0066FF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },

  addContent: {
    paddingHorizontal: "20%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: "#fff",
  },

  addButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
});

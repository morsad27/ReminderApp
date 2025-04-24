import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 10,
  },
  editInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  actionButton: {
    alignItems: "center",
    gap: 5,
  },
  icon: {
    width: 40,
    height: 40,
    // tintColor: "#333",
  },
  deleteIcon: {
    width: 50,
    height: 50,
    // tintColor: "#333",
  },
  iconText: {
    paddingTop: -10,
    fontSize: 14,
    color: "#333",
  },
});

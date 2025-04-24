import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
    marginLeft: -20,
  },
  checkicon: {
    height: 20,
    width: 20,
    marginLeft: -10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  input: {
    minHeight: 55,
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    // borderRadius: 10,
  },
  
  // inputEdit: {
  //   minHeight: 35,
  //   borderColor: "#06f",
  //   marginLeft: 0,
  //   fontSize: 16,
  //   backgroundColor: "#fff",
  //   color: "#06f",
  //   margin: -10,
  // },
  addButton: {
    backgroundColor: "#06f",
    borderTopRightRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  todoItem: {
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 15,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: "#000",
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    paddingLeft: 8,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#A9A9A9",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  

  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  

  editingItem: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  
  inputEdit: {
    flex: 1,
    padding: 5,
    marginVertical: -3,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 20,
    backgroundColor: "white",
  },
  
  saveButton: {
    padding: 8,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  
});

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
    backgroundColor: "#ffffff",
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
    borderColor: "#000000",
    paddingLeft: 20,
    fontSize: 16,
    backgroundColor: "#ffffff",
    color: "#333",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    // borderRadius: 10,
  },
  editInput: {
    minHeight: 55,
    flex: 1,
    borderWidth: 1,
    borderColor: "#000000",
    // paddingLeft: 20,
    fontSize: 16,
    backgroundColor: "#ffffff",
    color: "#333",
    borderRadius: 10,
  },
  
  addButton: {
    backgroundColor: "#0066ff",
    borderTopRightRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
  },
  todoItem: {
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 15,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: "#000000",
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
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
    marginTop: 2,
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    borderWidth: 1,
    borderBlockColor: "#FF3B30",
    marginHorizontal: 10
  },
  deleteButtonText: {
    color: "#FF3B30",
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
    // marginTop: 20,
    backgroundColor: "#ffffff",
    paddingVertical: 2,
    paddingHorizontal: 1,
    borderRadius: 8,
    alignItems: "center",
  },
  saveicon:{
    height: 50,
    width: 50,
  },
  saveButtonText: {
    color: "#ffffff",
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
  
  
});

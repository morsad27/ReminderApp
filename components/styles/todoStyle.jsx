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
    marginLeft: 0,
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
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#A9A9A9",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },

  



  // ....


  editingItem: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  
  inputEdit: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginRight: 10,
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

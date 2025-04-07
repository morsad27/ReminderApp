import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  icon: {
    height: 33,
    width: 33,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 5,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
  },
  input: {
    flex: 1,
    borderColor: "#dcdcdc",
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    boxShadowColor: "#000",
    boxShadowOffset: { width: 0, height: 2 },
    boxShadowOpacity: 0.1,
    boxShadowRadius: 3,
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
});

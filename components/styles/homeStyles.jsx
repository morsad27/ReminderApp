import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
  },
  containerRow: {
    flexDirection: "row",
    padding: 10,
    gap: 10,
    justifyContent: "center",
  },
  capsule: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#06f",
    padding: 10,
  },
  capsuleActive: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#06f",
    padding: 10,
    backgroundColor: "#06f",
  },
  capsuleText: {
    fontSize: 16,
    fontWeight: "500",
  },
  capsuleTextActive: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
});

export default styles;

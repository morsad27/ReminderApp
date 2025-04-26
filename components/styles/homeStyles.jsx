import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    paddingLeft: "10%",
  },
  containerRow: {
    flexDirection: "row",
    padding: 5,
    gap: 50,
    justifyContent: "center",
  },
  capsule: {
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "#0066ff",
  },
  capsuleActive: {
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#0066ff",
    backgroundColor: "#0066ff",
  },
  capsuleText: {
    fontSize: 16,
    fontWeight: "500",
  },
  capsuleTextActive: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
  },
  center:{
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 22
  }
});

export default styles;

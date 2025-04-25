import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const windowwidth = Dimensions.get("screen").width;

const isTablet = windowwidth > 600;
const isNokia = windowwidth < 390;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingTop: "10%",
    alignItems: "center",
    backgroundColor: "#06f",
    borderBottomLeftRadius: isNokia ? 20 : isTablet ? 40 : 30,
    borderBottomRightRadius: isNokia ? 20 : isTablet ? 40 : 30,
    paddingBottom: 20,
  },
  row:{
    display: 'flex',
    flexDirection: 'row',
  },  
  logoText: {
    fontSize: isNokia ? 22 : isTablet ? 30 : 26,
    fontWeight: "bold",
    color: "#fff",
  },
  circleRow: {
    display: "flex",
    flexDirection: "row",
    padding: isNokia ? 0 : isTablet ? 20 : 10,
    gap: 20,
  },
  circle: {
    display: "flex",
    borderRadius: 100,
    backgroundColor: "#2AB37E",
    height: isNokia ? 130 : isTablet ? 180 : 160,
    width: isNokia ? 130 : isTablet ? 180 : 160,
    borderWidth: 2,
    borderColor: "#fff",
    justifyContent: "center",
  },
  text: {
    fontSize: isNokia ? 34 : isTablet ? 38 : 36,
    alignSelf: "center",
    fontWeight: "500",
    color: "#fff",
  },
  textTitle: {
    fontSize: isNokia ? 20 : isTablet ? 24 : 22,
    alignSelf: "center",
    fontWeight: "500",
    color: "#fff",
  },
  bottomText: {
    paddingTop: 10,
    fontSize: isNokia ? 16 : isTablet ? 20 : 18,
    alignSelf: "center",
    fontWeight: "500",
    color: "#fff",
  },
});

export default styles;

import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../constants/styles";

const screenHeight = Dimensions.get("window").height;

const MealsOverviewScreen = ({ route }) => {
  const { title, data } = route.params;
  console.log(data);
  console.log(title);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.list}>
          <Text style={styles.text1}>Calories</Text>
          <Text style={styles.text2}>{data.calories} cal</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.list}>
          <Text style={styles.text1}>Price</Text>
          <Text style={styles.text2}>$ {data.price}</Text>
        </View>
      </View>
    </View>
  );
};

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "flex-start",
    // alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 8,
    color: "white",
  },
  infoContainer: {
    backgroundColor: "#252323",
    marginVertical: 10,
    borderRadius: 8,
    width: "100%",
    height: screenHeight - 250,
    padding: 20,
    marginBottom: 10,
  },
  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  text1: {
    color: "#989898",
    fontSize: 18,
  },
  text2: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  horizontalLine: {
    borderBottomColor: "#989898",
    borderBottomWidth: 1,
    marginVertical: 15,
  },
});

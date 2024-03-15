import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../constants/styles";

const deviceWidth = Dimensions.get("window").width;

const MealsDetailOverviewScreen = ({ route }) => {
  const { title, data } = route.params;
  console.log(data);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{data.description} </Text>
      <View style={styles.infoContainer}>
        <View style={styles.list}>
          <Text style={styles.text1}>Calories</Text>
          <Text style={styles.text2}>{data.calories} cal</Text>
        </View>
        <View style={styles.horizontalLine} />
      </View>
    </View>
  );
};

export default MealsDetailOverviewScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "flex-start",
    // alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 8,
    color: "white",
  },
  infoContainer: {
    backgroundColor: "#252323",
    marginVertical: 10,
    borderRadius: 8,
    width: "100%",
    height: deviceWidth < 400 ? 550 : 650,
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
  description: {
    color: "#989898",
    fontSize: 13,
    marginHorizontal: 8,
  },
  horizontalLine: {
    borderBottomColor: "#989898",
    borderBottomWidth: 1,
    marginVertical: 15,
  },
});

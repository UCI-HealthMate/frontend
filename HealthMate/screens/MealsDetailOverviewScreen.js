import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../constants/styles";

const deviceWidth = Dimensions.get("window").width;

const MealsDetailOverviewScreen = ({ route }) => {
  const { title, data } = route.params;
  console.log(data);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Nutrition Facts</Text>
      <Text style={styles.description}>{data.description} </Text>
      <View style={styles.infoContainer}>
      <View style={styles.list}>
          <Text style={styles.text1}>Station</Text>
          <Text style={styles.text2}>{data.station}</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.list}>
          <Text style={styles.text1}>Calories</Text>
          <Text style={styles.text2}>{data.calories} cal</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.list}>
          <Text style={styles.text1}>Total Fat</Text>
          <Text style={styles.text2}>{data.totalFat} g</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.list}>
          <Text style={styles.text1}>Cholesterol</Text>
          <Text style={styles.text2}>{data.cholesterol} mg</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.list}>
          <Text style={styles.text1}>Sodium</Text>
          <Text style={styles.text2}>{data.sodium} mg</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.list}>
          <Text style={styles.text1}>Total Carbohydrate</Text>
          <Text style={styles.text2}>{data.totalCarbohydrates} g</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.list}>
          <Text style={styles.text1}>Total Sugars</Text>
          <Text style={styles.text2}>{data.sugars} g</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.list}>
          <Text style={styles.text1}>Protein</Text>
          <Text style={styles.text2}>{data.protein} g</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.list}>
          <Text style={styles.text1}>Vitamin A</Text>
          <Text style={styles.text2}>{data.vitaminA}%</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.list}>
          <Text style={styles.text1}>Vitamin C</Text>
          <Text style={styles.text2}>{data.vitaminC}%</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.list}>
          <Text style={styles.text1}>Iron</Text>
          <Text style={styles.text2}>{data.iron}%</Text>
        </View>
        {/* <View style={styles.horizontalLine} /> */}
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
    marginVertical: -20,
    paddingBottom: 25
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
    marginVertical: 1.5,
    marginHorizontal: 20,
  },
  text1: {
    color: "#989898",
    fontSize: 18,
    marginLeft: -18
  },
  text2: {
    color: "#FFFFFF",
    fontSize: 18,
    marginRight: -18
  },
  description: {
    color: "white",
    fontSize: 18,
    marginHorizontal: 8,
    paddingBottom: 10,
  },
  horizontalLine: {
    borderBottomColor: "#989898",
    borderBottomWidth: 1,
    marginVertical: 15,
  },
});

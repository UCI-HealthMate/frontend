import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { useState } from "react";
import { Colors } from "../constants/styles";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "../components/ui/Button";
import OptionalPopup from "../components/ui/OptionalPopup";

const deviceWidth = Dimensions.get("window").width;

const MealsOverviewScreen = ({ route }) => {
  const { title, data } = route.params;
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // console.log("MealsOverviewScreen", data);

  const navigation = useNavigation();

  let totalCalories = 0;

  const handleGobblePress = () => {
    setIsPopupVisible(true);
  };

  const updateTotalCalories = async () => {
    // console.log("Take it!!!: ", totalCalories);
    const now = new Date();
    const offsetInHours = -14;
    const currentDate = new Date(
      now.getTime() + (offsetInHours * 60 + now.getTimezoneOffset()) * 60000
    );
    console.log(currentDate);
    try {
      const existingData = await AsyncStorage.getItem("caloriesIntakeData");
      let newData = JSON.parse(existingData) || [
        { date: "2024-03-01T00:00:00.000Z", value: 2499 },
        { date: "2024-03-02T00:00:00.000Z", value: 2803 },
        { date: "2024-03-03T00:00:00.000Z", value: 2974 },
        { date: "2024-03-04T00:00:00.000Z", value: 2863 },
        { date: "2024-03-05T00:00:00.000Z", value: 2924 },
        { date: "2024-03-06T00:00:00.000Z", value: 2175 },
        { date: "2024-03-07T00:00:00.000Z", value: 2936 },
        { date: "2024-03-08T00:00:00.000Z", value: 2715 },
        { date: "2024-03-09T00:00:00.000Z", value: 2333 },
        { date: "2024-03-10T00:00:00.000Z", value: 2998 },
        { date: "2024-03-11T00:00:00.000Z", value: 2818 },
        { date: "2024-03-12T00:00:00.000Z", value: 2036 },
        { date: "2024-03-13T00:00:00.000Z", value: 2675 },
        { date: "2024-03-14T15:14:47.291Z", value: 2140 },
        { date: "2024-03-15T00:43:55.561Z", value: 340 },
      ];
      console.log(newData);
      newData.push({ date: currentDate, value: totalCalories });
      await AsyncStorage.setItem("caloriesIntakeData", JSON.stringify(newData));
      // console.log("Calories data saved successfully");
    } catch (error) {
      console.log("Failed to save calories data", error);
    }
  };

  const switchToMealOverview = (name, mData) => {
    navigation.navigate("MealsDetailOverview", { title: name, data: mData });
  };

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>{title.split(" ")[0]}</Text>
      <View style={styles.infoContainer}>
        {data?.map((m, key) => {
          totalCalories = totalCalories + m.calories;
          return (
            <View key={key}>
              <Pressable
                style={({ pressed }) => [pressed && styles.pressed]}
                onPress={() => {
                  switchToMealOverview(m.name, m);
                }}
              >
                <View style={styles.list}>
                  <Text style={styles.text1}>{m.name}</Text>
                  <Text style={styles.text2}>{m.calories} Calories</Text>
                </View>
              </Pressable>
              <View style={styles.horizontalLine} />
            </View>
          );
        })}
        <Text style={styles.total}>
          Total Calories:{"     "} {totalCalories} cal
        </Text>
        <View style={styles.button}>
          <Button onPress={handleGobblePress}>Gobble</Button>
        </View>
        <OptionalPopup
          isVisible={isPopupVisible}
          onClose={() => setIsPopupVisible(!isPopupVisible)}
          title="Food Confirmation"
          message={`This meal is ${totalCalories} cal.\n Do you still want to eat this food?`}
          onPressYes={updateTotalCalories}
        />
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
    padding: 20,
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
    height: deviceWidth < 400 ? 600 : 620,
    padding: 10,
    marginBottom: 10,
  },
  list: {
    flexDirection: "column",
    // justifyContent: "space-between",
    marginHorizontal: 1,
    marginVertical: 1,
  },
  text1: {
    color: "#FFFFFF",
    fontSize: 18,
    marginVertical: 5,
  },
  text2: {
    color: "#989898",
    fontSize: 16,
    marginVertical: 5,
  },
  horizontalLine: {
    borderBottomColor: "#989898",
    borderBottomWidth: 1,
    marginVertical: 15,
  },
  total: {
    color: Colors.primary500,
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
  },
  button: {
    marginTop: deviceWidth < 400 ? 20 : 30,
  },
  pressed: {
    opacity: 0.25,
  },
});

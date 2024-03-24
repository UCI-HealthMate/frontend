import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { Colors } from "../constants/styles";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getRecommendedMenu } from "../util/auth";
import Meal_Item from "../components/ui/Meal_Item";
import { AuthContext } from "../store/auth-context";

import FoodNeedsPopup from "../components/ui/FoodNeedsPopup";
import OptionalPopup from "../components/ui/OptionalPopup";

const deviceWidth = Dimensions.get("window").width;

const LogScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [foodNeedsUpdated, setFoodNeedsUpdated] = useState(false);
  const [foodNeedsReq, setFoodNeedsReq] = useState(false);
  const [reloginReq, setReloginReq] = useState(false);

  const [allergiesChecks, setAllergiesChecks] = useState({
    containsEggs: false,
    containsFish: false,
    containsMilk: false,
    containsPeanuts: false,
    containsSesame: false,
    containsShellfish: false,
    containsSoy: false,
    containsTreeNuts: false,
    containsWheat: false,
  });
  const [prefChecks, setPrefChecks] = useState({
    isGlutenFree: false,
    isHalal: false,
    isKosher: false,
    isLocallyGrown: false,
    isOrganic: false,
    isVegan: false,
    isVegetarian: false,
  });
  const [mealData, setMealData] = useState({});

  const navigation = useNavigation();

  const switchToMealOverview = (name, data) => {
    navigation.navigate("MealsOverview", { title: name, data: data });
  };

  const handleUpdateReqPopup = () => {
    setFoodNeedsReq(true);
  };

  const handleReloginReqPopup = () => {
    setReloginReq(true);
  };
  
  const breakFastData = mealData?.Breakfast;
  const lunchData = mealData?.Lunch;
  const dinnerData = mealData?.Dinner;

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const jsonStringAllergy = await AsyncStorage.getItem("allergy");
        // console.log("json:", jsonStringAllergy);
        const jsonStringPref = await AsyncStorage.getItem("pref");
        // console.log("json:", jsonStringPref);
        if (jsonStringAllergy === null && jsonStringPref === null) {
          // Alert.alert(
          //   "Food Needs Update Required!",
          //   "Please update your food needs.\nAfter pressing the plus button on the top right, you can select your food needs."
          // );
          handleUpdateReqPopup();
        } else if (jsonStringAllergy !== null && jsonStringPref !== null) {
          const allergies = await JSON.parse(jsonStringAllergy);
          const pref = await JSON.parse(jsonStringPref);

          setAllergiesChecks((prevAllergies) => ({
            ...prevAllergies,
            ...allergies,
          }));
          setPrefChecks((prevPref) => ({
            ...prevPref,
            ...pref,
          }));
          // console.log("Loaded preferences:", allergies);
          // console.log("Loaded preferences:", pref);
          const combinedNeeds = { ...allergies, ...pref };
          // console.log("Before sending to API: ", combinedNeeds);
          const meal = await getRecommendedMenu(combinedNeeds);
          setMealData((prevMeal) => ({
            ...prevMeal,
            ...meal,
          }));
          // console.log(mealData);
        }
      } catch (error) {
        // Alert.alert("Need to Re-Login!", "Please login again!!", [
        //   {
        //     text: "Cancel",
        //     onPress: () => console.log("Cancel Pressed"),
        //     style: "cancel",
        //   },
        //   {
        //     text: "OK",
        //     onPress: () => authCtx.logout(),
        //   },
        // ]
        // );
        handleReloginReqPopup();
      }
    };
    fetchMenu();
  }, []);

  const allergiesList = [
    { name: "Eggs", value: "containsEggs" },
    { name: "Fish", value: "containsFish" },
    { name: "Milk", value: "containsMilk" },
    { name: "Peanuts", value: "containsPeanuts" },
    { name: "Sesame", value: "containsSesame" },
    { name: "Shellfish", value: "containsShellfish" },
    { name: "Soy", value: "containsSoy" },
    { name: "Tree nuts", value: "containsTreeNuts" },
    { name: "Wheat", value: "containsWheat" },
  ];

  const prefList = [
    { name: "Gluten free", value: "isGlutenFree" },
    { name: "Halal", value: "isHalal" },
    { name: "Kosher", value: "isKosher" },
    { name: "Locally grown", value: "isLocallyGrown" },
    { name: "Organic", value: "isOrganic" },
    { name: "Vegan", value: "isVegan" },
    { name: "Vegetarian", value: "isVegetarian" },
  ];

  const updateNeeds = async () => {
    try {
      const jsonStringAllergy = JSON.stringify(allergiesChecks);
      const jsonStringPref = JSON.stringify(prefChecks);
      await AsyncStorage.setItem("allergy", jsonStringAllergy);
      await AsyncStorage.setItem("pref", jsonStringPref);
      const combinedNeeds = { ...allergiesChecks, ...prefChecks };
      // console.log(combinedNeeds);
      const meal = await getRecommendedMenu(combinedNeeds);
      setMealData((prevMeal) => ({
        ...prevMeal,
        ...meal,
      }));
      // console.log(mealData);
      setModalVisible(!isModalVisible);
      setFoodNeedsUpdated(true);
      } catch (error) {
      // console.error('Failed to save the preferences.', e);
      // Alert.alert("Need to Re-Login!", "Please login again!!", [
      //   {
      //     text: "Cancel",
      //     onPress: () => console.log("Cancel Pressed"),
      //     style: "cancel",
      //   },
      //   {
      //     text: "OK",
      //     onPress: () => authCtx.logout(),
      //   },
      // ]);
      handleReloginReqPopup();
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleAllergyCheck = (item) => {
    setAllergiesChecks((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const togglePrefCheck = (item) => {
    setPrefChecks((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Recommended Food</Text>
      <FoodNeedsPopup
        isVisible={foodNeedsUpdated}
        onClose={() => {setFoodNeedsUpdated(false); navigation.navigate("Account")}}
        title="Food Needs Updated. Syncing Required!"
        message='Please press "Sync" from Account screen for more tailored recommendations'
      />
      <FoodNeedsPopup
        isVisible={foodNeedsReq}
        onClose={() => setFoodNeedsReq(false)}
        title="Update your food needs!"
        message="Press the plus sign at the top right and select your food needs."
      />
      <OptionalPopup
          isVisible={reloginReq}
          onClose={() => {setReloginReq(false); console.log("Cancel Pressed")}}
          title="Re-Login Required!"
          message={`Press "Confirm" to go back to the login screen.`}
          onPressYes={() => authCtx.logout()}
      />
      <TouchableOpacity onPress={toggleModal} style={styles.plusButton}>
        <Text style={styles.plusButtonText}>+</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>x</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.modalTitle}>Update your food needs</Text>
          <View style={styles.horizontalLine} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginVertical: 5 }}
          >
            <View style={styles.modalBody}>
              <View style={styles.allergyBody}>
                <Text style={styles.sectionTitle}>Allergies</Text>
                {allergiesList.map((allergy, i) => {
                  return (
                    <View style={styles.toggleSection} key={i}>
                      <Text style={styles.sectionText}>{allergy.name}</Text>
                      <View
                        style={{
                          transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
                        }}
                      >
                        <CheckBox
                          disabled={false}
                          value={allergiesChecks[allergy.value] || false}
                          onValueChange={() =>
                            toggleAllergyCheck(allergy.value)
                          }
                          onAnimationType="fill"
                          onCheckColor="#28282B"
                          onFillColor="#FFC9CB"
                          onTintColor="#FFC9CB"
                        />
                      </View>
                    </View>
                  );
                })}
              </View>
              <View style={styles.prefBody}>
                <Text style={styles.sectionTitle}>Preferences</Text>
                {prefList.map((pref, i) => {
                  return (
                    <View style={styles.toggleSection} key={i}>
                      <Text style={styles.sectionText}>{pref.name}</Text>
                      <View
                        style={{
                          transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
                        }}
                      >
                        <CheckBox
                          disabled={false}
                          value={prefChecks[pref.value] || false}
                          onValueChange={() => togglePrefCheck(pref.value)}
                          onAnimationType="fill"
                          onCheckColor="#28282B"
                          onFillColor="#FFC9CB"
                          onTintColor="#FFC9CB"
                        />
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </ScrollView>
          <View style={styles.horizontalLine} />
          <TouchableOpacity onPress={updateNeeds} style={styles.addButton}>
            <Text style={styles.addButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.periodContainer}>
        <Text style={styles.periodTitle}>Breakfast</Text>
        <View style={styles.periodBox}>
          <Meal_Item
            onPress={() => {
              switchToMealOverview("Breakfast #1", breakFastData?.["1"]);
            }}
          >
            Recommended Breakfast #1
          </Meal_Item>
          <View style={styles.horizontalLine} />
          <Meal_Item
            onPress={() => {
              switchToMealOverview("Breakfast #2", breakFastData?.["2"]);
            }}
          >
            Recommended Breakfast #2
          </Meal_Item>
          <View style={styles.horizontalLine} />
          <Meal_Item
            onPress={() => {
              switchToMealOverview("Breakfast #3", breakFastData?.["3"]);
            }}
          >
            Recommended Breakfast #3
          </Meal_Item>
        </View>
        <Text style={styles.periodTitle}>Lunch</Text>
        <View style={styles.periodBox}>
          <Meal_Item
            onPress={() => {
              switchToMealOverview("Lunch #1", lunchData?.["1"]);
            }}
          >
            Recommended Lunch #1
          </Meal_Item>
          <View style={styles.horizontalLine} />
          <Meal_Item
            onPress={() => {
              switchToMealOverview("Lunch #2", lunchData?.["2"]);
            }}
          >
            Recommended Lunch #2
          </Meal_Item>
          <View style={styles.horizontalLine} />
          <Meal_Item
            onPress={() => {
              switchToMealOverview("Lunch #3", lunchData?.["3"]);
            }}
          >
            Recommended Lunch #3
          </Meal_Item>
        </View>
        <Text style={styles.periodTitle}>Dinner</Text>
        <View style={styles.periodBox}>
          <Meal_Item
            onPress={() => {
              switchToMealOverview("Dinner #1", dinnerData?.["1"]);
            }}
          >
            Recommended Dinner #1
          </Meal_Item>
          <View style={styles.horizontalLine} />
          <Meal_Item
            onPress={() => {
              switchToMealOverview("Dinner #2", dinnerData?.["2"]);
            }}
          >
            Recommended Dinner #2
          </Meal_Item>
          <View style={styles.horizontalLine} />
          <Meal_Item
            onPress={() => {
              switchToMealOverview("Dinner #3", dinnerData?.["3"]);
            }}
          >
            Recommended Dinner #3
          </Meal_Item>
        </View>
      </View>
    </View>
  );
};

export default LogScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    paddingTop: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: Colors.primary500,
  },
  periodContainer: {
    flex: 1,
    marginVertical: 10,
    borderRadius: 8,
    width: "100%",
    marginBottom: 8,
  },
  periodTitle: {
    fontSize: 18,
    color: Colors.primary100,
    marginLeft: 8,
    marginTop: 15,
    fontWeight: "600",
  },
  periodBox: {
    backgroundColor: "#252323",
    marginVertical: 10,
    borderRadius: 8,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 8,
  },
  plusButton: {
    position: "absolute",
    top: 48,
    right: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  plusButtonText: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
  },
  horizontalLine: {
    borderBottomColor: "#989898",
    borderBottomWidth: 1,
  },
  modalContainer: {
    flex: 1,
    // alignItems: "center",
    padding: 20,
    height: 50,
    borderRadius: 8,
    backgroundColor: Colors.primary600,
    margin: 30,
    marginVertical: 110,
    borderWidth: 4,
    borderColor: Colors.primary500,
  },
  modalHeader: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 16,
    color: Colors.primary500,
    alignSelf: "center",
    marginTop: -25,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 8,
    color: Colors.primary500,
    alignSelf: "center",
  },
  sectionText: {
    fontSize: 16,
    color: Colors.primary100,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: -20,
    marginRight: -15,
  },
  addButton: {
    backgroundColor: Colors.primary500,
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    width: 100,
    alignSelf: "center",
  },
  addButtonText: {
    color: Colors.primary800,
    fontWeight: "bold",
    textAlign: "center",
  },
  toggleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
  },
  horizontalLine: {
    borderBottomColor: "#989898",
    borderBottomWidth: 1,
    marginVertical: deviceWidth < 400 ? 6 : 8,
  },
});

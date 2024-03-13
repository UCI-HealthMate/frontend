import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { Colors } from "../constants/styles";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { getRecommendedMenu } from "../util/auth";
import Meal_Item from "../components/ui/Meal_Item";
import { AuthContext } from "../store/auth-context";

const LogScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [allergiesChecks, setAllergiesChecks] = useState({});
  const [prefChecks, setPrefChecks] = useState({});

  const navigation = useNavigation();

  const switchToMealOverview = (data) => {
    navigation.navigate("MealsOverview", { title: data.name, data: data });
  };

  const breakfastFoodsDummy = [
    {
      name: "Oatmeal",
      calories: 150,
      price: 3.99,
    },
    {
      name: "Yogurt",
      calories: 100,
      price: 2.5,
    },
    {
      name: "Toast",
      calories: 200,
      price: 1.99,
    },
  ];

  const lunchFoodsDummy = [
    {
      name: "Chicken Salad",
      calories: 350,
      price: 7.99,
    },
    {
      name: "Ham Sandwich",
      calories: 400,
      price: 5.99,
    },
    {
      name: "Vegetable Soup",
      calories: 200,
      price: 4.99,
    },
  ];

  const dinnerFoodsDummy = [
    {
      name: "Grilled Salmon",
      calories: 500,
      price: 12.99,
    },
    {
      name: "Beef Steak",
      calories: 600,
      price: 15.99,
    },
    {
      name: "Spaghetti Carbonara",
      calories: 450,
      price: 8.99,
    },
  ];

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        await getRecommendedMenu();
      } catch (error) {
        Alert.alert("Need to Re-Login!", "Please login again!!", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => authCtx.logout(),
          },
        ]);
      }
    };
    fetchMenu();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const allergiesList = [
    "Eggs",
    "Fish",
    "Milk",
    "Peanuts",
    "Sesame",
    "Shellfish",
    "Soy",
    "Tree nuts",
    "Wheat",
  ];
  const prefList = [
    "Gluten free",
    "Halal",
    "Kosher",
    "Locally grown",
    "Organic",
    "Vegan",
    "Vegetarian",
  ];

  const toggleAllergyCheck = (item) => {
    setAllergiesChecks((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const togglePrefCheck = (item) => {
    setPrefChecks((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Recommended</Text>
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
                      <Text style={styles.sectionText}>{allergy}</Text>
                      <View
                        style={{
                          transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
                        }}
                      >
                        <CheckBox
                          disabled={false}
                          value={allergiesChecks[allergy] || false}
                          onValueChange={() => toggleAllergyCheck(allergy)}
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
                      <Text style={styles.sectionText}>{pref}</Text>
                      <View
                        style={{
                          transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
                        }}
                      >
                        <CheckBox
                          disabled={false}
                          value={prefChecks[pref] || false}
                          onValueChange={() => togglePrefCheck(pref)}
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
          <TouchableOpacity onPress={toggleModal} style={styles.addButton}>
            <Text style={styles.addButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.periodContainer}>
        <Text style={styles.periodTitle}>Breakfast</Text>
        <View style={styles.periodBox}>
          {breakfastFoodsDummy.map((data, key) => {
            return (
              <Meal_Item
                key={key}
                onPress={() => {
                  switchToMealOverview(data);
                }}
              >
                {key + 1}
                {". "}
                {data.name}
              </Meal_Item>
            );
          })}
        </View>
        <Text style={styles.periodTitle}>Lunch</Text>
        <View style={styles.periodBox}>
          {lunchFoodsDummy.map((data, key) => {
            return (
              <Meal_Item
                key={key}
                onPress={() => {
                  switchToMealOverview(data);
                }}
              >
                {key + 1}
                {". "}
                {data.name}
              </Meal_Item>
            );
          })}
        </View>
        <Text style={styles.periodTitle}>Dinner</Text>
        <View style={styles.periodBox}>
          {dinnerFoodsDummy.map((data, key) => {
            return (
              <Meal_Item
                key={key}
                onPress={() => {
                  switchToMealOverview(data);
                }}
              >
                {key + 1}
                {". "}
                {data.name}
              </Meal_Item>
            );
          })}
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
    marginVertical: 20,
    borderRadius: 8,
    width: "100%",
    marginBottom: 8,
  },
  periodTitle: {
    fontSize: 18,
    color: Colors.primary100,
    marginLeft: 20,
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
    top: 60,
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
});

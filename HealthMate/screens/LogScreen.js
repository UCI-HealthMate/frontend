import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { Colors } from "../constants/styles";
import { useContext, useEffect, useState } from "react";

const LogScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [allergiesChecks, setAllergiesChecks] = useState({});
  const [prefChecks, setPrefChecks] = useState({});

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const allergiesList = [
    "eggs",
    "fish",
    "milk",
    "peanuts",
    "sesame",
    "shellfish",
    "soy",
    "tree nuts",
    "wheat",
  ];
  const prefList = [
    "gluten free",
    "halal",
    "kosher",
    "locally grown",
    "organic",
    "vegan",
    "vegetarian",
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
            <Text style={styles.addButtonText}>update</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.periodContainer}>
        <Text style={styles.periodTitle}>breakfast</Text>
        <View style={styles.periodBox}>
          <Text style={styles.periodTitle}>placeholder</Text>
        </View>
        <Text style={styles.periodTitle}>lunch</Text>
        <View style={styles.periodBox}>
          <Text style={styles.periodTitle}>placeholder</Text>
        </View>
        <Text style={styles.periodTitle}>dinner</Text>
        <View style={styles.periodBox}>
          <Text style={styles.periodTitle}>placeholder</Text>
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
    fontSize: 16,
    color: Colors.primary100,
  },
  periodBox: {
    backgroundColor: "#252323",
    marginVertical: 20,
    borderRadius: 8,
    width: "100%",
    padding: 15,
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
    fontSize: 20,
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
    marginTop: -35,
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
    fontSize: 16,
    fontWeight: "bold",
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
    color: "#fff",
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

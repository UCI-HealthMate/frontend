import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";
import Button from "../components/ui/Button";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";
import BubbleWithCharacter from "../components/ui/BubbleWithCharacter";
import Value from "../components/AccountInformation/Value";
import useHealthData from "../hooks/useHealthData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FoodNeedsPopup from "../components/ui/FoodNeedsPopup";

const AccountScreen = () => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  authCtx = useContext(AuthContext);
  const today2 = new Date();
  const startOfDay = new Date(
    today2.getFullYear(),
    today2.getMonth(),
    today2.getDate()
  );
  startOfDay.setHours(-7, 0, 0, 0);

  const calculateAge = (birthDateString) => {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const {
    biosex,
    birthday,
    height,
    weight,
    bodyFatPerc,
    bmi,
    steps,
    numFlights,
  } = useHealthData(startOfDay);

  const feet = Math.floor(height / 12);
  const inches = height % 12;

  const currentAge = calculateAge(birthday);

  const updateUserInfo = async () => {
    try {
      const existingData = await AsyncStorage.getItem("userInfo");
      let userInfo = JSON.parse(existingData) || {
        age: 21,
        bmi: 22,
        bodyFat: 20,
        calories: "0.0",
        height: 65,
        sex: "male",
        timeInBed: 7,
        weight: 170,
      };

      userInfo["sex"] = biosex !== "unknown" ? biosex : "male";
      userInfo["bodyFat"] = bodyFatPerc !== 0 ? bodyFatPerc.toFixed(1) : 20.0;
      userInfo["height"] = height !== 0 ? height.toFixed(1) : 65.0;
      userInfo["weight"] = weight !== 0 ? weight.toFixed(1) : 170.0;
      userInfo["age"] = currentAge !== 0 ? currentAge : 25.0;
      userInfo["bmi"] = bmi !== 0 ? bmi.toFixed(1) : 22.0;

      // console.log(userInfo);

      await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      setIsAlertVisible(true);
    } catch (error) {
      console.log("Failed to save calories data", error);
    }
  };

  return (
    <View style={styles.rootContainer}>
      <FoodNeedsPopup
        isVisible={isAlertVisible}
        onClose={() => setIsAlertVisible(false)}
        title="Congrats!!"
        message="You can now view the updated recommended meals."
      />
      <BubbleWithCharacter>
        <View>
          <Text style={{ fontSize: 20, margin: 5, alignSelf: "center" }}>
            {authCtx.uid?.toUpperCase()}
          </Text>
          <Text style={{ fontSize: 20, margin: 0, alignSelf: "center" }}>
            {biosex} | {birthday}
          </Text>
        </View>
      </BubbleWithCharacter>
      <View style={styles.infoContainer}>
        <Value
          label="Height"
          value={feet ? `${feet.toFixed(0)}' ${inches.toFixed(0)}"` : "..."}
        />
        <Value
          label="Weight"
          value={weight ? `${weight.toFixed(1)} lbs` : "..."}
        />
        <Value label="Body Fat %" value={bodyFatPerc ? bodyFatPerc : "..."} />
        <Value label="Body Mass Index" value={bmi ? bmi : "..."} />
        <Value
          label="Step Count (today)"
          value={steps.toFixed(0) ? steps.toString() : "..."}
        />
        <Value
          label="Flights Climbed"
          value={numFlights ? numFlights.toString() : "..."}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 90 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginBottom: 0,
          }}
        >
          <View style={styles.button}>
            <Button onPress={updateUserInfo}>Sync</Button>
          </View>
          <View style={styles.button}>
            <Button bgColor="white" onPress={authCtx.logout}>
              Logout
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    padding: 20,
  },

  button: {
    marginHorizontal: 0,
  },
  infoContainer: {
    flexDirection: "column",
  },
});

import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";
import Button from "../components/ui/Button";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../store/auth-context";
import BubbleWithCharacter from "../components/ui/BubbleWithCharacter";
import Value from "../components/AccountInformation/Value";
import AppleHealthKit from 'react-native-health';
import App from "../App";

const STEPS_GOAL = 10000; // will have to call to be user-specific

const AccountScreen = () => {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [biosex, setBiosex] = useState(0);
  const [birthday, setBirthday] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bodyFatPerc, setBodyFatPerc] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [steps, setSteps] = useState(0);
  const [numFlights, setNumFlights] = useState(0);
  const feet = Math.floor(height / 12);
  const inches = height % 12;
  
  function formatBday(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
   
    return `${month}/${day}/${year}`;
   }

  useEffect(() => {
    const permissions = {
      permissions: {
        read: [
          AppleHealthKit.Constants.Permissions.BiologicalSex,
          AppleHealthKit.Constants.Permissions.DateOfBirth,
          AppleHealthKit.Constants.Permissions.Height,
          AppleHealthKit.Constants.Permissions.Weight,
          AppleHealthKit.Constants.Permissions.BodyFatPercentage,
          AppleHealthKit.Constants.Permissions.BodyMassIndex,
          AppleHealthKit.Constants.Permissions.StepCount, 
          AppleHealthKit.Constants.Permissions.FlightsClimbed,
        ],
        write: [],
      }
    };

    AppleHealthKit.initHealthKit(permissions, (err) => {
      if (err) {
        // console.log("error initializing Healthkit: ", err);
        return;
      } 
      setHasPermissions(true);
    });
  }, []);

  authCtx = useContext(AuthContext);
  
  useEffect(() => {
    if (!hasPermissions) {
      return;
    }

    let options = {
      date: new Date(2024, 2, 7).toISOString(),
      includeManuallyAdded: false,
    };

    AppleHealthKit.getBiologicalSex(options, (err, results) => {
      if (err) {
          return;
      }
      // console.log(results)
      setBiosex(results.value);
    });
    AppleHealthKit.getDateOfBirth(options, (err, results) => {
      if (err) {
          return;
      }
      // console.log(results)
      setBirthday(results.value);
    });
    AppleHealthKit.getLatestHeight(options, (err, results) => {
      if (err) {
          return;
      }
      // console.log(results)
      setHeight(results.value);
    });
    AppleHealthKit.getLatestWeight(options, (err, results) => {
      if (err) {
          return;
      }
      // console.log(results)
      setWeight(results.value);
    });
    AppleHealthKit.getLatestBodyFatPercentage(options, (err, results) => {
      if (err) {
          return;
      }
      // console.log(results)
      setBodyFatPerc(results.value);
    });
    AppleHealthKit.getLatestBmi(options, (err, results) => {
      if (err) {
          return;
      }
      // console.log(results)
      setBmi(results.value);
    });
    AppleHealthKit.getStepCount(options, (err, results) => {
      if (err) {
          return;
      }
      // console.log(results)
      setSteps(results.value);

    });
    AppleHealthKit.getFlightsClimbed(options, (err, results) => {
      if (err) {
          return;
      }
      // console.log(results)
      setNumFlights(results.value);
    });
  }, [hasPermissions]);

  return (
    <View style={styles.rootContainer}>
      <BubbleWithCharacter>
        <View>
          <Text style={{ fontSize: 20, margin: 5, alignSelf: "center" }}>
            Peter Anteater
          </Text>
          <Text style={{ fontSize: 20, margin: 0, alignSelf: "center" }}>
          {biosex === 'Male' ? 'Male' : 'Female'} | {formatBday(birthday)}
          </Text>
        </View>
      </BubbleWithCharacter>
      <View style={styles.infoContainer}>
          <Value label="Height" value={`${feet}' ${inches}"`} />
          <Value label="Weight" value={`${weight.toFixed(1)} lbs`} />
          <Value label="Body Fat %" value={bodyFatPerc} />
          <Value label="Body Mass Index" value={bmi} />
          <Value label="Step Count (today)" value={steps.toString()} />
          <Value label="Flights Climbed" value={numFlights.toString()} />
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
            <Button>Sync</Button>
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
    paddingTop: 60, // 상태 바 높이 고려
    padding: 20,
  },

  button: {
    marginHorizontal: 0,
  },
  infoContainer: {
    flexDirection: "column",  
  }
});

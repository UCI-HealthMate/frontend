import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";
import Button from "../components/ui/Button";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../store/auth-context";
import BubbleWithCharacter from "../components/ui/BubbleWithCharacter";
import Value from "../components/AccountInformation/Value";
import AppleHealthKit, { HealthKitPermissions, HealthInputOptions } from 'react-native-health';

const permissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.StepCount, AppleHealthKit.Constants.Permissions.ActiveEnergyBurned],
    write: [],
  }
};

const STEPS_GOAL = 10000; // will have to call to be user-specific

const AccountScreen = () => {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    AppleHealthKit.initHealthKit(permissions, (err) => {
      if (err) {
        console.log("error initializing Healthkit: ");
        return;
      } 
      setHasPermissions(true);
    })
    ;
  }, []);

  authCtx = useContext(AuthContext);
  useEffect(() => {
    if (!hasPermissions) {
      return;
    }

    const options = {
      date: new Date().toISOString(),
      includeManuallyAdded: false,
    };

    AppleHealthKit.getStepCount(options, (err, results) => {
      if (err) {
        console.log("error getting step count: ", err);
        return;
      }
      // console.log("step count: ", results.value);
      setSteps(results.value);
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
            Male | 01/01/2001
          </Text>
        </View>
      </BubbleWithCharacter>
      <View style={styles.infoContainer}>
          <Value label="Height" value="7'  0" />
          <Value label="Weight" value="165.2 lbs" />
          <Value label="Body fat %" value="35.3%" />
          <Value label="Body mass index" value="25" />
          <Value label="Active Energy" value="102.5 cal" />
          <Value label="Resting Energy" value="52.6 cal" />
          <Value label="Step count (today)" value={steps.toString()} />
          <Value label="Time in bed (week avg)" value="7h 32m" />
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

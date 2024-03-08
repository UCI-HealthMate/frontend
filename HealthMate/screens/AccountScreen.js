import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";
import Button from "../components/ui/Button";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";
import BubbleWithCharacter from "../components/ui/BubbleWithCharacter";
import Value from "../components/AccountInformation/Value";
import useHealthData from "../hooks/useHealthData";

const STEPS_GOAL = 10000; // will have to call to be user-specific

const AccountScreen = () => {
  authCtx = useContext(AuthContext);
  const {
    biosex,
    birthday,
    feet,
    inches,
    weight,
    bodyFatPerc,
    bmi,
    steps,
    numFlights,
  } = useHealthData(new Date(2024, 2, 7)); // date is 03/07/24

  return (
    <View style={styles.rootContainer}>
      <BubbleWithCharacter>
        <View>
          <Text style={{ fontSize: 20, margin: 5, alignSelf: "center" }}>
            Peter Anteater
          </Text>
          <Text style={{ fontSize: 20, margin: 0, alignSelf: "center" }}>
            {biosex} | {birthday}
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
  },
});

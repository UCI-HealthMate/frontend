import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";
import Button from "../components/ui/Button";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";
import BubbleWithCharacter from "../components/ui/BubbleWithCharacter";
import Value from "../components/AccountInformation/Value";
import useHealthData from "../hooks/useHealthData";

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
            {authCtx.uid}
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
          value={steps ? steps.toString() : "..."}
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

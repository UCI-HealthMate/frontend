import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppleHealthKit from "react-native-health";
import { Colors } from "../constants/styles";

const MainScreen = () => {
  const [steps, setSteps] = useState(0);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Main screen</Text>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: Colors.primary500,
  },
});

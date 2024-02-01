import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppleHealthKit from "react-native-health";

const WelcomeScreen = () => {
  const [steps, setSteps] = useState(0);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
    </View>
  );
};

export default WelcomeScreen;

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
  },
});

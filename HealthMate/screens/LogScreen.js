import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";

const LogScreen = () => {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>recommended</Text>
      <View style={styles.periodContainer}>
        <Text style={styles.periodTitle}>breakfast</Text>
        <Text style={styles.periodTitle}>lunch</Text>
        <Text style={styles.periodTitle}>dinner</Text>
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: Colors.primary500,
  },
  periodContainer: {},
  periodTitle: {},
});

import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";

const ExerciseScreen = () => {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Exercise screen</Text>
    </View>
  );
};

export default ExerciseScreen;

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

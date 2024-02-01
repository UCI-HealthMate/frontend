import AuthContent from "../components/Auth/AuthContent";
import { Text, View, StyleSheet } from "react-native";

const SignupScreen = () => {
  return (
    <View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>HealthMate</Text>
      </View>
      <AuthContent />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  textContainer: {
    marginTop: 70,
    padding: 10,
    alignSelf: "center",
  },
  text: {
    fontSize: 55,
    color: "gray",
    fontStyle: "italic",
    fontWeight: "500",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
});

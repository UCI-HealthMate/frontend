import { View, Text, StyleSheet, Image } from "react-native";

const Title = () => {
  return (
    <View style={styles.textContainer}>
      <Image
        source={require("../../assets/round.png")}
        style={{ width: 200, height: 200 }}
      />
      <Text style={styles.text}>HealthMate</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  textContainer: {
    marginTop: 50,
    padding: 10,
    alignSelf: "center",
  },
  text: {
    marginTop: -65,
    fontSize: 40,
    color: "#C6B2FA",
    fontStyle: "italic",
    fontWeight: "500",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
});

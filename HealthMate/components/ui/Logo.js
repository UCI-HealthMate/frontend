import { View, StyleSheet, Image } from "react-native";

const Logo = () => {
  return (
    <View style={styles.textContainer}>
      <Image
        source={require("../../assets/logo.png")}
        style={{ width: 150, height: 150 }}
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  textContainer: {
    marginTop: -50,
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

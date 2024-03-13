import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/styles";

const Button = ({ children, onPress, bgColor = Colors.primary500 }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        { ...styles.button, backgroundColor: bgColor },
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    width: 120,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    // backgroundColor: bgColor,
    elevation: 2,
    // borderWidth: 2,
    // borderColor: Colors.primary500,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.25,
  },
  buttonText: {
    textAlign: "center",
    color: Colors.primary800,
    fontSize: 16,
    fontWeight: "bold",
  },
});

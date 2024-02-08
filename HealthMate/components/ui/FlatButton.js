import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/styles";

const FlatButton = ({ children, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.25,
  },
  buttonText: {
    textAlign: "center",
    color: "#C6B2FA",
    fontWeight: "500",
    fontSize: 18,
  },
});

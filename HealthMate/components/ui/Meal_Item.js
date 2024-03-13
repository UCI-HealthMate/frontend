import { View, StyleSheet, Pressable, Text } from "react-native";
import { Colors } from "../../constants/styles";

const Meal_Item = ({ children, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.container}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default Meal_Item;

const styles = StyleSheet.create({
  button: {
    // paddingVertical: 6,
    // paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.25,
  },
  buttonText: {
    // textAlign: "center",
    color: Colors.primary100,
    // fontWeight: "500",
    fontSize: 16,
  },
  container: {
    marginVertical: 12,
  },
});

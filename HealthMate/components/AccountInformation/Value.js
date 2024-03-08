import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";

const Value = ({ label, value }) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};
export default Value;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: "white",
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary500,
  },
});

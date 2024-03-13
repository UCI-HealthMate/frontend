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
    fontSize: 20,
    color: "white",
    fontWeight: "500",
    marginVertical: 3,
  },
  value: {
    fontSize: 18,
    fontWeight: "400",
    color: Colors.primary500,
  },
  infoContainer: {
    marginBottom: 7,
  },
});

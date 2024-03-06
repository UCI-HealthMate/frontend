import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/styles";

const PeriodMenu = ({ onUpdatePeriod, sPeriod, bColor }) => {
  return (
    <View style={styles.filterContainer}>
      {["Day", "Week", "Month"].map((period) => (
        <Pressable
          key={period}
          onPress={() => {
            onUpdatePeriod(period);
          }}
          style={[
            styles.filterButton,
            sPeriod === period && {
              ...styles.selectedFilterButton,
              borderColor: bColor,
            },
          ]}
        >
          <Text style={styles.filterText}>{period}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default PeriodMenu;

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 15,
  },
  filterButton: {
    borderWidth: 3,
    borderColor: Colors.primary800,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  selectedFilterButton: {
    borderWidth: 3,
    // borderColor: Colors.primary500,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  filterText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
});

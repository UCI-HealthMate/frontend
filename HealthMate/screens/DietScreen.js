import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Colors } from "../constants/styles";
import { useEffect, useState } from "react";

import RingChart from "../components/ui/RingChart";
import BarChart from "../components/ui/BarChart";
import PeriodMenu from "../components/ui/PeriodMenu";

const deviceWidth = Dimensions.get("window").width;

const DietScreen = () => {
  const [cal, setCal] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState("Day");
  const [barData, setBarData] = useState([]);

  const dText = "---";
  const wText = "Here's your weekly average cal intake!";
  const mText = "Here's your monthly average cal intake!";

  const rDayText1 = "800 calories left to reach your goal today";
  const rWeekText1 = "Goal: 1000 cal";
  const rMonthText1 = "Goal: 1000 cal";

  useEffect(() => {
    setCal(200);
    setBarData([
      { value: 250, label: "9a" },
      { value: 500, label: "12p" },
      { value: 745, label: "3p" },
      { value: 320, label: "6p" },
      { value: 600, label: "9p" },
      { value: 256, label: "12a" },
      { value: 300, label: "3a" },
      { value: 300, label: "6a" },
    ]);
  }, []);

  return (
    <View style={styles.rootContainer}>
      <PeriodMenu
        onUpdatePeriod={setSelectedPeriod}
        sPeriod={selectedPeriod}
        bColor={Colors.primary500}
      />
      <View style={styles.ringContainer}>
        <Text style={styles.dText}>
          {selectedPeriod === "Day" && dText}
          {selectedPeriod === "Week" && wText}
          {selectedPeriod === "Month" && mText}
        </Text>
        <RingChart
          rSize={deviceWidth < 400 ? 165 : 190}
          rWidth={5}
          rBGWidth={10}
          rTColor={Colors.primary500}
          rFill={70}
        >
          <Text
            style={{
              fontSize: deviceWidth < 400 ? 16 : 20,
              fontWeight: "500",
              color: "pink",
            }}
          >
            {cal} Cal Intake
          </Text>
        </RingChart>

        <Text style={styles.ringText}>
          {selectedPeriod === "Day" && rDayText1}
          {selectedPeriod === "Week" && rWeekText1}
          {selectedPeriod === "Month" && rMonthText1}
        </Text>
      </View>
      <View style={styles.graphPlaceholder}>
        <BarChart barData={barData} bColor={Colors.primary500} />
      </View>
    </View>
  );
};

export default DietScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  ringContainer: {
    alignItems: "center",
  },
  dText: {
    color: "pink",
    fontSize: deviceWidth < 400 ? 16 : 18,
    marginVertical: 30,
  },
  ringText: {
    color: "pink",
    fontSize: deviceWidth < 400 ? 16 : 18,
    marginVertical: 30,
  },
  graphPlaceholder: {
    flex: 1,
    backgroundColor: "#252323",
    // marginHorizontal: 16,
    marginVertical: 60,
    borderRadius: 8,
    width: "100%",
    padding: 15,
  },
});

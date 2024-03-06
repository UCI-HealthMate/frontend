import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import RingChart from "../components/ui/RingChart";
import BarChart from "../components/ui/BarChart";
import PeriodMenu from "../components/ui/PeriodMenu";

const deviceWidth = Dimensions.get("window").width;

const SleepScreen = () => {
  const [sleepHours, setSleepHours] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState("Day");
  const [barData, setBarData] = useState([]);

  const dText = "---";
  const wText = "Here's your weekly average time asleep!";
  const mText = "Here's your monthly average time asleep!";

  const rDayText1 = "You have reach your goal today!";
  const rWeekText1 = "Goal: 7 hours";
  const rMonthText1 = "Goal: 7 hours";

  useEffect(() => {
    setSleepHours(7.5);
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
        bColor="#B1DBFA"
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
          rTColor={"#B1DBFA"}
          rFill={100}
        >
          <Text
            style={{
              fontSize: deviceWidth < 400 ? 16 : 20,
              fontWeight: "500",
              color: "#B1DBFA",
            }}
          >
            {sleepHours} hours done
          </Text>
        </RingChart>
        <Text style={styles.ringText}>
          {selectedPeriod === "Day" && rDayText1}
          {selectedPeriod === "Week" && rWeekText1}
          {selectedPeriod === "Month" && rMonthText1}
        </Text>
      </View>
      <View style={styles.graphPlaceholder}>
        <BarChart barData={barData} bColor="#B1DBFA" />
      </View>
    </View>
  );
};

export default SleepScreen;

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
    color: "#B1DBFA",
    fontSize: deviceWidth < 400 ? 16 : 18,
    marginVertical: 30,
  },
  ringText: {
    color: "#B1DBFA",
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

import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useEffect, useState } from "react";

import RingChart from "../components/ui/RingChart";
import BarChart from "../components/ui/BarChart";
import PeriodMenu from "../components/ui/PeriodMenu";

const deviceWidth = Dimensions.get("window").width;

const SleepScreen = ({ route }) => {
  console.log(route.params);
  const [sleepHours, setSleepHours] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState("Day");
  const [barData, setBarData] = useState([]);

  const dText = "---";
  const wText = "Here's your weekly average time asleep!";
  const mText = "Here's your monthly average time asleep!";

  const rDayText1 =
    sleepHours >= 7
      ? "You have reach your goal today!"
      : `${(7 - sleepHours).toFixed(
          1
        )} hours left until you reach your goal today`;
  const rWeekText1 = "Goal: 7 hours";
  const rMonthText1 = "Goal: 7 hours";

  useEffect(() => {
    if (selectedPeriod === "Day") {
      const todayData = route.params["today"][0] == undefined ?[{label:0,value:0}]:route.params["today"];
      setBarData(todayData);
      if (todayData.length > 0) {
        let hour = 0;
        todayData.map((m) => {
          if (m && typeof m === 'object' && 'value' in m) {
            hour = hour + m.value;
          }
        });
        setSleepHours(hour);
      }
    } else if (selectedPeriod === "Week") {
      // const thisWeekData = route.params["thisWeek"] || [{label:0,value:0}];
      const thisWeekData = route.params["thisWeek"][0] == undefined ?[{label:0,value:0}]:route.params["thisWeek"];
      setBarData(thisWeekData);
      if (thisWeekData.length > 0) {
        let hour = 0;
        let count = 0;
        thisWeekData.map((m) => {
          count += 1;
          if (m && typeof m === 'object' && 'value' in m) {
          hour = hour + m.value;
          }
        });
        setSleepHours(hour / count);
      }
    } else if (selectedPeriod === "Month") {
      // const thisMonthData = route.params["thisMonth"] || [{label:0,value:0}];
      const thisMonthData = route.params["thisMonth"][0] == undefined ?[{label:0,value:0}]:route.params["thisMonth"];
      setBarData(thisMonthData);
      if (thisMonthData.length > 0) {
        let hour = 0;
        let count = 0;
        thisMonthData.map((m) => {
          count += 1;
          if (m && typeof m === 'object' && 'value' in m) {
          hour = hour + m.value;
          }
        });
        setSleepHours(hour / count);
      }
    }
  }, [selectedPeriod]);

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
          rFill={sleepHours ? (sleepHours / 7) * 100 : 0}
        >
          <Text
            style={{
              fontSize: deviceWidth < 400 ? 16 : 20,
              fontWeight: "500",
              color: "#B1DBFA",
            }}
          >
            {sleepHours ? sleepHours.toFixed(1) : 0}
            {selectedPeriod === "Day" && " hours slept"}
            {selectedPeriod === "Week" && " hours avg"}
            {selectedPeriod === "Month" && " hours avg"}
          </Text>
        </RingChart>
        <Text style={styles.ringText}>
          {selectedPeriod === "Day" && rDayText1}
          {selectedPeriod === "Week" && rWeekText1}
          {selectedPeriod === "Month" && rMonthText1}
        </Text>
      </View>
      <View style={styles.graphPlaceholder}>
        <BarChart
          barData={barData}
          bColor="#B1DBFA"
          period={selectedPeriod}
          category="sleep"
        />
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

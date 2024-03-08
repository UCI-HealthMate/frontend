import { StyleSheet, Text, View, Dimensions } from "react-native";

import RingChart from "../components/ui/RingChart";
import BarChart from "../components/ui/BarChart";
import PeriodMenu from "../components/ui/PeriodMenu";
import { useEffect, useState } from "react";

const deviceWidth = Dimensions.get("window").width;

const ExerciseScreen = ({ route }) => {
  // console.log(route.params);
  const [time, setTime] = useState(0);
  const [calBurn, setCalBurn] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState("Day");
  const [barData, setBarData] = useState([]);

  const dText = "---";
  const wText = "Here's your weekly average mins & cal burned!";
  const mText = "Here's your monthly average mins & cal burned!";

  const rDayText1 = "15 mins left until\nYou reach your goal today";
  const rWeekText1 = "Goal: 60 mins";
  const rMonthText1 = "Goal: 60 mins";

  const rDayText2 =
    calBurn >= 600
      ? "You have reach your goal today!"
      : `${(600 - calBurn).toFixed(
          1
        )} cal left until\nYou reach your goal today`;

  const rWeekText2 = "Goal: 600 cals";
  const rMonthText2 = "Goal: 600 cals";

  useEffect(() => {
    setTime(45);
    if (selectedPeriod === "Day") {
      setBarData(route.params["today"]);
      let activeburned = 0;
      route.params["today"].map((m) => {
        activeburned = activeburned + m.value;
      });

      setCalBurn(activeburned);
    } else if (selectedPeriod === "Week") {
      setBarData(route.params["thisWeek"]);
      let activeburned = 0;
      let count = 0;
      route.params["thisWeek"].map((m) => {
        count += 1;
        activeburned = activeburned + m.value;
      });
      setCalBurn(activeburned / count);
    } else if (selectedPeriod === "Month") {
      setBarData(route.params["thisMonth"]);
      let activeburned = 0;
      let count = 0;
      route.params["thisMonth"].map((m) => {
        count += 1;
        activeburned = activeburned + m.value;
      });
      setCalBurn(activeburned / count);
    }
  }, [selectedPeriod]);

  return (
    <View style={styles.rootContainer}>
      <PeriodMenu
        onUpdatePeriod={setSelectedPeriod}
        sPeriod={selectedPeriod}
        bColor="#B2FAB1"
      />
      <View style={styles.ringContainer}>
        <Text style={styles.dText}>
          {selectedPeriod === "Day" && dText}
          {selectedPeriod === "Week" && wText}
          {selectedPeriod === "Month" && mText}
        </Text>
        <View>
          <View style={styles.subRing}>
            <RingChart
              rSize={deviceWidth < 400 ? 120 : 135}
              rWidth={3}
              rBGWidth={6}
              rTColor={"#B2FAB1"}
              rFill={40}
            >
              <Text
                style={{
                  fontSize: deviceWidth < 400 ? 16 : 18,
                  fontWeight: "500",
                  color: "#B2FAB1",
                  textAlign: "center",
                }}
              >
                {time}
                {selectedPeriod === "Day" && " mins\nDone"}
                {selectedPeriod === "Week" && " mins\nAvg"}
                {selectedPeriod === "Month" && " mins\nAvg"}
              </Text>
            </RingChart>
            {
              <Text style={styles.ringText}>
                {selectedPeriod === "Day" && rDayText1}
                {selectedPeriod === "Week" && rWeekText1}
                {selectedPeriod === "Month" && rMonthText1}
              </Text>
            }
          </View>
          <View style={styles.subRing}>
            <RingChart
              rSize={deviceWidth < 400 ? 120 : 135}
              rWidth={3}
              rBGWidth={6}
              rTColor={"#B2FAB1"}
              rFill={calBurn ? (calBurn / 600) * 100 : 0}
            >
              <Text
                style={{
                  fontSize: deviceWidth < 400 ? 16 : 18,
                  fontWeight: "500",
                  color: "#B2FAB1",
                  textAlign: "center",
                }}
              >
                {calBurn ? calBurn.toFixed(1) : 0}
                {selectedPeriod === "Day" && " cal\nBurned"}
                {selectedPeriod === "Week" && " cal\nAvg"}
                {selectedPeriod === "Month" && " cal\nAvg"}
              </Text>
            </RingChart>
            <Text style={styles.ringText}>
              {selectedPeriod === "Day" && rDayText2}
              {selectedPeriod === "Week" && rWeekText2}
              {selectedPeriod === "Month" && rMonthText2}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.graphPlaceholder}>
        <BarChart
          barData={barData}
          bColor="#B2FAB1"
          period={selectedPeriod}
          category="exercise"
        />
      </View>
    </View>
  );
};

export default ExerciseScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "space-between",
    // alignItems: "center",
    padding: 20,
  },
  ringContainer: {
    // alignItems: "flex-start",
    // alignContent: "flex-start",
  },
  dText: {
    alignSelf: "center",
    color: "#B2FAB1",
    fontSize: deviceWidth < 400 ? 16 : 18,
    marginVertical: 30,
  },
  ringText: {
    marginHorizontal: 20,
    color: "#B2FAB1",
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
  subRing: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
    // marginVertical: 5,
  },
});

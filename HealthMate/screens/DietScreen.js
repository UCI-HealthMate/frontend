import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Colors } from "../constants/styles";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const rDayText1 =
    cal >= 2500
      ? "You have reach your goal today!"
      : `${(2500 - cal).toFixed(1)} cal left until you reach your goal today`;
  const rWeekText1 = "Goal: 2500 cal";
  const rMonthText1 = "Goal: 2500 cal";

  useEffect(() => {
    setBarData([{ value: 0, label: "0" }]);
    const fetchData = async () => {
      const rawData = await AsyncStorage.getItem("caloriesIntakeData");
      const data = JSON.parse(rawData) || [];

      const today = new Date();
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      startOfDay.setHours(-7, 0, 0, 0);
      const startOfWeek = new Date(
        today.setDate(
          today.getDate() - today.getDay() + (today.getDay() == 0 ? -6 : 1)
        )
      );
      startOfWeek.setHours(-7, 0, 0, 0);
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      startOfMonth.setHours(-8, 0, 0, 0);
      if (selectedPeriod === "Day") {
        const todayDataMap = {};

        data.forEach((item) => {
          const itemDate = new Date(item.date);
          if (itemDate >= startOfDay) {
            const hour = itemDate.getUTCHours();
            const hourLabel = `${hour}`;
            if (!todayDataMap[hourLabel]) {
              todayDataMap[hourLabel] = { label: hourLabel, value: 0 };
            }
            todayDataMap[hourLabel].value += item.value;
          }
        });

        const aggregatedTodayData = Object.values(todayDataMap);
        // console.log(aggregatedTodayData);
        let totalCal = 0;
        aggregatedTodayData?.forEach((i) => {
          totalCal = totalCal + i.value;
        });
        setCal(totalCal);
        setBarData(aggregatedTodayData);
      } else if (selectedPeriod === "Week") {
        const weekData = {};
        data.forEach((item) => {
          const itemDate = new Date(item.date);
          const itemDayString = `${itemDate.getUTCDate()}`;

          if (itemDate >= startOfWeek) {
            weekData[itemDayString] =
              (weekData[itemDayString] || 0) + item.value;
          }
        });
        const weekDataArray = Object.keys(weekData).map((key) => ({
          label: key,
          value: weekData[key],
        }));
        // console.log(weekDataArray);
        let totalCal = 0;
        count = 0;
        weekDataArray?.forEach((i) => {
          totalCal = totalCal + i.value;
          count = count + 1;
        });
        setCal(totalCal / count);
        setBarData(weekDataArray);
      } else if (selectedPeriod === "Month") {
        const monthData = {};
        data.forEach((item) => {
          const itemDate = new Date(item.date);
          const itemDateString = `${itemDate.getUTCDate()}`;
          if (itemDate >= startOfMonth) {
            monthData[itemDateString] =
              (monthData[itemDateString] || 0) + item.value;
          }
        });
        const monthDataArray = Object.keys(monthData).map((key) => ({
          label: key,
          value: monthData[key],
        }));
        // console.log(monthDataArray);
        let totalCal = 0;
        count = 0;
        monthDataArray?.forEach((i) => {
          totalCal = totalCal + i.value;
          count = count + 1;
        });
        setCal(totalCal / count);
        setBarData(monthDataArray);
      }
    };
    fetchData();
  }, [selectedPeriod]);

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
          rFill={(cal / 2500) * 100}
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
        <BarChart
          barData={barData}
          bColor={Colors.primary500}
          period={selectedPeriod}
          category="diet"
        />
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

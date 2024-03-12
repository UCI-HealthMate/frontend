import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppleHealthKit from "react-native-health";

import { Colors } from "../constants/styles";
import BubbleWithCharacter from "../components/ui/BubbleWithCharacter";
import { useContext, useEffect, useState } from "react";
import RingChart from "../components/ui/RingChart";
import { AuthContext } from "../store/auth-context";

const deviceWidth = Dimensions.get("window").width;

const MainScreen = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [sleepData, setSleepData] = useState([{}]);
  const [activeBurned, setActiveBurned] = useState([{}]);

  const navigation = useNavigation();

  const switchToDiet = () => {
    navigation.navigate("Diet");
  };

  const switchToExercise = () => {
    navigation.navigate("Exercise", activeBurned);
  };

  const switchToSleep = () => {
    navigation.navigate("Sleep", sleepData);
  };

  const authCtx = useContext(AuthContext);

  let burnedToday = 0;
  activeBurned["today"]?.map((m) => {
    burnedToday += m.value;
  });

  useEffect(() => {
    const date = new Date();
    setCurrentDate(formatDate(date));
    // fetchDataAndSave(authCtx);
    const permissions = {
      permissions: {
        read: [
          AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
          AppleHealthKit.Constants.Permissions.StepCount,
          AppleHealthKit.Constants.Permissions.AppleExerciseTime,
          AppleHealthKit.Constants.Permissions.SleepAnalysis,
          AppleHealthKit.Constants.Permissions.ActivitySummary,
        ],
        // write: [AppleHealthKit.Constants.Permissions.Steps],
      },
    };

    const saveSleepData = async (key, data) => {
      try {
        const sleepData = data.map((m) => {
          if (m.value === "ASLEEP") {
            // console.log(key, m.startDate, m.endDate);
            const startTime = m.startDate;
            const endTime = m.endDate;
            const start = new Date(startTime);
            const end = new Date(endTime);
            const difference = end - start;
            const minutesSlept = difference / 1000 / 60;
            const dayOfStart = end.getDate();

            return {
              label: dayOfStart,
              value: Math.floor(minutesSlept) / 60,
              min: Math.floor(minutesSlept),
              startHour: start.getHours(),
              startMin: start.getMinutes(),
            };
          }
        });
        setSleepData((prevSleepData) => ({
          ...prevSleepData,
          [key]: sleepData,
        }));
      } catch (error) {
        console.error("Error saving data", error);
      }
    };
    const saveActiveEnergyBurned = async (key, data) => {
      try {
        if (key === "today") {
          const today = new Date();
          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, "0"); // 1을 더하고, 두 자리로 만들기
          const day = String(today.getDate()).padStart(2, "0");
          const todayDateString = `${year}-${month}-${day}`;
          const todayData = data.filter((item) => {
            // startDate에서 날짜 부분만 추출
            const startDateString = item.startDate.substring(0, 10);
            return startDateString === todayDateString;
          });
          const formattedData = todayData.map((item) => {
            const hour = new Date(item.startDate).getHours(); // startDate의 시간 부분
            return { label: `${hour}`, value: item.value };
          });
          // console.log(formattedData);
          setActiveBurned((prevActiveBurned) => ({
            ...prevActiveBurned,
            [key]: formattedData,
          }));
        } else {
          const aggregatedData = {};

          data.forEach(({ startDate, value }) => {
            const day = new Date(startDate).getDate();

            if (aggregatedData[day]) {
              aggregatedData[day] += value;
            } else {
              aggregatedData[day] = value;
            }
          });

          const result = Object.entries(aggregatedData).map(
            ([day, totalValue]) => {
              return { label: day, value: totalValue };
            }
          );

          setActiveBurned((prevActiveBurned) => ({
            ...prevActiveBurned,
            [key]: result,
          }));
        }
      } catch (error) {
        console.error("Error saving data", error);
      }
    };

    AppleHealthKit.initHealthKit(permissions, (error) => {
      if (error) {
        console.error("Error initializing HealthKit", error);
        return;
      }

      const now = new Date();
      const offsetInHours = -16;
      const today = new Date(
        now.getTime() + (offsetInHours * 60 + now.getTimezoneOffset()) * 60000
      );
      // 오늘의 데이터
      // const today = new Date();
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        -8
      );
      const endOfDay = new Date();
      console.log("today", today);
      console.log("startOfDay", startOfDay);
      console.log("endOfDay", endOfDay);

      // 이번 주의 시작과 끝을 계산
      const startOfWeek = new Date(
        today.setDate(
          today.getDate() - today.getDay() + (today.getDay() == 0 ? -6 : 1)
        )
      ); // 월요일
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(today.setDate(startOfWeek.getDate() + 6)); // 일요일
      endOfWeek.setHours(16, 59, 59, 999);

      // console.log("startOfWeek", startOfWeek);
      // console.log("endOfWeek", endOfWeek);

      // 이번 달의 시작과 끝
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0,
        16,
        59,
        59,
        999
      );

      // console.log("startOfMonth", startOfMonth);
      // console.log("endOfMonth", endOfMonth);

      const fetchDataForPeriod = (startDate, endDate, periodKey) => {
        AppleHealthKit.getSleepSamples(
          {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            ascending: true,
          },
          (err, results) => {
            if (err) {
              return console.error("Error fetching SleepSamples", err);
            }
            saveSleepData(periodKey, results);
          }
        );
        AppleHealthKit.getActiveEnergyBurned(
          {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            ascending: true,
          },
          (err, results) => {
            if (err) {
              return console.error("Error fetching ActiveEnergyBurned", err);
            }
            saveActiveEnergyBurned(periodKey, results);
            // console.log(periodKey, results);
          }
        );
        AppleHealthKit.getActivitySummary(
          {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            ascending: true,
          },
          (err, results) => {
            if (err) {
              return console.error("Error fetching ActivitySummary", err);
            }
            // saveActiveEnergyBurned(periodKey, results);
            console.log(periodKey, results);
          }
        );
      };

      fetchDataForPeriod(startOfDay, endOfDay, "today");
      fetchDataForPeriod(startOfWeek, endOfWeek, "thisWeek");
      fetchDataForPeriod(startOfMonth, endOfMonth, "thisMonth");
    });
  }, []);

  function formatDate(date) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const numDay = date.getDate();

    return `${day}, ${month} ${numDay}`;
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.dateText}>{currentDate}</Text>
      <BubbleWithCharacter>Welcome back, {authCtx.uid}!</BubbleWithCharacter>
      <View style={styles.statsContainer}>
        <View>
          <Pressable onPress={switchToDiet}>
            <RingChart
              rSize={deviceWidth < 400 ? 165 : 190}
              rWidth={5}
              rBGWidth={10}
              rTColor={Colors.primary500}
              rFill={70}
            >
              <Text
                style={{
                  fontSize: deviceWidth < 400 ? 21 : 25,
                  fontWeight: "500",
                  color: "pink",
                }}
              >
                Diet
              </Text>
              <Text
                style={{
                  fontSize: deviceWidth < 400 ? 13 : 15,
                  fontWeight: "400",
                  color: "white",
                }}
              >
                200 Cal Intake
              </Text>
            </RingChart>
          </Pressable>
        </View>
        <View style={styles.subStatsContainer}>
          <Pressable onPress={switchToExercise}>
            <RingChart
              rSize={deviceWidth < 400 ? 165 : 190}
              rWidth={5}
              rBGWidth={10}
              rTColor={"#B2FAB1"}
              rFill={burnedToday ? (burnedToday / 600) * 100 : 0}
            >
              <Text
                style={{
                  fontSize: deviceWidth < 400 ? 21 : 25,
                  fontWeight: "500",
                  color: "#B2FAB1",
                }}
              >
                Exercise
              </Text>
              <Text
                style={{
                  fontSize: deviceWidth < 400 ? 13 : 15,
                  fontWeight: "400",
                  color: "white",
                }}
              >
                45 mins done
              </Text>
              <Text
                style={{
                  fontSize: deviceWidth < 400 ? 13 : 15,
                  fontWeight: "400",
                  color: "white",
                }}
              >
                {/* 350 cal burned */}
                {burnedToday ? burnedToday.toFixed(1) : "..."} cal burned
              </Text>
            </RingChart>
          </Pressable>
          <Pressable onPress={switchToSleep}>
            <RingChart
              rSize={deviceWidth < 400 ? 165 : 190}
              rWidth={5}
              rBGWidth={10}
              rTColor={"#B1DBFA"}
              rFill={
                sleepData["today"]?.[0]?.value
                  ? (sleepData["today"][0].value / 7) * 100
                  : 0
              }
            >
              <Text
                style={{
                  fontSize: deviceWidth < 400 ? 21 : 25,
                  fontWeight: "500",
                  color: "#B1DBFA",
                }}
              >
                Sleep
              </Text>
              <Text
                style={{
                  fontSize: deviceWidth < 400 ? 13 : 15,
                  fontWeight: "400",
                  color: "white",
                }}
              >
                {sleepData["today"]?.[0]?.value
                  ? `${sleepData["today"][0].value.toFixed(1)} hours`
                  : "..."}
              </Text>
            </RingChart>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  dateText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 10,
    alignSelf: "flex-start",
  },
  statsContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: -30,
  },
  subStatsContainer: {
    flexDirection: "row",
    marginTop: -20,
  },
});

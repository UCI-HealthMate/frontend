import { Platform, Alert } from "react-native";
import AppleHealthKit from "react-native-health";

const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.AppleExerciseTime,
      AppleHealthKit.Constants.Permissions.SleepAnalysis,
    ],
    // write: [AppleHealthKit.Constants.Permissions.Steps],
  },
};

const saveSleepData = async (key, data) => {
  try {
    const sleepData = data.map((m) => {
      if (m.value === "ASLEEP") {
        console.log(key, m.startDate, m.endDate);
        const startTime = m.startDate;
        const endTime = m.endDate;
        const start = new Date(startTime);
        const end = new Date(endTime);

        const difference = end - start;

        const minutesSlept = difference / 1000 / 60;
        const dayOfStart = end.getDate();

        return { label: dayOfStart, value: Math.floor(minutesSlept) };
      }
    });
    console.log("Wow", sleepData);
    authCtx.saveSleepData(key, sleepData);
  } catch (error) {
    console.error("Error saving data", error);
  }
};

export const fetchDataAndSave = async (authCtx) => {
  if (Platform.OS === "ios") {
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
        today.getDate()
      );
      const endOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        39,
        59,
        59,
        999
      );
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

      console.log("startOfWeek", startOfWeek);
      console.log("endOfWeek", endOfWeek);

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

      console.log("startOfMonth", startOfMonth);
      console.log("endOfMonth", endOfMonth);

      const fetchDataForPeriod = (startDate, endDate, periodKey) => {
        AppleHealthKit.getSleepSamples(
          {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
          (err, results) => {
            if (err) {
              return console.error("Error fetching ActiveEnergyBurned", err);
            }
            saveSleepData(`sleep:${periodKey}`, results);
          }
        );
      };

      fetchDataForPeriod(startOfDay, endOfDay, "today");
      fetchDataForPeriod(startOfWeek, endOfWeek, "thisWeek");
      fetchDataForPeriod(startOfMonth, endOfMonth, "thisMonth");
    });
  } else {
    Alert.alert("HealthKit", "HealthKit is only available on iOS devices.");
  }
};

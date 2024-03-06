import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppleHealthKit from "react-native-health";

import { Colors } from "../constants/styles";
import BubbleWithCharacter from "../components/ui/BubbleWithCharacter";
import { useEffect, useState } from "react";
import RingChart from "../components/ui/RingChart";

const deviceWidth = Dimensions.get("window").width;

const MainScreen = () => {
  const [currentDate, setCurrentDate] = useState("");

  const [heartRateSamples, setHeartRateSamples] = useState([]);
  const [activity, setActivity] = useState([]);

  const navigation = useNavigation();

  const switchToDiet = () => {
    navigation.navigate("Diet");
  };

  const switchToExercise = () => {
    navigation.navigate("Exercise");
  };

  const switchToSleep = () => {
    navigation.navigate("Sleep");
  };
  useEffect(() => {
    const date = new Date();
    setCurrentDate(formatDate(date));

    // apple healthkit
    const permissions = {
      permissions: {
        read: [
          AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
          AppleHealthKit.Constants.Permissions.StepCount,
          AppleHealthKit.Constants.Permissions.AppleExerciseTime,
        ],
        // write: [AppleHealthKit.Constants.Permissions.Steps],
      },
    };

    AppleHealthKit.initHealthKit(permissions, (error) => {
      if (error) {
        console.log("[ERROR] Cannot grant permissions!", error);
        return;
      }

      const options = {
        startDate: new Date(2024, 2, 1).toISOString(),
        endDate: new Date().toISOString(),
      };

      AppleHealthKit.getActiveEnergyBurned(options, (err, results) => {
        if (err) {
          return;
        }
        console.log(options.startDate, options.endDate);
        setActivity(results);
        console.log(results);
      });
      AppleHealthKit.getDailyStepCountSamples(options, (err, results) => {
        if (err) {
          return;
        }
        console.log(options.startDate, options.endDate);
        setActivity(results);
        // console.log(results);
      });
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
      <BubbleWithCharacter>Welcome back, Peter!</BubbleWithCharacter>
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
              rFill={40}
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
                350 cal burned
              </Text>
            </RingChart>
          </Pressable>
          <Pressable onPress={switchToSleep}>
            <RingChart
              rSize={deviceWidth < 400 ? 165 : 190}
              rWidth={5}
              rBGWidth={10}
              rTColor={"#B1DBFA"}
              rFill={100}
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
                7.5 hours done
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

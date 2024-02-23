import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "../constants/styles";
import BubbleWithCharacter from "../components/ui/BubbleWithCharacter";
import { useEffect, useState } from "react";

const MainScreen = () => {
  const [currentDate, setCurrentDate] = useState("");

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
            <AnimatedCircularProgress
              size={190}
              width={5}
              backgroundWidth={10}
              fill={70}
              tintColor={Colors.primary500}
              backgroundColor="gray"
              rotation={360}
              padding={5}
              lineCap="round"
              style={{}}
            >
              {(fill) => (
                <>
                  <Text
                    style={{ fontSize: 25, fontWeight: "500", color: "pink" }}
                  >
                    Diet
                  </Text>
                  <Text
                    style={{ fontSize: 15, fontWeight: "400", color: "white" }}
                  >
                    200 Cal Intake
                  </Text>
                </>
              )}
            </AnimatedCircularProgress>
          </Pressable>
        </View>
        <View style={styles.subStatsContainer}>
          <Pressable onPress={switchToExercise}>
            <AnimatedCircularProgress
              size={190}
              width={5}
              backgroundWidth={10}
              fill={40}
              tintColor="#B2FAB1"
              backgroundColor="gray"
              rotation={360}
              padding={5}
              lineCap="round"
              style={{}}
            >
              {(fill) => (
                <>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: "500",
                      color: "#B2FAB1",
                    }}
                  >
                    Exercise
                  </Text>
                  <Text
                    style={{ fontSize: 15, fontWeight: "400", color: "white" }}
                  >
                    45 mins done
                  </Text>
                  <Text
                    style={{ fontSize: 15, fontWeight: "400", color: "white" }}
                  >
                    350 cal burned
                  </Text>
                </>
              )}
            </AnimatedCircularProgress>
          </Pressable>
          <Pressable onPress={switchToSleep}>
            <AnimatedCircularProgress
              size={190}
              width={5}
              backgroundWidth={10}
              fill={100}
              tintColor="#B1DBFA"
              backgroundColor="gray"
              rotation={360}
              padding={5}
              lineCap="round"
              style={{}}
            >
              {(fill) => (
                <>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: "500",
                      color: "#B1DBFA",
                    }}
                  >
                    Sleep
                  </Text>
                  <Text
                    style={{ fontSize: 15, fontWeight: "400", color: "white" }}
                  >
                    7.5 hours done
                  </Text>
                </>
              )}
            </AnimatedCircularProgress>
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

import { useState, useEffect } from "react";
import AppleHealthKit from "react-native-health";

function formatBday(dateString) {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

const useHealthData = (date) => {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [biosex, setBiosex] = useState(0);
  const [birthday, setBirthday] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bodyFatPerc, setBodyFatPerc] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [steps, setSteps] = useState(0);
  const [numFlights, setNumFlights] = useState(0);
  const formattedBday = formatBday(birthday);

  const feet = Math.floor(height / 12);
  const inches = height % 12;

  useEffect(() => {
    const permissions = {
      permissions: {
        read: [
          AppleHealthKit.Constants.Permissions.BiologicalSex,
          AppleHealthKit.Constants.Permissions.DateOfBirth,
          AppleHealthKit.Constants.Permissions.Height,
          AppleHealthKit.Constants.Permissions.Weight,
          AppleHealthKit.Constants.Permissions.BodyFatPercentage,
          AppleHealthKit.Constants.Permissions.BodyMassIndex,
          AppleHealthKit.Constants.Permissions.StepCount,
          AppleHealthKit.Constants.Permissions.FlightsClimbed,
        ],
        write: [],
      },
    };

    AppleHealthKit.initHealthKit(permissions, (err) => {
      if (err) {
        console.log("error initializing Healthkit: ", err);
        return;
      }
      setHasPermissions(true);
    });
  }, []);

  useEffect(() => {
    if (!hasPermissions) {
      return;
    }

    let options = {
      date: date.toISOString(),
      includeManuallyAdded: false,
    };

    AppleHealthKit.getBiologicalSex(options, (err, results) => {
      if (err) {
        return;
      }
      // console.log(results)
      setBiosex(results.value);
    });
    AppleHealthKit.getDateOfBirth(options, (err, results) => {
      if (err) {
        return;
      }
      // console.log(results)
      setBirthday(results.value);
    });
    AppleHealthKit.getLatestHeight(options, (err, results) => {
      if (err) {
        return console.error("Error fetching LatestHeight", err);
      }
      // console.log(results);
      setHeight(results.value);
      return height;
    });
    AppleHealthKit.getLatestWeight(options, (err, results) => {
      if (err) {
        return;
      }
      // console.log(results)
      setWeight(results.value);
    });
    AppleHealthKit.getLatestBodyFatPercentage(options, (err, results) => {
      if (err) {
        return;
      }
      // console.log(results)
      setBodyFatPerc(results.value);
    });
    AppleHealthKit.getLatestBmi(options, (err, results) => {
      if (err) {
        return;
      }
      // console.log(results)
      setBmi(results.value);
    });
    AppleHealthKit.getStepCount(options, (err, results) => {
      if (err) {
        return;
      }
      // console.log(results)
      setSteps(results.value);
    });
    AppleHealthKit.getFlightsClimbed(options, (err, results) => {
      if (err) {
        return;
      }
      // console.log(results)
      setNumFlights(results.value);
    });
  }, [hasPermissions]);

  return {
    biosex,
    birthday: formattedBday,
    feet,
    inches, // height
    weight,
    bodyFatPerc,
    bmi,
    steps,
    numFlights,
  };
};

export default useHealthData;

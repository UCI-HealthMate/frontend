import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const RingChart = ({ children, rWidth, rSize, rBGWidth, rTColor, rFill }) => {
  return (
    <AnimatedCircularProgress
      size={rSize}
      width={rWidth}
      backgroundWidth={rBGWidth}
      fill={rFill}
      tintColor={rTColor}
      backgroundColor="gray"
      rotation={360}
      padding={5}
      lineCap="round"
      style={{}}
    >
      {(fill) => <>{children}</>}
    </AnimatedCircularProgress>
  );
};

export default RingChart;

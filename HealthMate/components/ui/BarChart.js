import { BarChart as Barchar } from "react-native-gifted-charts";
import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;

const BarChart = ({ barData, bColor }) => {
  return (
    <Barchar
      width={deviceWidth < 400 ? 260 : 300}
      height={deviceWidth < 400 ? 160 : 200}
      barWidth={deviceWidth < 400 ? 12 : 17}
      noOfSections={3}
      barBorderRadius={4}
      frontColor={bColor}
      data={barData}
      yAxisThickness={2}
      xAxisThickness={2}
      hideRules={true}
      xAxisColor="#F0E0E0"
      yAxisColor="#F0E0E0"
      xAxisLabelTextStyle={{ color: "#F0E0E0" }}
      yAxisTextStyle={{ color: "#F0E0E0" }}
    />
  );
};

export default BarChart;

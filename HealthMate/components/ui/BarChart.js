import { BarChart as Barchar } from "react-native-gifted-charts";
import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;

const BarChart = ({ barData, bColor, period, category }) => {
  let barWidth = deviceWidth < 400 ? 12 : 17;
  if (category === "exercise") {
    if (period === "Day") {
      barWidth = barWidth - (deviceWidth < 400 ? 9 : 14);
    } else if (period === "Week") {
      barWidth = barWidth + (deviceWidth < 400 ? 5 : 7);
    } else if (period === "Month") {
      barWidth = barWidth - (deviceWidth < 400 ? 10 : 15);
    }
  } else if (category === "sleep") {
    if (period === "Day") {
      barWidth = barWidth + (deviceWidth < 400 ? 210 : 250);
    } else if (period === "Week") {
      barWidth = barWidth + (deviceWidth < 400 ? 5 : 7);
    } else if (period === "Month") {
      barWidth = barWidth - (deviceWidth < 400 ? 10 : 15);
    }
  } else if (category === "diet") {
    if (period === "Day") {
      barWidth = barWidth + (deviceWidth < 400 ? 9 : 14);
    } else if (period === "Week") {
      barWidth = barWidth + (deviceWidth < 400 ? 5 : 7);
    } else if (period === "Month") {
      barWidth = barWidth - (deviceWidth < 400 ? 10 : 15);
    }
  }

  return (
    <Barchar
      width={deviceWidth < 400 ? 260 : 300}
      height={deviceWidth < 400 ? 160 : 200}
      barWidth={barWidth}
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
      label="asdfasf"
    />
  );
};

export default BarChart;

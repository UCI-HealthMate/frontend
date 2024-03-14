import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Colors } from "../../constants/styles";

const BubbleWithCharacter = ({ children }) => {
  return (
    <View style={styles.header}>
      <View style={styles.speechBubble}>
        <Text style={styles.welcomeText}>{children}</Text>
      </View>
      <View style={styles.speechBubbleTail} />
      <Image
        source={require("../../assets/logo1.png")}
        style={styles.characterImage}
      />
    </View>
  );
};

export default BubbleWithCharacter;

const deviceWidth = Dimensions.get("window").width;
// console.log(deviceWidth);

const styles = StyleSheet.create({
  welcomeText: {
    color: "black",
    fontSize: 18,
    marginVertical: 1,
    alignSelf: "center",
  },
  speechBubble: {
    width: deviceWidth < 400 ? 245 : 282,
    height: 110,
    backgroundColor: Colors.primary500,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  speechBubbleTail: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 21,
    borderRightWidth: 20,
    borderBottomWidth: 30,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: Colors.primary500,
    transform: [{ rotate: "33deg" }],
    marginLeft: deviceWidth < 400 ? 216 : 253,
    marginTop: -20,
  },
  characterImage: {
    // height: 167, // 캐릭터 이미지 높이 조정
    // width: 154,
    height: 150,
    width: 135,
    alignSelf: "flex-end",
    marginTop: -30,
    marginRight: -15,
  },
});

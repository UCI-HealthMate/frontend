import { StyleSheet, Text, View, Image } from "react-native";
import { Colors } from "../../constants/styles";

const BubbleWithCharacter = ({ children }) => {
  return (
    <View style={styles.header}>
      <View style={styles.speechBubble}>
        <Text style={styles.welcomeText}>{children}</Text>
      </View>
      <View style={styles.speechBubbleTail} />
      <Image
        source={require("../../assets/ae.png")}
        style={styles.characterImage}
      />
    </View>
  );
};

export default BubbleWithCharacter;

const styles = StyleSheet.create({
  welcomeText: {
    color: "black",
    fontSize: 18,
    marginVertical: 1,
    alignSelf: "center",
  },
  speechBubble: {
    width: 282,
    height: 113,
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
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 30,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: Colors.primary500,
    transform: [{ rotate: "33deg" }],
    marginLeft: 253,
    marginTop: -20,
  },
  characterImage: {
    height: 167, // 캐릭터 이미지 높이 조정
    width: 154,
    alignSelf: "flex-end",
    marginTop: -40,
    marginRight: -23,
  },
});

import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";
import Button from "../components/ui/Button";
import { useContext } from "react";

import { AuthContext } from "../store/auth-context";
import BubbleWithCharacter from "../components/ui/BubbleWithCharacter";

const AccountScreen = () => {
  authCtx = useContext(AuthContext);
  return (
    <View style={styles.rootContainer}>
      <BubbleWithCharacter>
        <View>
          <Text style={{ fontSize: 20, margin: 5, alignSelf: "center" }}>
            Peter Anteater
          </Text>
          <Text style={{ fontSize: 20, margin: 0, alignSelf: "center" }}>
            Male | 01/01/2001
          </Text>
        </View>
      </BubbleWithCharacter>
      <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 90 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginBottom: 0,
          }}
        >
          <View style={styles.button}>
            <Button>Sync</Button>
          </View>
          <View style={styles.button}>
            <Button bgColor="white" onPress={authCtx.logout}>
              Logout
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 60, // 상태 바 높이 고려
    padding: 20,
  },

  button: {
    marginHorizontal: 0,
  },
});

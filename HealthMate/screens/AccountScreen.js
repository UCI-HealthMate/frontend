import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";
import Button from "../components/ui/Button";
import { useContext } from "react";

import { AuthContext } from "../store/auth-context";
import BubbleWithCharacter from "../components/ui/BubbleWithCharacter";


const Value = ({ label, value }) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

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
      <View style={styles.infoContainer}>
        <View>
          <Value label="Height" value="7' 0" />
          <Value label="Weight" value="165.2 lbs" />
          <Value label="Body fat %" value="35.3%" />
          <Value label="Body mass index" value="25" />
          <Value label="Active Energy" value="102.5 cal" />
          <Value label="Resting Energy" value="52.6 cal" />
          <Value label="Step count (week avg)" value="2,345 steps" />
          <Value label="Time in bed (week avg)" value="7h 32m" />

        </View>
        
        
      </View>
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
  label: {
    fontSize: 14,
    color: 'white',
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary500,
  },
});

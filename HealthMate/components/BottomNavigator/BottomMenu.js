import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Colors } from "../../constants/styles";
import { useContext } from "react";

import MainScreen from "../../screens/MainScreen";
import LogScreen from "../../screens/LogScreen";
import AccountScreen from "../../screens/AccountScreen";
import IconButton from "../ui/IconButton";
import { AuthContext } from "../../store/auth-context";

const BottomTabs = createBottomTabNavigator();

const BottomMenu = () => {
  authCtx = useContext(AuthContext);
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary800 },
        headerTintColor: Colors.primary500,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "white",
          left: 20,
          right: 20,
          bottom: 30,
          elevation: 0,
          borderRadius: 28,
          height: 60,
          shadowColor: "black",
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        },
      }}
      sceneContainerStyle={{ backgroundColor: Colors.primary800 }}
    >
      <BottomTabs.Screen
        name="Main"
        component={MainScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 15,
              }}
            >
              <AntDesign
                name="heart"
                size={24}
                color={focused ? Colors.primary500 : "#748c94"}
                style={{ width: 25, height: 25 }}
              />
              <Text
                style={{
                  color: focused ? Colors.primary500 : "#748c94",
                  fontWeight: 600,
                  fontSize: 12,
                }}
              >
                Main
              </Text>
            </View>
          ),
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Log"
        component={LogScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 15,
              }}
            >
              <AntDesign
                name="plus"
                size={24}
                color={focused ? Colors.primary500 : "#748c94"}
                style={{ width: 25, height: 25 }}
              />
              <Text
                style={{
                  color: focused ? Colors.primary500 : "#748c94",
                  fontWeight: 600,
                  fontSize: 12,
                }}
              >
                Log
              </Text>
            </View>
          ),
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 15,
              }}
            >
              <AntDesign
                name="user"
                size={24}
                color={focused ? Colors.primary500 : "#748c94"}
                style={{ width: 25, height: 25 }}
              />
              <Text
                style={{
                  color: focused ? Colors.primary500 : "#748c94",
                  fontWeight: 600,
                  fontSize: 12,
                }}
              >
                Account
              </Text>
            </View>
          ),
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default BottomMenu;

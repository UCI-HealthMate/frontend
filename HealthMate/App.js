import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

import BottomMenu from "./components/BottomNavigator/BottomMenu";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import DietScreen from "./screens/DietScreen";
import ExerciseScreen from "./screens/ExerciseScreen";
import SleepScreen from "./screens/SleepScreen";
import { Colors } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./store/auth-context";

const Stack = createNativeStackNavigator();

// render this without token
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary800 },
        headerTintColor: Colors.primary500,
        contentStyle: { backgroundColor: Colors.primary800 },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// render this with token
const AuthenticatedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary800 },
        headerTintColor: Colors.primary500,
        contentStyle: { backgroundColor: Colors.primary800 },
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="BottomMenu"
        component={BottomMenu}
      />
      <Stack.Screen
        name="Diet"
        component={DietScreen}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="Exercise"
        component={ExerciseScreen}
        options={{ headerBackTitleVisible: false, headerTintColor: "#B2FAB1" }}
      />
      <Stack.Screen
        name="Sleep"
        component={SleepScreen}
        options={{ headerBackTitleVisible: false, headerTintColor: "#B1DBFA" }}
      />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
};

const Root = () => {
  const authCtx = useContext(AuthContext);
  SplashScreen.preventAutoHideAsync();
  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      const storedId = await AsyncStorage.getItem("id");
      if (storedId) {
        authCtx.setUserId(storedId);
      }
      await SplashScreen.hideAsync();
    };
    fetchToken();
  }, []);
  return <Navigation />;
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

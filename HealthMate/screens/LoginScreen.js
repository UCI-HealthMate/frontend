import AuthContent from "../components/Auth/AuthContent";
import Title from "../components/ui/Title";
import { Text, View, StyleSheet } from "react-native";

const LoginScreen = () => {
  return (
    <View>
      <Title />
      <AuthContent isLogin />
    </View>
  );
};

export default LoginScreen;

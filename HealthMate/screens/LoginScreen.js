import AuthContent from "../components/Auth/AuthContent";
import Logo from "../components/ui/Logo";
import { Alert, View } from "react-native";
import { useContext, useState } from "react";

import { login } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

const LoginScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  const loginHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (err) {
      Alert.alert(
        "Authentication Failed!!",
        "Could not log you in. Please check your credentials or try again later!!"
      );
      setIsAuthenticating(false);
    }
  };
  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <View>
      <Logo />
      <AuthContent isLogin onAuthenticate={loginHandler} />
    </View>
  );
};

export default LoginScreen;

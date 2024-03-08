import AuthContent from "../components/Auth/AuthContent";
import Logo from "../components/ui/Logo";
import { Alert, View, Image } from "react-native";
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
      const id = email.split("@")[0];
      authCtx.authenticate(token);
      authCtx.setUserId(id);
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
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <View>
        <View
          style={{
            alignSelf: "flex-end",
          }}
        >
          <Image
            source={require("../assets/squiggly-top.png")}
            style={{
              marginTop: 0,
              width: 180,
              height: 220,
            }}
          />
        </View>
        <Logo />
        <AuthContent isLogin onAuthenticate={loginHandler} />
      </View>
      <View style={{ alignSelf: "stretch" }}>
        <Image
          source={require("../assets/squiggly-bottom.png")}
          style={{
            width: 360,
            height: 300,
            alignSelf: "center",
            marginLeft: -100,
          }}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

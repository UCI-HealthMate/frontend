import AuthContent from "../components/Auth/AuthContent";
import Logo from "../components/ui/Logo";
import { Alert, View } from "react-native";
import { useContext, useState } from "react";

import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

const SignupScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  const signUpHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (err) {
      Alert.alert(
        "Authentication Failed!!",
        "Could not create user, please check your input and try again later!!"
      );
      setIsAuthenticating(false);
    }
  };
  if (isAuthenticating) {
    return <LoadingOverlay message="Creating User..." />;
  }

  return (
    <View>
      <Logo />
      <AuthContent onAuthenticate={signUpHandler} />
    </View>
  );
};

export default SignupScreen;

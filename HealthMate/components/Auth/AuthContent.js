import { useState } from "react";
import { Alert, StyleSheet, View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AuthForm from "./AuthForm";
import { Colors } from "../../constants/styles";

const AuthContent = ({ isLogin, onAuthenticate }) => {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  const switchToSignup = () => {
    navigation.replace("Signup");
  };

  const switchToLogin = () => {
    navigation.replace("Login");
  };

  const submitHandler = (credentials) => {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  };
  return (
    <View style={styles.authContent}>
      <View style={styles.buttons}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={switchToLogin}
        >
          <View style={isLogin ? styles.underLine : null}>
            <Text
              style={isLogin ? styles.buttonText : styles.disableButtonText}
            >
              LOGIN
            </Text>
          </View>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={switchToSignup}
        >
          <View style={!isLogin ? styles.underLine : null}>
            <Text
              style={!isLogin ? styles.buttonText : styles.disableButtonText}
            >
              SIGNUP
            </Text>
          </View>
        </Pressable>
      </View>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      {/* <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? "Sign up here to create an account" : "Log in instead"}
        </FlatButton>
      </View> */}
    </View>
  );
};

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: -20,
    marginHorizontal: 32,
    paddingHorizontal: 30,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    // borderWidth: 2,
    elevation: 2,
    // borderColor: Colors.primary500,
    // shadowColor: "black",
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 0.35,
    // shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  pressed: {
    opacity: 0.25,
  },
  buttonText: {
    textAlign: "center",
    color: "#C6B2FA",
    fontWeight: "500",
    fontSize: 18,
    marginBottom: 5,
  },
  disableButtonText: {
    textAlign: "center",
    color: "gray",
    fontWeight: "500",
    fontSize: 18,
  },
  underLine: {
    borderBottomWidth: 2,
    borderColor: "white",
  },
});

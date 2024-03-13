import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginOut } from "../util/auth";

export const AuthContext = createContext({
  token: "",
  uid: "",
  isAuthenticated: false,
  authenticate: (token, token2) => {},
  setUserId: (id) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();
  const [userName, setUserName] = useState();

  const authenticate = (token, token2) => {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("token2", token2);
  };

  const setUserId = (id) => {
    setUserName(id);
    AsyncStorage.setItem("id", id);
  };

  const logout = () => {
    setAuthToken(null);
    setUserName(null);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("token2");
    AsyncStorage.removeItem("id");
    loginOut();
  };

  const value = {
    token: authToken,
    uid: userName,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    setUserId: setUserId,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

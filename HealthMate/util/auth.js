import axios from "axios";
import CookieManager from "@react-native-cookies/cookies";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getRecommendedMenu = async () => {
  const url = "http://34.125.134.116:8000/menu/items/";
  const cookieData = await CookieManager.get("http://34.125.134.116:8000");
  // console.log("cookieData", cookieData);
  const accessToken = await AsyncStorage.getItem("token");
  const refreshToken = await AsyncStorage.getItem("token2");
  // const accessToken = cookieData.access_token.value;
  // const refreshToken = cookieData.refresh_token.value;

  // console.log("Menu Testing (accessToken): ", accessToken);
  // console.log("Menu Testing (refreshToken): ", refreshToken);

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken":
        "OICT4xVbQee5JXLL0juLBuV9eIBgebt3XFsHExy2yTUxEvPw6Jtryx5HcCdPAA3o",
      Cookie: `access_token=${accessToken}; Path=/; HttpOnly;`,
    },
    withCredentials: true,
  };
  try {
    const response = await axios.get(url, config);
    console.log("Get Menu/items success:", response.data);
  } catch (error) {
    console.log("Get Menu/items Error: ", error);
  }
};

export const createUser = async (email, password) => {
  const url = "http://34.125.134.116:8000/user/signup/";
  const data = {
    email: email,
    password: password,
  };
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken":
        "OICT4xVbQee5JXLL0juLBuV9eIBgebt3XFsHExy2yTUxEvPw6Jtryx5HcCdPAA3o",
    },
    withCredentials: true,
  };

  try {
    const response = await axios.post(url, data, config);
    console.log("Signup success:", response.data);

    if (response.headers["set-cookie"]) {
      const cookieData = await CookieManager.get("http://34.125.134.116:8000");
      // console.log("Cookies after login:", cookieData);
      const token = cookieData.access_token.value;
      const token2 = cookieData.refresh_token.value;
      // console.log(token);
      return { token: token, token2: token2 };
    } else {
      console.log("No Set-Cookie header in response");
    }
    return token;
  } catch (error) {
    // if (error.response) {
    //   console.error("Login error - Server Response:", error.response.data);
    // } else if (error.request) {
    //   console.error("Login error - No response:", error.request);
    // } else {
    //   console.error("Login error - Error message:", error.message);
    // }
    throw new Exception();
  }
};

export const login = async (email, password) => {
  const url = "http://34.125.134.116:8000/user/login/";
  const data = {
    email: email,
    password: password,
  };
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken":
        "OICT4xVbQee5JXLL0juLBuV9eIBgebt3XFsHExy2yTUxEvPw6Jtryx5HcCdPAA3o",
    },
    withCredentials: true,
  };

  try {
    const response = await axios.post(url, data, config);
    console.log("Login success:", response.data);

    if (response.headers["set-cookie"]) {
      const cookieData = await CookieManager.get("http://34.125.134.116:8000");
      // console.log("Cookies after login:", cookieData);
      const token = cookieData.access_token.value;
      const token2 = cookieData.refresh_token.value;
      // console.log(token);
      return { token: token, token2: token2 };
    } else {
      console.log("No Set-Cookie header in response");
    }

    return token;
  } catch (error) {
    // if (error.response) {
    //   console.error("Login error - Server Response:", error.response.data);
    // } else if (error.request) {
    //   console.error("Login error - No response:", error.request);
    // } else {
    //   console.error("Login error - Error message:", error.message);
    // }
    throw new Exception();
  }
};

export const loginOut = async () => {
  const url = "http://34.125.134.116:8000/user/logout/";

  const data = {};
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken":
        "OICT4xVbQee5JXLL0juLBuV9eIBgebt3XFsHExy2yTUxEvPw6Jtryx5HcCdPAA3o",
    },
    withCredentials: true,
  };

  try {
    const response = await axios.post(url, data, config);
    console.log("Logout success:", response.data);
    await CookieManager.clearAll();
    console.log("Cookies cleared successfully");
  } catch (error) {
    console.error("Error clearing cookies:", error);
    // if (error.response) {
    //   console.error("Login error - Server Response:", error.response.data);
    // } else if (error.request) {
    //   console.error("Login error - No response:", error.request);
    // } else {
    //   console.error("Login error - Error message:", error.message);
    // }
  }
};

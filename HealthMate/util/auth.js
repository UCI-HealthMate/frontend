import axios from "axios";
import CookieManager from "@react-native-cookies/cookies";

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
    console.log("Login success:", response.data);

    if (response.headers["set-cookie"]) {
      const cookieData = await CookieManager.get("http://34.125.134.116:8000");
      console.log("Cookies after login:", cookieData);
      const token = cookieData.access_token.value;
      console.log(token);
      return token;
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
    return err;
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
      console.log("Cookies after login:", cookieData);
      const token = cookieData.access_token.value;
      console.log(token);
      return token;
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
    return err;
  }
};

export const loginOut = async () => {
  try {
    await CookieManager.clearAll();
    console.log("Cookies cleared successfully");
  } catch (error) {
    console.error("Error clearing cookies:", error);
  }
};

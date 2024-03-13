import axios from "axios";

const delay = (ms) => new Promise((res) => setTimeout(res, ms)); // for testing

export const createUser = async (email, password) => {
  //   const response = await axios.post();
  //   const token = response.data.token?

  // ********** for testing ************
  await delay(2000);
  //   throw new Error("Exception message");
  const token = `ThisIsFakeToken{${email}}and{${password}}`;
  console.log(token);
  return token;
};

// export const login = async (email, password) => {
//   //   const response = await axios.post();
//   //   const token = response.data.token?

//   // ********** for testing ************
//   await delay(2000);
//   //   throw new Error("Exception message");
//   const token = `ThisIsFakeToken{${email}}and{${password}}`;
//   console.log(token);
//   return token;
// };

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
    // 쿠키를 수신하기 위해 withCredentials를 true로 설정
    withCredentials: true,
  };

  try {
    const response = await axios.post(url, data, config);
    console.log("Login success:", response.data);
    // 응답 헤더에서 'set-cookie'를 확인
    if (response.headers["set-cookie"]) {
      console.log("Set-Cookie:", response.headers["set-cookie"]);
      const token = response.headers["set-cookie"][0]
        .split("; ")
        .find((cookie) => cookie.startsWith("access_token="))
        .split("=")[1];

      console.log(token);
      return token;
    } else {
      console.log("No Set-Cookie header in response");
    }
    const token = `ThisIsFakeToken{${email}}and{${password}}`;
    console.log(token);
    return token;
  } catch (error) {
    if (error.response) {
      // 서버가 2xx 범위 외의 상태 코드로 응답한 경우
      console.error("Login error - Server Response:", error.response.data);
    } else if (error.request) {
      // 요청이 이루어졌으나 응답을 받지 못한 경우
      console.error("Login error - No response:", error.request);
    } else {
      // 요청 설정 시 발생한 오류
      console.error("Login error - Error message:", error.message);
    }
  }
  const token = `ThisIsFakeToken{${email}}and{${password}}`;
  console.log(token);
  return token;
};

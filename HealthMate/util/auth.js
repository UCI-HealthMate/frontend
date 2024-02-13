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

export const login = async (email, password) => {
  //   const response = await axios.post();
  //   const token = response.data.token?

  // ********** for testing ************
  await delay(2000);
  //   throw new Error("Exception message");
  const token = `ThisIsFakeToken{${email}}and{${password}}`;
  console.log(token);
  return token;
};

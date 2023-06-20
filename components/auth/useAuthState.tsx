import { useState, useEffect } from "react";

export default function useAuthState() {
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    console.log(signupData);
  }, [signupData]);

  return { signupData, setSignupData, loginData, setLoginData };
}

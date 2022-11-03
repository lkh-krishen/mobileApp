import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, ToastAndroid } from "react-native";
import { BASE_URL } from "../api/client";
import { useLogin } from "../context/LoginProvider";
import { isValidEmail, isValidObjField, updateError } from "../utils/methods";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";
import { AsyncStorage } from "react-native";
import axios from "axios";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["AsyncStorage"]);

const LoginForm = () => {
  const { setIsLoggedIn, setProfile } = useLogin();
  const [userInfo, setUserInfo] = useState({
    email: "buddi@gmail.com",
    password: "123456789",
  });

  const [error, setError] = useState("");
  const { email, password } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError("Required all fields!", setError);

    if (!isValidEmail(email)) return updateError("Invalid email!", setError);

    if (!password.trim() || password.length < 8)
      return updateError("Password is too short!", setError);

    return true;
  };

  const submitForm = async () => {
    if (isValidForm()) {
      try {
        const postRequest = () => {};
        await axios
          .post(`${BASE_URL}users/auth`, userInfo)
          .then((res) => {
            if (res.data.success) {
              setUserInfo({ email: "", password: "" });
              setProfile(res.data.user);
              setIsLoggedIn(true);
              storeData(res.data.userAccount);
            } else {
              showToast(res.data.message);
            }
          })
          .catch((error) => console.log("log err:", error));
      } catch (error) {
        console.error("login error at last-", error);
      }
    }
  };

  const storeData = async (data) => {
    // sets data to async storage
    try {
      await AsyncStorage.setItem("data", JSON.stringify(data));
    } catch (e) {
      console.DIR("SET error-", e);
    }
  };

  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  return (
    <FormContainer>
      {error ? (
        <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
          {error}
        </Text>
      ) : null}
      <FormInput
        value={email}
        // value={"buddi@gmail.com"}
        onChangeText={(value) => handleOnChangeText(value, "email")}
        label="Email"
        placeholder="example@email.com"
        autoCapitalize="none"
      />
      <FormInput
        value={password}
        // value={"123456789"}
        onChangeText={(value) => handleOnChangeText(value, "password")}
        label="Password"
        placeholder="********"
        autoCapitalize="none"
        secureTextEntry
      />
      <FormSubmitButton onPress={submitForm} title="Login" />
    </FormContainer>
  );
};

const styles = StyleSheet.create({});

export default LoginForm;

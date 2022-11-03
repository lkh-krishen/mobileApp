import React, { useState } from "react";
import { View, StyleSheet, Text, ToastAndroid } from "react-native";
import { isValidEmail, isValidObjField, updateError } from "../utils/methods";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";
import { StackActions } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import client from "../api/client";
import axios from "axios";

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Invalid name!")
    .required("Name is required!"),
  contact: Yup.string()
    .trim()
    .min(3, "Invalid contact number!")
    .required("Contact number required!"),
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  address: Yup.string()
    .min(5, "Invalid address!")
    .required("Address is required!"),
  password: Yup.string()
    .trim()
    .min(8, "Password is too short!")
    .required("Password is required!"),
  confirmPassword: Yup.string().equals(
    [Yup.ref("password"), null],
    "Password does not match!"
  ),
});

const SignupForm = ({ navigation }) => {
  const userInfo = {
    name: "",
    contact: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  };

  const [error, setError] = useState("");
  const { name, contact, email, password, confirmPassword } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    // we will accept only if all of the fields have value
    if (!isValidObjField(userInfo))
      return updateError("Required all fields!", setError);
    // if valid name with 3 or more characters
    if (!name.trim() || name.length < 3)
      return updateError("Invalid name!", setError);
    if (!contact.trim() || contact.length < 3)
      return updateError("Invalid contact number!", setError);
    // only valid email id is allowed
    if (!isValidEmail(email)) return updateError("Invalid email!", setError);
    // password must have 8 or more characters
    if (!isValidEmail(address))
      return updateError("Invalid address!", setError);
    // address must have 8 or more characters
    if (!password.trim() || password.length < 8)
      return updateError("Password is less then 8 characters!", setError);
    // password and confirm password must be the same
    if (password !== confirmPassword)
      return updateError("Password does not match!", setError);

    return true;
  };

  const sumbitForm = () => {
    if (isValidForm()) {
      // submit form
      console.log(userInfo);
    }
  };

  const signUp = async (values, formikActions) => {
    try {
      await axios
        .post(`http://192.168.8.149:3000/users/adduser`, values)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.user);
            formikActions.resetForm();
            showToast("Account created");
          } else {
            console.log("Failed. " + res.data.message);
            showToast(res.data.message);
          }
        })
        .catch((error) => console.log("log err:", error));
    } catch (error) {
      console.log("login error at last-", error);
    }

    formikActions.setSubmitting(false);
  };

  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  return (
    <FormContainer>
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={signUp}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const { name, contact, email, address, password, confirmPassword } =
            values;
          return (
            <>
              <FormInput
                value={name}
                error={touched.name && errors.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                label="Full Name"
                placeholder="John Smith"
              />
              <FormInput
                value={contact}
                error={touched.contact && errors.contact}
                onChangeText={handleChange("contact")}
                onBlur={handleBlur("contact")}
                label="Contact No"
                placeholder="(980) 516-3595"
              />
              <FormInput
                value={email}
                error={touched.email && errors.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                autoCapitalize="none"
                label="Email"
                placeholder="example@email.com"
              />
              <FormInput
                value={address}
                error={touched.address && errors.address}
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                autoCapitalize="none"
                label="Address"
                placeholder="No 20 , pannipitiya , colombo"
              />
              <FormInput
                value={password}
                error={touched.password && errors.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                autoCapitalize="none"
                secureTextEntry
                label="Password"
                placeholder="********"
              />
              <FormInput
                value={confirmPassword}
                error={touched.confirmPassword && errors.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                autoCapitalize="none"
                secureTextEntry
                label="Confirm Password"
                placeholder="********"
              />
              <FormSubmitButton
                submitting={isSubmitting}
                onPress={handleSubmit}
                title="Sign up"
              />
            </>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

const styles = StyleSheet.create({});

export default SignupForm;

import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = () => {
    setErrors({ name: "", email: "", password: "", confirmPassword: "" });

    let isValid = true;

    if (!name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name is required",
      }));
      isValid = false;
    }

    if (!email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email",
      }));
      isValid = false;
    }

    if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      isValid = false;
    } else if (password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters",
      }));
      isValid = false;
    }

    if (!confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Please confirm your password",
      }));
      isValid = false;
    } else if (confirmPassword !== password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      isValid = false;
    }

    if (isValid) {
      console.log("SignUp Successful");
      router.push(`/home?username=${name}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.innerContainer}>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Text style={styles.heading}>EduLearn</Text>

            <Text
              style={{
                color: "#808080",
                fontFamily: "SpaceMono",
                fontSize: 17,
                margin: 20,
              }}
            >
              Join Us and Explore Stunning Views!
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Name"
              style={styles.input}
              value={name}
              onChangeText={(text) => setName(text)}
            />
            {errors.name ? (
              <Text style={styles.errorText}>{errors.name}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Password"
              style={styles.input}
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Confirm Password"
              style={styles.input}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry
            />
            {errors.confirmPassword ? (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            ) : null}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.inputButtonText}>Register</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={{  paddingTop: 10 }}>
              Already Have an Account? {" "}
              <Link href={"/signin"}>
                <Text style={styles.signupLink}>Login</Text>
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    fontFamily: "SpaceMono",
    marginTop: 10,
  },
  scrollContent: {
    padding: 16,
    fontFamily: "SpaceMono",
  },
  innerContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
    fontFamily: "SpaceMono",
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#4A90E2",
    paddingHorizontal: 10,
    width: "90%",
    marginTop: 20,
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 20,
    width: "90%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 10,
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  inputButtonText: {
    fontWeight: "500",
    color: "white",
    fontSize: 18,
  },
  heading: {
    marginTop: 50,
    fontFamily: "SpaceMono",
    fontSize: 40,
    color: "#4A90E2",
    fontWeight: "400",
  },
  signupLink: {
    color: "#4A90E2",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 1,
  },
});

export default Signup;

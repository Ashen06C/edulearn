import { Link, router } from "expo-router";
import React, { useState, useEffect } from "react";
import LottieView from "lottie-react-native";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";

export default function HomeScreen() {
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setIsAnimationFinished(true);
    }, 6500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {!isAnimationFinished ? (
        <View style={styles.animationContainer}>
          <LottieView
            source={require("../assets/animation/lottie anmation.json")}
            autoPlay
            loop={false}
            style={styles.lottieAnimation}
          />
          <ActivityIndicator size="large" color="#4A90E2" style={styles.loader} />
          <Text style={styles.loadingText}>Loading your experience...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.innerContainer}>
            <Text style={styles.heading}>EduLearn</Text>
            <Image
              style={styles.logo}
              source={require("../assets/images/logo.png")}
            />
            <Text style={styles.subText}>
              Empower your knowledge, one book at a time.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/signup")}
            >
              <Text style={styles.inputbuttontext}>Start Learning !</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4ff",
    fontFamily: "SpaceMono",
  },
  animationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottieAnimation: {
    height: 400,
    width: 400,
  },
  loader: {
    marginTop: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#4A90E2",
    fontFamily: "SpaceMono",
  },
  scrollContent: {
    marginTop: 50,
    padding: 16,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  heading: {
    fontFamily: "SpaceMono",
    fontSize: 40,
    color: "#4A90E2",
    fontWeight: "400",
  },
  subText: {
    fontFamily: "SpaceMono",
    fontSize: 25,
    margin: 5,
    color: "#4A90E2",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 10,
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    marginTop: 70,
  },
  inputbuttontext: {
    fontWeight: "300",
    color: "white",
    fontSize: 24,
    fontFamily: "SpaceMono",
  },
  logo: {
    marginTop: 60,
    height: 300,
    width: 300,
    margin: 20,
  },
});

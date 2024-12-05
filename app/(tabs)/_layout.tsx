import React from "react";
import { Tabs } from "expo-router";
import { Image, View, StyleSheet } from "react-native";
import {LikeProvider} from "../../contexts/LikeContext"; // replace with the actual path to LikeProvider

const PlaceholderIcon = ({ source, color }: { source: any; color: string }) => {
  return (
    
     
    
    <View style={styles.iconContainer}>
      <Image
        source={source}
        style={[styles.iconImage, { tintColor: color }]}
        resizeMode="contain"
      />
    </View>
  );
};

const TabLayout = () => {
  return (
    <LikeProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#4A90E2",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopWidth: 0,
            borderRadius: 24,
            height: 40,
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            position: "absolute",
            width: "80%",
            alignSelf: "center",
            marginBottom: 20,
            marginLeft: 40,
          },
        }}
      >
        {/* Home Tab */}
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,

            tabBarIcon: ({ color }) => (
              <PlaceholderIcon
                source={require("../../assets/icons/home.png")}
                color={color}
              />
            ),
          }}
        />

        {/* Favorite Tab */}
        <Tabs.Screen
          name="favorite"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <PlaceholderIcon
                source={require("../../assets/icons/heartwhite.png")}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </LikeProvider>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  iconImage: {
    width: 25,
    height: 25,
  },
});

export default TabLayout;

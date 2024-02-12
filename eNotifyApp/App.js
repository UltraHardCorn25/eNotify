import "react-native-url-polyfill/auto";
import { supabase } from "./lib/SupaBase";
import { View, TouchableOpacity, Image, AppState } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import Settings from "./screens/Settings";
import Obavestenje from "./screens/Obavestenje";
import About from "./screens/About";
import Colors from "./components/Color";
import QrScanner from "./screens/QrScaner";
import Raspored from "./screens/Raspored";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
        headerMode="float"
        animation="fade"
      >
        <Stack.Screen
          name="Login"
          component={QrScanner}
          options={{
            title: "Odaberi razred",
            headerStyle: {
              backgroundColor: Colors.accent,
              height: 100,
            },
            headerTintColor: Colors.headerText,
            headerTitleStyle: {
              fontSize: 22,
              textTransform: "uppercase",
            },
          }}
        />
        <Stack.Screen
          name="Login2"
          component={LoginScreen}
          options={{
            title: "Odaberi razred",
            headerStyle: {
              backgroundColor: Colors.accent,
              height: 100,
            },
            headerTintColor: Colors.headerText,
            headerTitleStyle: {
              fontSize: 22,
              textTransform: "uppercase",
            },
          }}
        />
        <Stack.Screen
          name="Main"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerBackVisible: false,
            title: "Obavestenja",
            headerLeft: () => null,
            headerStyle: {
              backgroundColor: Colors.accent,
              height: 100,
            },
            headerTintColor: Colors.headerText,
            headerTitleStyle: {
              marginLeft: 10,
              fontSize: 22,
              textTransform: "uppercase",
            },
            headerRight: () => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Settings")}
              >
                <Image
                  style={{ width: 25, height: 25, marginRight: 15 }}
                  source={require("./images/cog-wheel.png")}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            title: "Opcije",
            headerStyle: {
              backgroundColor: Colors.accent,
              height: 100,
            },
            headerTintColor: Colors.headerText,
            headerTitleStyle: {
              fontSize: 22,
              textTransform: "uppercase",
            },
          }}
        />
        <Stack.Screen
          name="Raspored"
          component={Raspored}
          options={{
            title: "Raspored časova",
            headerStyle: {
              backgroundColor: Colors.accent,
              height: 100,
            },
            headerTintColor: Colors.headerText,
            headerTitleStyle: {
              fontSize: 22,
              textTransform: "uppercase",
            },
          }}
        />
        <Stack.Screen
          name="Obavestenje"
          component={Obavestenje}
          options={{
            title: "Obavestenje",
            headerStyle: {
              backgroundColor: Colors.accent,
              height: 100,
            },
            headerTintColor: Colors.headerText,
            headerTitleStyle: {
              fontSize: 22,
              textTransform: "uppercase",
            },
          }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{
            title: "O aplikaciji",
            headerStyle: {
              backgroundColor: Colors.accent,
              height: 100,
            },
            headerTintColor: Colors.headerText,
            headerTitleStyle: {
              fontSize: 22,
              textTransform: "uppercase",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import "react-native-url-polyfill/auto";
import { supabase } from "./lib/SupaBase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity, Image, AppState } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/UcenikStranice/LoginScreen";
import HomeScreen from "./screens/UcenikStranice/Ucenik";
import Settings from "./screens/All/Settings";
import Obavestenje from "./screens/All/Obavestenje";
import About from "./screens/All/About";
import Colors from "./components/Color";
import QrScanner from "./screens/All/QrScaner";
import Raspored from "./screens/UcenikStranice/Raspored";
import Profesor from "./screens/ProfesorskeStranice/Profesor";
import NotifyCreate from "./screens/ProfesorskeStranice/NotifyCreate";
import Registracija from "./screens/All/Registracija";
import Loading from "./screens/All/Loading";
import RazrediList from "./screens/ProfesorskeStranice/RazrediList";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
        animation="fade"
      >
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={({ navigation }) => {}}
        />
        <Stack.Screen
          name="Registracija"
          component={Registracija}
          options={({ navigation }) => ({
            headerBackVisible: false,
            title: "Registracija",
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
          initialParams={{ supabase: supabase }}
        />

        <Stack.Screen
          name="Profesor"
          component={Profesor}
          options={({ navigation }) => ({
            headerBackVisible: false,
            title: "Glavni Meni",
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
          name="NotifyCreate"
          component={NotifyCreate}
          options={({ navigation }) => ({
            headerBackVisible: false,
            title: "Kreiranje Notifikacije",
            headerStyle: {
              backgroundColor: Colors.accent,
              height: 100,
            },
            headerTintColor: Colors.headerText,
            headerTitleStyle: {
              marginLeft: 10,
              fontSize: 19,
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
          initialParams={{ supabase: supabase }}
        />
        <Stack.Screen
          name="Ucenik"
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
          initialParams={{ AsyncStorage: AsyncStorage, supabase: supabase }}
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
          initialParams={{ AsyncStorage: AsyncStorage }}
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
          initialParams={{ AsyncStorage: AsyncStorage, supabase: supabase }}
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

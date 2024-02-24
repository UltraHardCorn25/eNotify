import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Loading({ navigation }) {
  const doIt = async () => {
    await AsyncStorage.setItem("role", "Profesor");
    await AsyncStorage.setItem("razred", "1ITS - Admin");
  };
  doIt();

  useEffect(() => {
    const uzmiNaziv = async () => {
      const naziv = await AsyncStorage.getItem("naziv");

      if (naziv !== null) return true;
    };
    const getRazred = async () => {
      const razred = await AsyncStorage.getItem("razred");
      if (razred !== null) {
        navigation.navigate(razred.includes("Admin") ? "Profesor" : "Ucenik");
      } else {
        navigation.navigate("Login");
      }
    };
    uzmiNaziv() ? getRazred() : navigation.navigate("Registracija");
  });
  return;
}

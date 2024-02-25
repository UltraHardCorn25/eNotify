import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Loading({ navigation }) {
  const [naziv, setNaziv] = useState(false);
  const doIt = async () => {
    await AsyncStorage.setItem("role", "Profesor");
    await AsyncStorage.setItem("razred", "4ITS - Profesor");
    await AsyncStorage.setItem("naziv", "Dario Buljovčić");
    // await AsyncStorage.removeItem("naziv");
    // await AsyncStorage.removeItem("razred");
    // await AsyncStorage.removeItem("role");
  };

  useEffect(() => {
    doIt();
    const uzmiNaziv = async () => {
      const naziv = await AsyncStorage.getItem("naziv");

      if (naziv !== null) setNaziv(true);
    };
    const getRazred = async () => {
      const razred = await AsyncStorage.getItem("razred");

      if (razred !== null) {
        navigation.navigate(
          razred.includes("Profesor") ? "Profesor" : "Ucenik"
        );
      } else {
        navigation.navigate("Login");
      }
    };
    uzmiNaziv();
    console.log(naziv === true);
    naziv === true ? getRazred() : console.log("aloo");
  }, [naziv]);
  return;
}

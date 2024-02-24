import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraView, Camera } from "expo-camera/next";
import { useNavigation } from "@react-navigation/native";

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const [role, setRole] = useState("");
  const navigation = useNavigation();

  //proveri da li je korisnik  ulogovan

  const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };
  const getRole = async () => setRole(await AsyncStorage.getItem("role"));

  //pitaj da li aplikacija moze da koristi kameru i otvori za slikanje qr koda
  useEffect(() => {
    getRole();
    const unsubscribeFocus = navigation.addListener("focus", () => {
      getCameraPermissions();
      getRole();
      if (hasPermission === false) {
        navigation.navigate("Login2");
      }
    });
    if (hasPermission === false) {
      navigation.navigate("Login2");
    }
    // Return cleanup functions
    return () => {
      unsubscribeFocus();
    };
  }, [navigation, hasPermission]);

  // citanje qr koda i logovanje korisnika
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    const storeData = async () => {
      const admin = data.includes("Admin") ? true : false;
      const dataRazred = data.split("value=")[1];
      if (role === "Ucenik") {
        if (admin) {
          console.log("Ne moze");
          alert(
            "Ti si učenik i ne možeš da skeniraš kod profesora, skeniraj kod za učenike"
          );
        } else {
          await AsyncStorage.setItem("razred", dataRazred);
          navigation.navigate("Ucenik");
        }
      } else if (role === "Profesor") {
        await AsyncStorage.setItem("razred", dataRazred);
        admin ? navigation.navigate("Profesor") : navigation.navigate("Ucenik");
      }
    };
    storeData();
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barCodeTypes: ["qr", "pdf417"],
          }}
          style={{ height: 300, width: 300 }}
          zoom={0.6}
        ></CameraView>
      </View>
      <View style={styles.again}>
        {scanned && (
          <Button
            title={"Tap to Scan"}
            onPress={() => {
              setScanned(false);
            }}
          />
        )}
      </View>
    </View>
  );
};

export default App;
const overlaySize = 200;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
  },
  again: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "20%",
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
    position: "relative",
    top: "20%",
  },
});

import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraView, Camera } from "expo-camera/next";
import { useNavigation } from "@react-navigation/native";

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const navigation = useNavigation();

  //proveri da li je korisnik  ulogovan
  const getRazred = async () => {
    try {
      const value = await AsyncStorage.getItem("razred");

      if (value !== null) {
        navigation.navigate("Main");
        return value;
      }
    } catch (e) {}
  };
  const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  //pozivanje provere logovanja
  useEffect(() => {
    getRazred();
  }, []);

  //pitaj da li aplikacija moze da koristi kameru i otvori za slikanje qr koda
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      getCameraPermissions();
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
      try {
        await AsyncStorage.setItem("razred", data.split("value=")[1]);
      } catch (e) {
        // saving error
      }
    };
    storeData();
    navigation.navigate("Main");
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

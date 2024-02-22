import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import Colors from "../../components/Color";

function DodeliNaziv({ navigation, route }) {
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const AsyncStorage = route.params.AsyncStorage;

  const dodeliNaziv = async () => {
    try {
      await AsyncStorage.setItem("naziv", ime + " " + prezime);
      navigation.navigate("Main");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Upišite Ime:</Text>
        <TextInput
          placeholder="Ime"
          onChangeText={(val) => setIme(val)}
          value={ime}
          style={styles.headerInput}
        ></TextInput>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Upišite Prezime:</Text>
        <TextInput
          placeholder="Prezime"
          onChangeText={(val) => setPrezime(val)}
          value={prezime}
          style={styles.headerInput}
        ></TextInput>
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={dodeliNaziv}>
        <Text style={styles.addNotificationText}>Registruj se</Text>
      </TouchableOpacity>
    </View>
  );
}

export default DodeliNaziv;

const styles = StyleSheet.create({
  headerContainer: {
    width: "80%",
    alignSelf: "center",
    display: "flex",
    gap: 10,
    marginTop: 20,
  },
  headerInput: {
    borderWidth: 1,
    borderColor: "blue",
    fontSize: 18,
    padding: 5,
    borderRadius: 5,
  },
  headerInputMulti: {
    height: 200,
  },
  headerText: {
    fontSize: 16,
  },
  confirmButton: {
    height: 70,
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,

    backgroundColor: Colors.accent,
    marginVertical: 10,
    borderRadius: 10,
    //borderColor: 'gray',
    //borderWidth: 1,

    elevation: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 2, height: 5 },
    shadowRadius: 1,
  },
  addNotificationText: {
    color: Colors.headerText,
    fontSize: 18,
  },
});

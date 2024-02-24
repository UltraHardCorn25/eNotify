import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import Colors from "../../components/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";

function DodeliNaziv({ navigation }) {
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [role, setRole] = useState("");

  const registracija = async () => {
    try {
      await AsyncStorage.setItem("naziv", ime + " " + prezime);
      await AsyncStorage.setItem("role", role);

      navigation.navigate("Login");
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {});

  return (
    <View>
      <View style={styles.headerContainer}>
        {/* Upisivanje imena */}
        <View>
          <Text style={styles.headerText}>Upišite Ime:</Text>
          <TextInput
            placeholder="Ime"
            onChangeText={(val) => setIme(val)}
            value={ime}
            style={styles.headerInput}
          ></TextInput>
        </View>

        {/* Upisivanje prezimena */}
        <View>
          <Text style={styles.headerText}>Upišite Prezime:</Text>
          <TextInput
            placeholder="Prezime"
            onChangeText={(val) => setPrezime(val)}
            value={prezime}
            style={styles.headerInput}
          ></TextInput>
        </View>
      </View>

      {/* Biranje da li si ucenik ili profesor */}
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            role === "Ucenik" ? styles.roleButtonActive : null,
          ]}
          onPress={() => setRole("Ucenik")}
        >
          <Text
            style={[
              styles.roleButtonText,
              role === "Ucenik" ? styles.roleButtonTextActive : null,
            ]}
          >
            Ucenik
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.roleButton,
            role === "Profesor" ? styles.roleButtonActive : null,
          ]}
          onPress={() => setRole("Profesor")}
        >
          <Text
            style={[
              styles.roleButtonText,
              role === "Profesor" ? styles.roleButtonTextActive : null,
            ]}
          >
            Profesor
          </Text>
        </TouchableOpacity>
      </View>

      {/* Dugme za registraciju */}
      <TouchableOpacity style={styles.confirmButton} onPress={registracija}>
        <Text style={styles.confirmButtonText}>Registruj se</Text>
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
    gap: 30,
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
  confirmButtonText: {
    color: Colors.headerText,
    fontSize: 18,
  },
  roleContainer: {
    marginTop: 20,
  },
  roleButton: {
    height: 40,
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 10,
    borderColor: Colors.accent,
    borderWidth: 1,

    elevation: 10,
    shadowColor: Colors.accent,
    shadowOffset: { width: 2, height: 5 },
    shadowRadius: 1,
  },
  roleButtonActive: {
    backgroundColor: Colors.headerBG,
  },
  roleButtonText: {
    color: Colors.accent,
    fontSize: 18,
  },
  roleButtonTextActive: {
    color: Colors.headerText,
  },
});

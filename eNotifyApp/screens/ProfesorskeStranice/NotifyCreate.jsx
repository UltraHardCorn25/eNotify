import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Text, Keyboard, TextInput, View } from "react-native";
import Colors from "../../components/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";

function NotifyCreate({ navigation, route }) {
  const supabase = route.params.supabase;
  const [naslov, setNaslov] = useState("");
  const [notify, setNotify] = useState("");
  const [razred, setRazred] = useState("");

  const getRazred = async () => {
    try {
      const value = await AsyncStorage.getItem("razred");

      if (value !== null) {
        setRazred(value);
      }
    } catch (e) {}
  };

  const sendNotification = async () => {
    const dataToInsert = {
      naslov: naslov,
      tekst: notify,
      razred: razred,
      datum: new Date(),
    };
    const { data, error } = await supabase
      .from("Obavestenja") // Replace 'your_table' with the actual name of your table
      .insert([dataToInsert]);
    setNaslov("");
    setNotify("");
    Keyboard.dismiss();
  };

  useEffect(() => {
    getRazred();
  });

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Upišite naslov notifikacije:</Text>
        <TextInput
          style={styles.headerInput}
          placeholder="Naslov obaveštenja"
          onChangeText={(val) => setNaslov(val)}
          value={naslov}
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Upišite tekst notifikacije:</Text>
        <TextInput
          style={[styles.headerInput, styles.headerInputMulti]}
          multiline={true}
          numberOfLines={4}
          onChangeText={(val) => setNotify(val)}
          value={notify}
          placeholder="Vaše obaveštenje"
          textAlignVertical="top"
        />
      </View>
      <TouchableOpacity
        style={styles.addNotificationButton}
        onPress={sendNotification}
      >
        <Text style={styles.addNotificationText}>Dodaj obaveštenje</Text>
      </TouchableOpacity>
    </>
  );
}

export default NotifyCreate;

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
  },
  headerInputMulti: {
    height: 200,
  },
  headerText: {
    fontSize: 16,
  },
  addNotificationButton: {
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

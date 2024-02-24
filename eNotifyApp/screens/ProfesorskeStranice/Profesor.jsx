import React from "react";
import HomeScreen from "../UcenikStranice/Ucenik";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Text, Dimensions } from "react-native";
import Colors from "../../components/Color";

function Profesor({ navigation }) {
  return (
    <>
      <TouchableOpacity
        style={styles.addNotificationButton}
        onPress={() => navigation.navigate("NotifyCreate")}
      >
        <Text style={styles.addNotificationText}>Dodajte novo obaveštenje</Text>
      </TouchableOpacity>
      <HomeScreen navigation={navigation} />
    </>
  );
}

export default Profesor;

const styles = StyleSheet.create({
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

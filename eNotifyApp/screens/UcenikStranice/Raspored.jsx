import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../lib/SupaBase";
import Colors from "../../components/Color";

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [raspored, setRaspored] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [razred, setRazred] = useState([]);

  //uzmi razred korisnika
  const getRazred = async () => {
    try {
      const value = await AsyncStorage.getItem("razred");
      if (value !== null) {
        setRazred(value);
        return value;
      }
    } catch (e) {
      // error reading value
    }
  };
  //uzmi raspored iz baze
  function getData() {
    const nabaviRazrede = async () => {
      const { data, error, status } = await supabase
        .from("Raspored")
        .select()
        .eq("razred", razred);
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setLoading(true);
        setRaspored(data);
      }
    };
    nabaviRazrede();
  }

  //renderovanje rasporeda
  function renderRaspored(item) {
    if (item.length > 0) {
      let table = [];
      let tableItem = [];
      let row = item[0];
      let maxLength = 0;
      const days = ["ponedeljak", "utorak", "sreda", "cetvrtak", "petak"];
      days.forEach((day) => {
        let count = 0;
        row[day].split(":/:").forEach((element) => {
          count++;
          if (element === "none") {
            tableItem.push(<View style={styles.prazanCas}></View>);
          } else {
            tableItem.push(
              <View style={styles.cas}>
                <Text style={styles.casText}> {element}</Text>
              </View>
            );
          }
          count > maxLength ? (maxLength = count) : null;
        });

        table.push(<View style={styles.day}>{tableItem}</View>);
        tableItem = [];
      });
      let times = [];
      let time = 7.3;
      for (let i = 0; i < maxLength; i++) {
        (time % 1) * 100 > 60 || (time % 1) * 100 == 0 ? (time += 0.4) : null;

        const formattedTime1 = `${Math.floor(time)
          .toString()
          .padStart(2, "0")}:${((time % 1) * 100).toFixed(0).padStart(2, "0")}`;

        time += 0.45;
        i === 6 ? (time -= 0.05) : null;
        (time % 1) * 100 > 60 || (time % 1) * 100 == 0 ? (time += 0.4) : null;

        const formattedTime2 = `${Math.floor(time)
          .toString()
          .padStart(2, "0")}:${((time % 1) * 100).toFixed(0).padStart(2, "0")}`;

        times[i] = (
          <Text style={styles.vreme}>
            {formattedTime1} - {formattedTime2}
          </Text>
        );

        if (i === 1 || i === 8) time += 0.15;
        else if (i === 3 || i === 10) time += 0.1;
        else time += 0.05;
      }
      return (
        <>
          <View style={styles.vremena}>{times}</View>
          {table}
        </>
      );
    }
    return false;
  }

  useEffect(() => {
    getRazred();
    if (raspored.length == 0) getData();
  }, [raspored]);

  return (
    <ScrollView horizontal={true}>
      <ScrollView contentContainerStyle={styles.flatList}>
        {raspored.length > 0 && renderRaspored(raspored)}
      </ScrollView>
    </ScrollView>
  );
};
const screenWidth = Dimensions.get("window").width;

export default App;
const overlaySize = 200;
const cellWidth = 120;
const cellHight = 50;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
  },
  text: {
    fontSize: 40,
  },
  list: {
    width: "100%",
  },
  flatList: {
    display: "flex",
    justifyContent: "center",
    padding: 10,
    gap: 10,
  },
  day: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  cas: {
    height: cellHight,
    width: cellWidth,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.noticationBG,
    borderRadius: 10,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 2, height: 5 },
    shadowRadius: 1,
    padding: 5,
  },
  prazanCas: { height: cellHight, width: cellWidth },
  casText: {
    fontSize: 12,
    color: Colors.textPrimary,
    textAlign: "center",
  },
  vremena: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    gap: 5,
    backgroundColor: "#2192ff",
  },
  vreme: {
    width: cellWidth,
    textAlign: "center",
    fontSize: 12,
    color: "white",
  },
});

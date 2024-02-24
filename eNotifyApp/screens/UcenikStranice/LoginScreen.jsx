import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { supabase } from "../../lib/SupaBase";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import Color from "../../components/Color";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Auth({ route }) {
  const navigation = useNavigation();
  const [razredi, setRazredi] = useState([]);
  const [razred, setRazred] = useState([]);
  const [loading, setLoading] = useState(false);
  const AsyncStorage = route.params.AsyncStorage;
  const getRazred = async () => {
    try {
      const value = await AsyncStorage.getItem("razred");

      if (value !== null) {
        navigation.navigate("Main");
        return value;
      }
    } catch (e) {}
  };

  useEffect(() => {
    const nabaviRazrede = async () => {
      const { data, error, status } = await supabase.from("Razredi").select();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setLoading(true);
        setRazredi([...data].sort((a, b) => (a.razred > b.razred ? 1 : -1)));
      }
    };
    nabaviRazrede();
  }, []);
  useEffect(() => {
    getRazred();
  }, []);
  async function Login() {
    const storeData = async () => {
      try {
        await AsyncStorage.setItem("razred", razred);
      } catch (e) {
        // saving error
      }
    };
    storeData();
    navigation.navigate("Main");
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Picker
          selectedValue={razred}
          onValueChange={(itemValue, itemIndex) => {
            setRazred(itemValue);
          }}
          style={styles.picker}
        >
          {loading &&
            razredi.map((item) => {
              return (
                <Picker.Item
                  label={item.razred}
                  value={item.razred}
                  key={item.id}
                ></Picker.Item>
              );
            })}
        </Picker>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TouchableOpacity onPress={() => Login()} style={styles.confirm}>
          <Text style={styles.confirmTxt}>Odaberi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 50,
    marginTop: "55%",
  },
  verticallySpaced: {
    padding: 5,
    marginTop: 20,
  },
  mt20: {},
  picker: {
    backgroundColor: Color.accent,
    color: Color.headerText,
    height: 50,
  },
  confirm: {
    backgroundColor: Color.accent,
    height: 50,
    justifyContent: "center",
  },
  confirmTxt: {
    color: Color.headerText,
    fontSize: 16,
    textAlign: "center",
  },
});

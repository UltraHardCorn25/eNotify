import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View, AppState } from "react-native";
import { supabase } from "../lib/SupaBase";
import { Button, Input } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

let razred;

export default function Auth() {
  const navigation = useNavigation();
  const [razredi, setRazredi] = useState([]);
  const [loading, setLoading] = useState(false);

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

  function Login() {
    navigation.navigate("Main");
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Picker
          selectedValue={razred}
          onValueChange={(itemValue, itemIndex) => (razred = itemValue)}
        >
          {loading &&
            razredi.map((item) => {
              return (
                <Picker.Item
                  label={item.razred}
                  value={item.id}
                  key={item.id}
                ></Picker.Item>
              );
            })}
        </Picker>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" onPress={() => Login()} />
      </View>
    </View>
  );
}
export { razred };
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});

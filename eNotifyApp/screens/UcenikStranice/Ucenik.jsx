import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  AppState,
  Platform,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Colors from "../../components/Color";
import { supabase } from "../../lib/SupaBase";
import { format } from "date-fns";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;
//gleda da li je u aplikaciji ili nije
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
//kako ce se prikazati notifikacije
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
//pita korisnika da li ce dozvoliti da mu stizu notifikacije ili ne
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token.data;
}
//slanje notifikacija
async function sendPushNotification(expoPushToken, data) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: data.new.naslov,
    body: data.new.tekst,
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

export default function HomeScreen({ navigation, route }) {
  const [obavestenjaArray, setObavestenja] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [razred, setRazred] = useState([]);
  const notificationListener = useRef();
  const responseListener = useRef();
  //const AsyncStorage = route.params.AsyncStorage;
  const getRazred = async () => {
    try {
      const value = await AsyncStorage.getItem("razred");
      if (value !== null) {
        setRazred(value.slice(0, 4));
        return value;
      }
    } catch (e) {
      // error reading value
    }
  };

  //uzimanje podataka iz baze
  function getData() {
    const nabaviObavestenja = async () => {
      const { data, error, status } = await supabase
        .from("Obavestenja")
        .select()
        .textSearch("razred", `${razred} | ${razred.substring(0, 1)} | 0 `);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setLoading(true);
        setObavestenja(data);
      }
    };
    nabaviObavestenja();
  }

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      getRazred();
    });

    // Return cleanup functions
    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);

  //pracenje notifikacija i dodeljivanje expo tokena
  useEffect(() => {
    registerForPushNotificationsAsync().then(async (token) => {
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  //pracenje baze i slanje notifikacije
  useEffect(() => {
    supabase
      .channel("Obavestenja")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "Obavestenja" },
        (payload) => {
          getData();
          if (AppState.currentState !== "active")
            sendPushNotification(expoPushToken, payload);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "Obavestenja" },
        (payload) => {
          getData();
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "Obavestenja" },
        (payload) => {
          getData();
        }
      )
      .subscribe();
    getRazred();
    getData();
  }, [expoPushToken, razred]);
  //renderovanje podataka u format za prikaz
  let date;
  const renderObavestenje = ({ item }) => {
    let dateNew;
    dateNew = format(item.datum, "MM. do. yyyy.");
    if (dateNew === date) {
      return (
        <TouchableOpacity
          style={styles.obavestenje}
          activeOpacity={0.8}
          key={item.tekst}
          onPress={() => {
            navigation.navigate("Obavestenje", {
              title: item.naslov,
              body: item.tekst,
              date: dateNew,
              class: razred,
            });
          }}
        >
          <Text style={styles.obavestenjeTitle}>{item.naslov}</Text>
          <Text style={styles.obavestenjeBody}>{item.tekst}</Text>
        </TouchableOpacity>
      );
    } else {
      date = dateNew;
      return (
        <View key={item.tekst}>
          <View style={styles.datum}>
            <Text style={styles.datumText}>{date}</Text>
          </View>
          <TouchableOpacity
            style={styles.obavestenje}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate("Obavestenje", {
                title: item.naslov,
                body: item.tekst,
                date: dateNew,
                class: razred,
              });
            }}
          >
            <Text style={styles.obavestenjeTitle}>{item.naslov}</Text>
            <Text style={styles.obavestenjeBody}>{item.tekst}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.list}>
          <FlatList
            style={styles.flatList}
            data={obavestenjaArray.sort((a, b) => {
              const dateA = new Date(a.datum.split(".").reverse().join("-"));
              const dateB = new Date(b.datum.split(".").reverse().join("-"));
              return dateB - dateA;
            })}
            renderItem={renderObavestenje}
            keyExtractor={(obavestenje) => obavestenje.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    flex: 1,
    alignItems: "center",
    width: "80%",
  },
  background: {
    width: "100%",
    height: "100%",
    opacity: 0.95,
    alignItems: "center",
  },
  flatList: {
    width: screenWidth,
  },
  obavestenje: {
    height: 100,
    width: "90%",
    marginVertical: 10,
    marginLeft: screenWidth * 0.05,
    padding: 10,
    backgroundColor: Colors.noticationBG,
    borderRadius: 10,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 2, height: 5 },
    shadowRadius: 1,
  },
  obavestenjeTitle: {
    fontSize: 20,
    color: Colors.textPrimary,
  },
  obavestenjeBody: {
    flexShrink: 1,
    color: Colors.textSecondary,
  },
  datum: {
    marginTop: 30,
    marginLeft: screenWidth * 0.06,
  },
  datumText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
});

// messaging().onNotificationOpenedApp(async (remoteMessage) => {
//   //ovde treba kod za siri prikaz notifikacije
// });

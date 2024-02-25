import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../../components/Color";

export default function RazrediList() {
  const [loading, setLoading] = useState(false);
  const [razred, setRazred] = useState("");
  const [razredi, setRazredi] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const nabaviRazrede = async () => {
      const razreds = await AsyncStorage.getItem("razredi");
      setRazred(await AsyncStorage.getItem("razred"));
      setLoading(true);
      setRazredi([...razreds.split(",")].sort((a, b) => (a > b ? 1 : -1)));
      console.log([...razreds.split(",")].sort((a, b) => (a > b ? 1 : -1)));
    };
    nabaviRazrede();
  }, []);

  const handleDeleteItem = (item) => {
    // Remove the item from options
    setRazredi(razredi.filter((razred) => razred !== item));
    const save = async () => {
      await AsyncStorage.setItem(
        "razredi",
        razredi.filter((razred) => razred !== item).toString()
      );
    };
    save();
    setModalVisible(false);
    setSelectedValue(null);
  };
  const setSelectedRazred = async (item) => {
    await AsyncStorage.setItem("razred", item);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        setSelectedRazred(item);
        setSelectedValue(item);
        setModalVisible(false);
      }}
    >
      <Text style={styles.itemText}>{item}</Text>
      <TouchableOpacity onPress={() => handleDeleteItem(item)}>
        <Text style={styles.deleteButton}>X</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.selectOptionButton}
      >
        <Text style={styles.selectOptionButtonText}>Razredi:</Text>
        <Text style={styles.selectOptionButtonSelect}>
          {selectedValue ? selectedValue : razred}
        </Text>
        <Image
          style={{ width: 25, height: 25, marginRight: 12 }}
          source={require("../../images/dots-menu.png")}
        />
      </TouchableOpacity>
      <View style={styles.listContainer}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.listContainer}>
            <View style={styles.modalContainer}>
              <FlatList
                data={razredi}
                renderItem={renderItem}
                keyExtractor={(item) => item}
              />
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

//   await AsyncStorage.setItem(
//     "razredi",
//     "4ITS - Profesor//4ITS//3ITS - Profesor//3ITS"
//   );
const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1ca8e3",
    width: 300,
    maxHeight: "30%",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    height: 50,
  },
  itemText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
  deleteButton: {
    color: "red",
    fontSize: 25,
    width: 30,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#487aee",
  },
  selectOptionButton: {
    height: 70,
    width: "100%",

    flexDirection: "row",
    alignItems: "center",
    padding: 20,

    backgroundColor: Colors.noticationBG,
    marginVertical: 10,
    borderRadius: 10,
    //borderColor: 'gray',
    //borderWidth: 1,

    elevation: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 2, height: 5 },
    shadowRadius: 1,
  },
  selectOptionButtonText: {
    fontSize: 17,
    flex: 1,
    color: Colors.textPrimary,
  },
  selectOptionButtonSelect: {
    fontSize: 15,
    flex: 1,
    color: Colors.accent,
    marginLeft: 40,
  },
  optionSwitch: {
    flex: 1,
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
    marginRight: 10,
  },
});

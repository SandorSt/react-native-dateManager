import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Date from "./components/Date";
import Form from "./components/Form";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [dates, setDates] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getDatesStorage = async () => {
      try {
        const datesStorage = await AsyncStorage.getItem("dates");
        if (datesStorage) {
          setDates(JSON.parse(datesStorage));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDatesStorage();
  }, []);

  const deletePatient = (id) => {
    const datesFilter = dates.filter((date) => date.id !== id);
    setDates(datesFilter);
    saveDatesStorage(JSON.stringify(datesFilter));
  };
  const showDateForm = () => {
    setShowForm(!showForm);
  };
  const closeKeyboard = () => {
    Keyboard.dismiss();
  };

  const saveDatesStorage = async (datesJSON) => {
    try {
      await AsyncStorage.setItem("dates", datesJSON);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => closeKeyboard()}>
      <View style={styles.container}>
        <Text style={styles.title}>Dates Manager </Text>
        <View>
          <TouchableHighlight
            onPress={() => showDateForm()}
            style={styles.showFormBtn}
          >
            <Text style={styles.btnText}>
              {showForm ? "Cancel Add Date" : "Add New Date"}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.content}>
          {showForm ? (
            <>
              <Text style={styles.title}>Add New Date</Text>
              <Form
                dates={dates}
                setDates={setDates}
                setShowForm={setShowForm}
                saveDatesStorage={saveDatesStorage}
              />
            </>
          ) : (
            <>
              <Text style={styles.title}>
                {dates.length > 0 ? "Manage your Dates" : "Yo have no dates"}
              </Text>

              <FlatList
                style={styles.list}
                data={dates}
                renderItem={({ item }) => (
                  <Date item={item} deletePatient={deletePatient} />
                )}
                keyExtractor={(date) => date.id}
              />
            </>
          )}
        </View>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#777777",
  },
  content: {
    flex: 1,
    marginHorizontal: "2.5%",
  },
  title: {
    color: "#404040",
    marginTop: 40,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  list: {
    flex: 1,
  },
  showFormBtn: {
    padding: 10,
    backgroundColor: "#777999",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

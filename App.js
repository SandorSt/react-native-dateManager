import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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

export default function App() {
  const [showForm, setShowForm] = useState(false);

  const [dates, setDates] = useState([]);

  const deletePatient = (id) => {
    setDates((currentDates) => {
      return currentDates.filter((date) => date.id !== id);
    });
  };
  const showDateForm = () => {
    setShowForm(!showForm);
  };
  const closeKeyboard = () => {
    Keyboard.dismiss();
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

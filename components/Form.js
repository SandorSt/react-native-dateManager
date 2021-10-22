import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableHighlight,
  ScrollView,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from "shortid";

export default function Form(props) {
  const { dates, setDates, setShowForm } = props;
  const [patient, setPatient] = useState("");
  const [owner, setOwner] = useState("");
  const [phone, setPhone] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [symptoms, setSymptoms] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmDate = (day) => {
    const options = { year: "numeric", month: "long", day: "2-digit" };
    setDay(day.toLocaleDateString(undefined, options));
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmTime = (time) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: false };
    setTime(time.toLocaleTimeString([], options));
    hideTimePicker();
  };

  const createNewDate = () => {
    //Validation
    if (
      patient.trim() === "" ||
      owner.trim() === "" ||
      phone.trim() === "" ||
      day.trim() === "" ||
      time.trim() === "" ||
      symptoms.trim() === ""
    ) {
      showAlert();
      return;
    }
    const date = {
      patient,
      owner,
      phone,
      day,
      time,
      symptoms,
    };
    date.id = shortid.generate();
    const newDates = [...dates, date];
    setDates(newDates);
    setShowForm(false);
  };
  const showAlert = () => {
    Alert.alert("Error", "All fields are mandatory", [{ text: "Ok" }]);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.label}>Patient:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPatient(text)}
          />
        </View>
        <View>
          <Text style={styles.label}>Owner:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setOwner(text)}
          />
        </View>
        <View>
          <Text style={styles.label}>Phone Number:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPhone(text)}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={styles.label}>Pick a Date:</Text>
          <Button title="Show Date Picker" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmDate}
            onCancel={hideDatePicker}
          />
          <Text>{day}</Text>
        </View>
        <View>
          <Text style={styles.label}>Pick a Time:</Text>
          <Button title="Show Time Picker" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmTime}
            onCancel={hideTimePicker}
          />
          <Text>{time}</Text>
        </View>
        <View>
          <Text style={styles.label}>Symptoms:</Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={(text) => setSymptoms(text)}
          />
        </View>
        <View>
          <TouchableHighlight
            onPress={() => createNewDate()}
            style={styles.submitBtn}
          >
            <Text style={styles.btnText}>Save date</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 10,

    paddingBottom: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: "#e1e1e1",
    borderWidth: 1,
    borderStyle: "solid",
  },
  submitBtn: {
    padding: 10,
    backgroundColor: "#777999",
    marginVertical: 10,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

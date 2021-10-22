import React from "react";
import { Text, StyleSheet, View, TouchableHighlight } from "react-native";

export default function Date(props) {
  const { item, deletePatient } = props;

  const deleteAction = (id) => {
    console.log("delete", id);

    deletePatient(id);
  };

  return (
    <View style={styles.date}>
      <View>
        <Text style={styles.label}>Patient:</Text>
        <Text style={styles.text}>{item.patient}</Text>
      </View>
      <View>
        <Text style={styles.label}>Owner:</Text>
        <Text style={styles.text}>{item.owner}</Text>
      </View>
      <View>
        <Text style={styles.label}>Symptoms:</Text>
        <Text style={styles.text}>{item.symptoms}</Text>
      </View>
      <View>
        <TouchableHighlight
          onPress={() => deleteAction(item.id)}
          style={styles.deleteBtn}
        >
          <Text style={styles.btnText}>Delete &times; </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  date: {
    backgroundColor: "#fff",
    borderBottomColor: "#a3a3a3",
    borderStyle: "solid",
    borderBottomWidth: 1,
    paddingTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
  },
  text: {
    fontSize: 18,
  },
  deleteBtn: {
    padding: 10,
    backgroundColor: "red",
    marginVertical: 10,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

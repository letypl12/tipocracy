import React from "react";
import { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import {
  CheckBox,
  Icon,
  Card,
  Input,
} from "react-native-elements/dist/checkbox/CheckBox";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
// import { navigation } from '@react-navigation/native';
// CheckboxComponentProps = {};

// const CheckboxComponent: React.FunctionComponent<CheckboxComponentProps> = () => {
//   const [check1, setCheck1] = useState(false);
//   const [check2, setCheck2] = useState(false);
//   const [check3, setCheck3] = useState(false);
//   const [check4, setCheck4] = useState(false);

function TeamsCreateScreen({ navigation }) {
  const [teamName, setTeamName] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  // const getData = firebase.firestore();

  // getData
  //   .collection("Users")
  //   .get()
  //   .then((querySnapshot) => {
  //     console.log("Total users: ", querySnapshot.size);

  //     querySnapshot.forEach((documentSnapshot) => {
  //       console.log("User ID: ", documentSnapshot.id, documentSnapshot.data());
  //     });
  //   });
  return (
    <View style={styles.container}>
      <Card>
        <Input
          label={"Team"}
          placeholder="Name your Team"
          value={teamName}
          onChangeText={setTeamName}
          // errorStyle={{ color: 'red' }}
          // errorMessage={SignUpErrors ? SignUpErrors.email : null}
        />
        {/* <CheckBox
          value={isSelected}
          onValueChange={setIsSelected}
          style={styles.checkbox}
          
        /> */}
        <Button
          buttonStyle={{ margin: 10, marginTop: 50 }}
          title="Add to Team"
          onPress={() => handleAddingtoTeam()}
        />
        <Text style={{ marginLeft: 100 }} onPress={() => signUp()}>
          No Acount? Sign Up
        </Text>
      </Card>

      {/* <Text>Teams Create</Text>
      <TextInput>Name of Team:</TextInput>
      <Button
        title="Team A created"
        onPress={() => {
          navigation.navigate("Tips");
        }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TeamsCreateScreen;

import React from "react";
import { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator } from "react-native";
import { CheckBox, Icon, Card, Input } from "react-native-elements";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

function TeamsCreateScreen({ navigation }) {
  const [teamName, setTeamName] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = () =>{
      firebase.firestore()
      .collection("Users")
      .get()
      .then((querySnapshot) => {
        console.log("Total users: ", querySnapshot.size);
  
        querySnapshot.forEach((documentSnapshot) => {
          console.log("User ID: ", documentSnapshot.id, documentSnapshot.data());
        });
      })
      .then(()=>{
        setIsLoading(false);
      });
    };

    getData();
  }, []);



  if (isLoading){
    return(
      <ActivityIndicator/>
    )
  }

  return (
    <View style={{ paddingVertical: 20 }}>
      <Card>
        <Input
          label={"Team"}
          placeholder="Name your Team"
          value={teamName}
          onChangeText={setTeamName}
        ></Input>
        <CheckBox
          value={isSelected}
          onValueChange={setIsSelected}
          style={styles.checkbox}
        />
        <Button
          buttonStyle={{ margin: 10, marginTop: 50 }}
          title="Add to Team"
          onPress={() => handleAddingtoTeam()}
        />
      </Card>
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

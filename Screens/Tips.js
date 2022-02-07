import React from "react";
import { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View,  TextInput } from "react-native";
import {Input, Button} from "react-native-elements";
import styles  from "../utils/styles";


function TipsScreen({ navigation }) {
  const [TipErrors, setTipErrors] = useState({});
  const [tip, setTip] = React.useState(0.00);

  const saveTip = () =>{
    // validate the input


    // create a new firestore record, set isLoading to true
    let timestamp = firebase.firestore.FieldValue.serverTimestamp();
    firestore()
    .collection("Tips")
    .add({
      team_uid: global.userToken.defaultTeam,
      uid: global.userToken.uid,
      amount: tip,
      createdDateTime: timestamp,
    })   
    //then set isLoading to false and send them home
    
  }

  //function to render the page components based on if a team is chosen

//check if isLoading and return ActivityIndicator


//otherwise show the screen

  return (
    <View style={styles.container}>
      
      {/*  
      create a render function and then show a message to choose a team if defaultTeam and global.teamName are not set
      otherwise show the form to add a tip
      */}
      
      <Text>You are on Team: {global.teamName} </Text>
      <Text>Enter Tip:</Text>

      <Input
        label={"Tip"}
        placeholder="0.00"
        value={tip}
        onChangeText={setTip}
        errorStyle={{ color: "red" }}
        errorMessage={TipErrors ? TipErrors.tip : null}
        keyboardType="decimal-pad"
      />      
      <Button title="Save" onPress={saveTip}></Button>
      
    </View>
  );
}

export default TipsScreen;

import React from "react";
import { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Input, Button, ActivityIndicator } from "react-native-elements";
import styles from "../utils/styles";
// import { firebase } from "@react-native-firebase/auth";
import { firebase, firestore } from "@react-native-firebase/firestore";
import { validateAll, validations, validate } from "indicative/validator";

function TipsScreen({ navigation }) {
  const [TipErrors, setTipErrors] = useState({});
  const [tip, setTip] = React.useState(0.0);
  const [isLoading, setIsLoading] = useState(true);

  const saveTip = () => {
    // validate the input
    const rules = {
      tip: "required|number|above:0",
      // tip: [
      //   validations.number(),
      //   validations.above([0]),
      //   validations.required(),
      // ],
    };

    const data = {
      tip: tip,
    };

    const messages = {
      required: (field) => `${field} is required`,
      "tip.required": "An amount is required to save a tip",
      "tip.number": "Make sure to enter a number",
      "tip.above": "The tip should be greater than 0",
    };

    validateAll(data, rules, messages)
      .then(async () => {
        let timestamp = firebase.firestore.FieldValue.serverTimestamp();
        firebase
          .firestore()
          .collection("Tips")
          .add({
            team_uid: global.userToken.defaultTeam,
            uid: global.userToken.uid,
            amount: tip,
            createdDateTime: timestamp,
          })
          .then(() => {
            console.log("tip added");
            setTip(0.0);
            navigation.navigate("Home", { reload: true });
          });
      })
      // create a new firestore record, set isLoading to true

      //then set isLoading to false and send them home

      .catch((err) => {
        console.log("caught:" + JSON.stringify(err));
        const formatError = {};
        for (let myErr of err) {
          formatError[myErr.field] = myErr.message;
        }
        setTipErrors(formatError);
      });
  };

  //function to render the page components based on if a team is chosen
  const renderTips = () => {
    console.log("in tips with default team: " + chosenTeam);

    if (global.userToken.defaultTeam == '') {
      return (
        <View style={styles.container}>
          <Text>You must first choose a team before entering tips.</Text>
          <Button title="Choose Team" onPress={()=>{navigation.navigate("Teams")}}/>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>You are on Team: {global.teamToken.teamName} </Text>
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
  };



  //check if isLoading and return ActivityIndicator
  if (!isLoading) {
    return <ActivityIndicator />;
  }

  //otherwise show the screen

  return (
    <View style={styles.container}>
      {renderTips()}

      {/*  
      create a render function and then show a message to choose a team if defaultTeam and global.teamName are not set
      otherwise show the form to add a tip
      */}

      <Text>You have entered: {tip} </Text>

      {/* <Input
        label={"Tip"}
        placeholder="0.00"
        value={tip}
        onChangeText={setTip}
        errorStyle={{ color: "red" }}
        errorMessage={TipErrors ? TipErrors.tip : null}
        keyboardType="decimal-pad"
      />
      <Button title="Save" onPress={saveTip}></Button> */}
    </View>
  );
}

export default TipsScreen;

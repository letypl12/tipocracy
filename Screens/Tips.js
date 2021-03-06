import React from "react";
import { useEffect, useState, useContext } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import { Input, Button } from "react-native-elements";
import styles from "../utils/styles";
// import { firebase } from "@react-native-firebase/auth";
import { firebase, firestore } from "@react-native-firebase/firestore";
import { validateAll, validations, validate } from "indicative/validator";


function TipsScreen({ navigation }) {
  const [TipErrors, setTipErrors] = useState({});
  const [tip, setTip] = useState('');
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [chosenTeam, setChosenTeam] = useState(
    global.teamToken || { teamName: "", team_uid: "", teamDescription: "" }
  );

  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
      //update the state vars that matter for a re-render of this screen
      setChosenTeam(
        global.teamToken || { teamName: "", team_uid: "", teamDescription: "" }
      );
      setIsLoading(false);
    });
    return subscribe;
  }, [navigation]);

  const saveTip = () => {
    setTipErrors({});
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
      "tip.above": "The tip should be a number greater than 0",
      "tip.number": "Make sure to enter a number",
    };

    validateAll(data, rules, messages)
      .then(async () => {
        let timestamp = firebase.firestore.FieldValue.serverTimestamp();
        firebase
          .firestore()
          .collection("Tips")
          .add({
            team_uid: global.userToken.defaultTeam,
            teamName: global.teamToken.teamName,
            uid: global.userToken.uid,
            amount: tip,
            note: note,
            createdDateTime: timestamp,
          })
          .then(() => {
            console.log("tip added");
            setTip('');
            setNote('');
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
    console.log("in tips with default team: " + chosenTeam.teamName);

    if (chosenTeam.team_uid == "") {
      return (
        <View style={styles.container}>
          <Text>You must first choose a team before entering tips.</Text>
          <Button
            title="Choose Team"
            onPress={() => {
              navigation.navigate("TeamsTab");
            }}
            buttonStyle={styles.buttonBase}
            titleStyle={{ fontWeight: 'bold', fontSize: 18, color:'#000' }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View>
              <Text>Team:</Text>
              <Text style={styles.textH1}>
                {chosenTeam.teamName}
              </Text>
          </View>
          
          <View>
              <Button
                title="Change Team"
                onPress={() => {navigation.navigate("TeamsTab");}}
                buttonStyle={styles.buttonBase}
                titleStyle={{ fontWeight: 'bold', fontSize: 18, color:'#000' }}
              />         
          </View>

          {/* <Text style={styles.textH1}>Enter Tip:</Text> */}
          <View style={{marginTop:50}}>
            <Input
              label={"Tip"}
              placeholder="0.00"
              value={tip}
              onChangeText={setTip}
              errorStyle={{ color: "red" }}
              errorMessage={TipErrors ? TipErrors.tip : null}
              keyboardType="decimal-pad"
              placeholderTextColor={'black'}
              labelStyle={{
                color: 'black',
                fontWeight: 'bold'
              }}
              inputStyle={{
                color: 'black',
                fontWeight: 'bold'
              }}
            />
            <Input
              label={"Note"}
              placeholder="optional"
              value={note}
              onChangeText={setNote}
              errorStyle={{ color: "red" }}
              errorMessage={TipErrors ? TipErrors.tip : null}
              keyboardType="default"
              placeholderTextColor={'black'}
              labelStyle={{
                color: 'black',
                fontWeight: 'bold'
              }}
              inputStyle={{
                color: 'black',
                fontWeight: 'bold'
              }}
            />            
            <Button title="Save Tip" 
                    onPress={saveTip}
                    buttonStyle={styles.buttonBase}
                    titleStyle={{ fontWeight: 'bold', fontSize: 18, color:'#000' }}
            />
          </View>
          

        </View>
      );
    }
  };

  //check if isLoading and return ActivityIndicator
  if (isLoading) {
    return <ActivityIndicator />;
  }

  //otherwise show the screen
  const returnToTeams = () => {
    navigation.navigate("Teams");
  };

  return (
    <View style={[styles.container, {backgroundColor:'#FFF'}]}>
        {/* <Video
        source={require("../images/tipVideo2_white.mp4")}
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode={"cover"}
        rate={1.0}
        ignoreSilentSwitch={"obey"}
        />    */}
      {renderTips()}
    </View>
  );
}

export default TipsScreen;

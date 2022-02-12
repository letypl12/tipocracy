import {useState, useEffect} from "react";
import React from "react";
import { StyleSheet, Text, View, TextInput, ActivityIndicator } from "react-native";
import styles from "../utils/styles";
import { Button, CheckBox, Icon, Card, Input } from "react-native-elements";
import { validateAll } from "indicative/validator";
import * as SecureStore from "expo-secure-store";
import firestore from "@react-native-firebase/firestore";
// import { navigation } from '@react-navigation/native';


function TeamsEditScreen({ route, navigation }) {
  const { myTeam } = route.params;
  console.log(JSON.stringify(myTeam));
  const [isLoading, setIsLoading] = useState(false);
  const [teamName, setTeamName] = useState(myTeam.teamName);
  const [teamDescription, setTeamDescription] = useState(myTeam.teamDescription);
  const [TeamsErrors, setTeamsErrors] = useState({});

  useEffect(() => {console.log('updating team errors');}, [TeamsErrors]);

const validateTeam =() => {
    setTeamsErrors({});
    const rules = {
      name: "required|string|min:4|max:15",
      description: "required|string|min:6|max:40",
    };

    const data = {
      name: teamName,
      description: teamDescription,
    };

    const messages = {
      required: (field) => `${field} is required`,
      "name.alpha": "The name of the team contains unallowed characters",
      "description.alpha": "Provide valid description",
    };

    validateAll(data, rules, messages)
      .then(async () => {
        console.log("form validated, sending: " + JSON.stringify(data));
        console.log("in create a team");
        firestore()
        .collection("Teams")
        .doc(myTeam.team_uid)
        .update({
            name: teamName,
            creator: myTeam.creator_uid,
            teamDescription: teamDescription,
        })
        .then( () => {
          firestore()
          .collection("Invites")
          .where("team_uid", "==", myTeam.team_uid)
          .get()
          .then((querySnapshot) => {
            console.log("Firestore accepting # of invites: ", querySnapshot.size);

            querySnapshot.forEach((documentSnapshot) => {
              let docRef = (documentSnapshot.id)
              firestore()
              .collection("Invites")
              .doc(docRef)
              .update({
                teamName: teamName,
                teamDescription: teamDescription,
              })
            })
          })  
          .then(() =>{
              console.log('in 1')
              global.teamToken = {
                teamName: teamName,
                creator_uid: myTeam.creator_uid,
                teamDescription: teamDescription,
                team_uid: myTeam.team_uid,
            };
          })
          .then(() =>{
              console.log('in 1')
              let teamObj = {
                name: teamName,
                creator: myTeam.creator_uid,
                teamDescription: teamDescription,
              };
              SecureStore.setItemAsync('teamToken', JSON.stringify(teamObj))
          })
          .then(() =>{
            alert('Team updated.')
            navigation.navigate('Teams')
        })

      })
      .catch((err) => {
        console.log("caught:" + JSON.stringify(err));
        const formatError = {};
        for (let myErr of err) {
          formatError[myErr.field] = myErr.message;
        }
        setTeamsErrors(formatError);
      });
          
  })
};

  const deleteTeam = () => {
    // validate the input
    alert('in deleteTeam for team:' + myTeam.team_uid);
    };

if (isLoading) {
  return <ActivityIndicator />;
}
return (


  <View style={styles.container}>
    <Input
        label={"Team"}
        placeholder="Name your Team"
        value={teamName}
        onChangeText={setTeamName}
        errorStyle={{ color: "red" }}
        errorMessage={TeamsErrors ? TeamsErrors.name : null}
    />
    <Input
        label={"Team Description"}
        placeholder="Describe your Team"
        value={teamDescription}
        onChangeText={setTeamDescription}
        errorStyle={{ color: "red" }}
        errorMessage={TeamsErrors ? TeamsErrors.description : null}
    />
    <Button title="Save Team" 
        onPress={validateTeam}
        buttonStyle={styles.buttonBase}
        titleStyle={{ fontWeight: 'bold', fontSize: 18, color:'#000' }}
    />
     

    {/* <Button title="Delete Team" 
        onPress={deleteTeam}
        buttonStyle={styles.buttonBase}
        titleStyle={{ fontWeight: 'bold', fontSize: 18, color:'#000' }}
    />     */}


  </View>
  );
}

export default TeamsEditScreen;

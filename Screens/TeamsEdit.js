import {useState} from "react";
import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import styles from "../utils/styles";
import { Button, CheckBox, Icon, Card, Input } from "react-native-elements";
// import { navigation } from '@react-navigation/native';


function TeamsEditScreen({ route, navigation }) {
  const { myTeam } = route.params;
  console.log(JSON.stringify(myTeam));
  const [isLoading, setIsLoading] = useState(true);
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [TeamsErrors, setTeamsErrors] = useState({});

  const deleteTeam = () => {
    // validate the input
    alert('in deleteTeam for team:' + myTeam.team_uid);
    };

// if (isLoading) {
//   return <ActivityIndicator />;
// }
return (
  // <View>
  //   <Text>{myTeam.teamName}</Text>
  //   <Button
  //     title="Delete Team"
  //     onPress={deleteTeam}
  //     buttonStyle={styles.buttonBase}
  //     titleStyle={{ fontWeight: 'bold', fontSize: 18, color:'#000' }} 
  //   />
  // </View>

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
        onPress={()=>{alert('Save Team')}}
        buttonStyle={styles.buttonBase}
        titleStyle={{ fontWeight: 'bold', fontSize: 18, color:'#000' }}
    />
    <Button title="Delete Team" 
        onPress={deleteTeam}
        buttonStyle={styles.buttonBase}
        titleStyle={{ fontWeight: 'bold', fontSize: 18, color:'#000' }}
    />    
    {/* <Input label={"Creator"} value={creator}></Input> */}

  </View>
  );
}

export default TeamsEditScreen;

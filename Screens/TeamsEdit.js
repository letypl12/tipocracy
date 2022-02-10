import {useState} from "react";
import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import styles from "../utils/styles";
// import { navigation } from '@react-navigation/native';


function TeamsEditScreen({ route, navigation }) {
  const { myTeam } = route.params;
  console.log(JSON.stringify(myTeam));
  const [isLoading, setIsLoading] = useState(true);

  const deleteTeam = () => {
    // validate the input
    alert('in deleteTeam for team:' + myTeam.team_uid);
    };

// if (isLoading) {
//   return <ActivityIndicator />;
// }
return (
  <View>
    <Text>{myTeam.teamName}</Text>
    <Button
      title="Delete Team"
      onPress={deleteTeam}
      buttonStyle={styles.buttonBase}
      titleStyle={{ fontWeight: 'bold', fontSize: 18, color:'#000' }} 
    />
  </View>
);
}

export default TeamsEditScreen;

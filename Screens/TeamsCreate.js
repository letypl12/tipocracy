import React from "react";
import { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { CheckBox, Icon, Card, Input } from "react-native-elements";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import styles from "../utils/styles";
import { ScrollView } from "react-native-gesture-handler";

function TeamsCreateScreen({ navigation }) {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState("");
  const [creator, setCreator] = useState(global.userToken.name);
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inviteeEmail, setInviteeEmail] = useState("");



  const creator_uid = global.userToken.uid
  const addTeam = async () => {
    //Validate all the data you are sending
    console.log("in create a team");
    firestore()
      .collection("Teams")
      .add({
        name: teamName,
        members: members,
        creator: creator_uid,
      })
      .then(() => {
        // //Now create collection("Invites") records
        // for let i=0; i<members.length; i++{
          // {
          //   team_uid: <from the previous addTeam stuff,
          //   creator_uid: from global.userToken.uid
          //   email: <from members>,
          //   active: boolean,
          //   createDate: datetime now
          //   deactiveDate: null

          // }
        //}

        console.log("Team Created!");
      });
  };

  const handleAddFriend = async () => {
    //Put in validation for the email address here

    let newValue = {email: inviteeEmail};
    setMembers(oldArray => [newValue,...oldArray] );
    //clear the email from the form
    setInviteeEmail('');
  };
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.item_email}>{title}</Text>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item title={item.email} />

  );


  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (

    <View style={styles.container_std}>
      <ScrollView>


        <Input
          label={"Team"}
          placeholder="Name your Team"
          value={teamName}
          onChangeText={setTeamName}
        ></Input>
        <Input label={"Creator"} value={creator}></Input>

        <Input
          label={"Invitee"}
          placeholder="Invitee email"
          value={inviteeEmail}
          onChangeText={setInviteeEmail}
        ></Input>
        <Button
          buttonStyle={styles.standardButton}
          title="Add to Team"
          onPress={() => handleAddFriend()}
        />

        <FlatList
          label="Invitees"
          data={members}
          renderItem={renderItem}
          keyExtractor={item => item.email}

        />

      <Button
          buttonStyle={styles.standardButton}
          backgroundColor="#03A9F4"
          title="Create Team"
          onPress={() => addTeam()}
        /> 
      </ScrollView>             
    </View>
  );
}


export default TeamsCreateScreen;

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
  ScrollView,
} from "react-native";
import { CheckBox, Icon, Card, Input } from "react-native-elements";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import styles from "../utils/styles";

import { validateAll } from "indicative/validator";

function TeamsCreateScreen({ navigation }) {
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [members, setMembers] = useState("");
  const [creator, setCreator] = useState(global.userToken.name);
  const [isLoading, setIsLoading] = useState(false);
  const [inviteeEmail, setInviteeEmail] = useState("");
  const [InvitesErrors, setInvitesErrors] = useState({});

  const creator_uid = global.userToken.uid;
  const EMAIL = global.userToken.email;
  const addTeam = async () => {
    //Validate all the data you are sending
    console.log("in create a team");
    firestore()
      .collection("Teams")
      .add({
        name: teamName,
        creator: creator_uid,
      })
      .then((docRef) => {
        console.log(docRef);
        const team_uid = docRef.id;
        let timestamp = firebase.firestore.FieldValue.serverTimestamp();
        console.log("in create invite");
        console.log(EMAIL + creator_uid + timestamp + teamName + team_uid);
        // add an invite specifiaclly for the creator with active to true
        firebase.firestore().collection("Invites").add({
          email: EMAIL,
          creator_uid: creator_uid,
          active: true,
          createDate: timestamp,
          deactivateDate: "",
          teamName: teamName,
          teamDescription: teamDescription,
          team_uid: team_uid,
        });
        //add invites for everybodu's emails we are adding
        for (let i = 0; i < members.length; i++) {
          console.log(
            members.email + creator_uid + timestamp + teamName + team_uid
          );
          console.log(JSON.stringify(members));
          firebase.firestore().collection("Invites").add({
            email: members[i].email,
            creator_uid: creator_uid,
            active: false,
            createDate: timestamp,
            deactivateDate: "",
            teamName: teamName,
            teamDescription: teamDescription,
            team_uid: team_uid,
          });
        }
      })
      .then(() => {
        console.log("Invite created");
        navigation.navigate("Teams", {reload:true});
      });
  };

  const handleInvites = () => {
    // https://indicative.adonisjs.com
  };

  const handleAddFriend = async () => {
    //Put in validation for the email address here
    // const rules = {
    //   email: "required|email",
    // };
    // const data = {
    //   email: emailAddress,
    // };
    // const messages = {
    //   required: (field) => `${field} is required`,
    //   "email.email": "Please enter a valid email address",
    // };
    // // validate(data, rules, messages).then(console.log).catch(console.error);
    // validateAll(data, rules, messages)
    //   .then(async () => {
    //     console.log("in validating");
    //     // await handleAddFriend(data);
    //     // signIn({ emailAddress, password });
    //   })
    //   .catch((err) => {
    //     console.log("caught:" + JSON.stringify(err));

    //     const formatError = {};
    //     for (let emailInviteErr of err) {
    //       formatError[emailInviteErr.field] = emailInviteErr.message;
    //     }
    //     setInvitesErrors(formatError);
    //   });

    let newValue = { email: inviteeEmail };
    setMembers((oldArray) => [newValue, ...oldArray]);
    //clear the email from the form
    setInviteeEmail("");
  };
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.item_email}>{title}</Text>
    </View>
  );
  const renderItem = ({ item }) => <Item title={item.email} />;

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
          errorMessage={InvitesErrors ? InvitesErrors.email : null}
        />
        <Input
          label={"Team Description"}
          placeholder="Describe your Team"
          value={teamDescription}
          onChangeText={setTeamDescription}
          errorStyle={{ color: "red" }}
          errorMessage={InvitesErrors ? InvitesErrors.email : null}
        />

        <Input label={"Creator"} value={creator}></Input>

        <View style={{flex:1, flexDirection:'row'}}>
          <View style={{flex:.8, flexDirection:'column'}}>
              <Input
              label={"Invitee"}
              autoCapitalize="none"
              placeholder="Invitee email"
              value={inviteeEmail}
              onChangeText={setInviteeEmail}
              />
          </View>
          <View style={{flex:.2, flexDirection:'column'}}>
              <Button
              buttonStyle={styles.standardButton}
              title="Add"
              onPress={() => handleAddFriend()}
              />
          </View>          
        </View>



        <FlatList
          label="Invitees"
          data={members}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          style={{flex:1, margin:20, height:100}}
        />

        <Button
          buttonStyle={styles.standardButton}
          backgroundColor="#03A9F4"
          title="Create Team"
          onPress={() => addTeam()}
        />

    </View>
  );
}

export default TeamsCreateScreen;

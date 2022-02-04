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
import { validateAll } from "indicative/validator";

function TeamsCreateScreen({ navigation }) {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState("");
  const [creator, setCreator] = useState(global.userToken.name);
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inviteeEmail, setInviteeEmail] = useState("");
  const [InvitesErrors, setInvitesErrors] = useState({});
  const [isActive, setIsActive] = useState(true);
  const [deActive, setDeActive] = useState(null);

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
      .then(() => {
        // //Now create collection("Invites") records
        // Don't forget to add a record for the creator with active: true
        // for let i=0; i<members.length; i++{
        // {
        //   team_uid: <from the previous addTeam stuff,
        //   creator_uid: from global.userToken.uid
        //   teamName: teamName
        //   email: <from members>,
        //   active: boolean,
        //   createDate: datetime now
        //   deactiveDate: null
        // }
        //}
        const team_uid = firebase.firestore().collection("Teams").id;
        let timestamp = firebase.firestore.FieldValue.serverTimestamp();
        console.log("in create invite");
        firebase
          .firestore()
          .collection("Invites")
          .add({
            email: EMAIL,
            creator: creator_uid,
            active: isActive,
            dateCreated: timestamp,
            deactivateDate: null,
            team: teamName,
            teamId: team_uid,
          })
          .then(() => {
            console.log("Invite created");
          });

        console.log("Team Created!");
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
    <View style={styles.container_std}>
      <ScrollView>
        <Input
          label={"Team"}
          placeholder="Name your Team"
          value={teamName}
          onChangeText={setTeamName}
          errorStyle={{ color: "red" }}
          errorMessage={InvitesErrors ? InvitesErrors.email : null}
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
          keyExtractor={(item) => item.email}
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

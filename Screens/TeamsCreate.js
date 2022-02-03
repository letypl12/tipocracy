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

function TeamsCreateScreen({ navigation }) {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState("");
  const [creator, setCreator] = useState(global.userToken.name);
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [inviteName, setInviteName] = useState("");

  useEffect(() => {
    const getData = () => {
      firebase
        .firestore()
        .collection("Users")
        .get()
        .then((querySnapshot) => {
          console.log("Total users: ", querySnapshot.size);

          querySnapshot.forEach((documentSnapshot) => {
            console.log(
              "User ID: ",
              documentSnapshot.id,
              documentSnapshot.data()
            );
          });
        })
        .then(() => {
          setIsLoading(false);
        });
    };

    getData();
  }, []);

  const inviteData = {
    inviteName: inviteName,
  };
  // const creator = global.userToken.name
  const addTeam = async () => {
    const rules = {
      teamName: "required|string",
    };
    console.log("in create a team");
    firestore()
      .collection("Teams")
      .doc(`${teamName}`)
      .set({
        // .add({
        name: teamName,
        members: members,
        creator: creator,
      })
      .then(() => {
        console.log("Team Created!");
      });
  };

  const handleAddFriend = async () => {
    const rules = {
      inviteName: "required|string",
    };

    console.log("name to use:", inviteName);
    firebase
      .firestore()
      .collection("Users")
      .get()
      .then((querySnapshot) => {
        console.log("Total users: ", querySnapshot.size);

        querySnapshot.forEach((documentSnapshot) => {
          if (documentSnapshot.get("name") === inviteName) {
            console.log("user:", documentSnapshot.get("email"));
            const addFriend = documentSnapshot.get("email");
            // return (
            //   <FlatList
            //     data={[{ key: `${addFriend}` }]}
            //     renderItem={({ item }) => (
            //       <Text style={styles.item}>{item.key}</Text>
            //     )}
            //   ></FlatList>
            // );
          }
        });
      });
    // return (
    //   <FlatList
    //     data={addFriend}
    //     renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
    //   ></FlatList>
    // );

    // .doc(inviteName)
    // .then((documentSnapshot) => {
    //   console.log("Exists?: ", documentSnapshot.exists);

    //   if (documentSnapshot.exists) {
    //     console.log("User data: ", documentSnapshot.get("email"));
    //   }
    // });
  };

  // https://indicative.adonisjs.com

  if (isLoading) {
    return <ActivityIndicator />;
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
        <Input
          label={"Members"}
          placeholder=""
          value={members}
          onChangeText={setMembers}
        ></Input>
        <Input label={"Creator"} value={creator}></Input>
        <Button
          buttonStyle={{ margin: 10, marginTop: 50 }}
          backgroundColor="#03A9F4"
          title="Create Team"
          onPress={() => addTeam()}
        />
        <Input
          label={"Invitee"}
          placeholder="Invitee name"
          value={inviteName}
          onChangeText={setInviteName}
        ></Input>
        <Button
          buttonStyle={{ margin: 10, marginTop: 50 }}
          title="Add to Team"
          onPress={() => handleAddFriend()}
        />

        <CheckBox
          title={inviteName}
          checked={isSelected}
          onPress={() => setIsSelected(!isSelected)}
          // onValueChange={setIsSelected}
          style={styles.checkbox}
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default TeamsCreateScreen;

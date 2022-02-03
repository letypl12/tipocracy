import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
// import { navigation } from '@react-navigation/native';
import firestore from "@react-native-firebase/firestore";

//useEffect to query for teams by invitee and by creator
// firestore join for two collections, Teams and Invitees
function TeamsScreen({ navigation }) {
  const [dataSource, setDataSource] = useState([]);
  const EMAIL = global.userToken.email;
  const UID = global.userToken.uid;


useEffect(() => {
  // const getData = () =>{
  //   firebase.firestore()
  const getData = () => {
    firebase
      .firestore()
      .collection("Invites")
      .where('email' = EMAIL)
      .get()      
      .then((querySnapshot) => {
        console.log("Total Teams: ", querySnapshot.size);


        querySnapshot.forEach((documentSnapshot) => {
          let newValue = {
              team_uid: documentSnapshot.team_uid,
              teamName: documentSnapshot.teamName,
              creator_uid: documentSnapshot.creator_uid
          }
          setDataSource(oldArray => [newValue,...oldArray] );
        });
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  getData();
}, [dataSource]);

const Item = ({ name, creator }) => (
  <View style={styles.item}>
    <Text style={styles.item_email}>{name} {(creator==UID)? 'yes':'no'}</Text>
  </View>
)

const renderItem = ({ item }) => (
  <Item name={item.teamName} creator={item.creator_uid} />

);

  return (
    <View style={styles.container_std}>
      <Text>My Teams</Text>
      <Text>Choose a team to work on below.</Text>
      <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />   

        <Button
        title="Choose A Team"
        onPress={() => {
          navigation.navigate("Choose A Team");
        }}
      /> 
      <Text>Invites</Text>
      <Text>Accept any open invitations to join a team.</Text>

      <Button
        title="Create A Team"
        onPress={() => {
          navigation.navigate("Create A Team");
        }}
      />
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
});

export default TeamsScreen;

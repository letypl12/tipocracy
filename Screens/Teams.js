import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ScrollView
} from "react-native";

import firestore from "@react-native-firebase/firestore";
import { useEffect, useState, useContext } from "react";
import styles from "../utils/styles";
import {ListItem, Button, Avatar} from "react-native-elements"
import * as SecureStore from "expo-secure-store";

function TeamsScreen({ route, navigation }) {
  const { reload } = route.params;
  const [dataSourceTeams, setDataSourceTeams] = useState([]);
  const [dataSourceInvites, setDataSourceInvites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let myInvites = []
  let myTeams = []

  useEffect(() => {
    const getData = async () => {
      console.log('in getData, checking records for:' + global.userToken.email);
      firestore()
        .collection("Invites")
        .where("email", "==", global.userToken.email)
        .get()
        .then((querySnapshot) => {
          console.log("Firestore Total Teams: ", querySnapshot.size);

          querySnapshot.forEach((documentSnapshot) => {
            if (documentSnapshot.get("active") == true){
              let tmpTeam = {
                              teamName: documentSnapshot.get("teamName"),
                              teamDescription: documentSnapshot.get("teamDescription"),
                              team_uid: documentSnapshot.get("team_uid"),
                              creator_uid: documentSnapshot.get("creator_uid")
                            }
              myTeams.push(tmpTeam)
              setDataSourceTeams((oldArray) => [tmpTeam, ...oldArray]);                          
            }else{
              console.log('there is an invite');
              myInvites.push({
                teamName: documentSnapshot.get("teamName"),
                teamDescription: documentSnapshot.get("teamDescription"),
                team_uid: documentSnapshot.get("team_uid"),
                creator_uid: documentSnapshot.get("creator_uid")
              })
            }
          });
          // 
          // setDataSourceInvites((oldArray) => [myInvites, ...oldArray]);

          setDataSourceTeams(myTeams);  
          setDataSourceInvites(myInvites);  
          console.log('Length of new teams object:' + myTeams.length);   
          console.log('TEAMS: ' + JSON.stringify(myTeams));
          console.log('INVITES: ' + JSON.stringify(myInvites));
          console.log('dataSourceTeams: ' + JSON.stringify(dataSourceTeams));

          
          setIsLoading(false);
        })

    };

    getData();
  }, [reload]);

const chooseTeam = async (data) => {
  console.log('in chooseTeam' + data.team_uid + global.userToken.uid + global.userToken.email + global.userToken.name);
  setIsLoading(true);
  //1b. Update firestore Users record
    firestore()
    .collection("Users")
    .doc(global.userToken.uid)
    .update({
        name: global.userToken.name,
        email: global.userToken.email,
        defaultTeam: data.team_uid,
    })



    .then(async () => {
        //1. update the SecureStore userToken so the 'defaultTeam' is set to the team_uid
        //first check if the userToken exists in SecureStore (meaning they clicked "Remember Me")
        //if it does not, you can skip this step.
      SecureStore.getItemAsync('userToken')
      .then(async (userTokenobj) =>{
        console.log('in 1')
        if (typeof(userTokenobj) !== 'undefined'){
          userTokenobj = JSON.parse(userTokenobj);
          userTokenobj.defaultTeam = data.team_uid;
          await SecureStore.setItemAsync('userToken', JSON.stringify(userTokenobj))
        }
      })
      .then(async () =>{
        console.log('in 2')
        //1a. save teamname and description as well in global.
        global.teamToken = data;
        SecureStore.setItemAsync('teamToken', JSON.stringify(data))
   
        .then(() => {
          console.log('in 3')
            //2. update the global.userToken the same way
          global.userToken.defaultTeam = data.team_uid;
        })

        .then(() =>{
          console.log('in 4')
          setIsLoading(false)
          navigation.navigate('Home', {team_uid:data.team_uid})
        })
      })
    })
    .catch((error) => {
      console.log("FIREBASE ERROR:" + error);
      setIsLoading(false);
  }) 


  //3. navigate to home, and have home reload to show the new team name

  //4. on home, you'll need to go to firestore to get the team name and description, and don't show the 'choose team' button.

}

const acceptInvite = (team_uid) =>{
  //1. update the Invite record for the user's uid and this team_uid for "active" to be true.
}

const renderTeams = () =>{
  console.log('in renderTeams, the dataSourceTeams.length is: ' + dataSourceTeams.length);
  tmpArr = []
  if (dataSourceTeams.length > 0){
    tmpArr.push(<Text style={styles.textH1}>My Teams</Text>)
  
    tmpArr.push(<Text style={styles.textBase}>Click to choose a team to work on below.  Long-press to edit the team.</Text>)        
    
    tmpArr.push(
    <FlatList
          data={dataSourceTeams}
          style={{ borderColor: '#eee', borderWidth:1, margin:5}}
          renderItem={({ item }) => (
              <ListItem
                    onPress={() => {chooseTeam(item)}}
                    chevron={true}
                    style={{ flex:1 }}
                  >
                  <Avatar large
                              rounded
                              title={`${item.teamName}`} 
                              containerStyle={{ backgroundColor: '#007AFF' }}/>                    
                  <ListItem.Content>
                      <ListItem.Title style={styles.teamListItem}>
                      {`${item.teamName}`}
                      </ListItem.Title>
                      <ListItem.Subtitle style={{ color: 'black' }}>
                      {`${item.teamDescription}`}
                      </ListItem.Subtitle>                                  
                  </ListItem.Content>
                  <ListItem.Chevron />
              </ListItem>                                 
          )}
          keyExtractor={(item, i) => item.team_uid + i}
        />   
    )      
  }else{
    //tmpArr.push(<Text>It looks like you have not accepted any team invites or created a team yet.</Text>)
  }
  return tmpArr
}

const renderInvites = () =>{
  tmpArr = []
  if (dataSourceInvites.length > 0){
    tmpArr.push(<Text style={styles.textH1}>My Invites</Text>)
    tmpArr.push(<Text style={styles.textBase}>Click to accept an Invite to join a team.</Text>)  
    tmpArr.push(
      <FlatList
      data={dataSourceInvites}
      style={{ borderColor: '#eee', borderWidth:1, margin:5}}
      renderItem={({ item }) => (
          <ListItem
                onPress={() => {acceptInvite(item.team_uid)}}
                chevron={true}
                style={{flex:1}}
              >
                <Avatar large
                              rounded
                              title={`${item.teamName}`} 
                              containerStyle={{ backgroundColor: '#007AFF' }}/> 
              <ListItem.Content>     
                  <ListItem.Title style={styles.teamListItem}>
                  {`${item.teamName}`}
                  </ListItem.Title>
                  <ListItem.Subtitle style={{ color: 'black' }}>
                  {`${item.teamDescription}`}
                  </ListItem.Subtitle>                                  
              </ListItem.Content>
              <ListItem.Chevron />
          </ListItem>                                 
      )}
      keyExtractor={(item) => item.team_uid.toString()}
    />   
    )      
  }else{
    //tmpArr.push(<Text>You do not have any invites yet...</Text>)
  }  
  return tmpArr
}

  if (isLoading) {
    return <ActivityIndicator />;
  }

    return (

      <ScrollView style={styles.container}>
        {renderTeams()}
        {renderInvites()}      
            

  
  
        <Text style={styles.textH1}>New Team</Text>
        <Text style={styles.textBase}>Create a new team by clicking below.</Text>  
        <Button
          style={styles.buttonBase}
          title="Create A Team"
          onPress={() => {
            navigation.navigate("Create A Team");
          }}
        />
      </ScrollView>
    );

}



export default TeamsScreen;

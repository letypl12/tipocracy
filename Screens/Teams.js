import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
} from "react-native";

import firestore from "@react-native-firebase/firestore";
import { useEffect, useState, useContext } from "react";
import styles from "../utils/styles";
import {ListItem, Button} from "react-native-elements"





function TeamsScreen({ route, navigation }) {
  const { reload } = route.params;
  const [dataSourceTeams, setDataSourceTeams] = useState([]);
  const [dataSourceInvites, setDataSourceInvites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let myInvites = []
  let myTeams = []

  useEffect(() => {
    const getData = async () => {
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
          console.log('dataSourceTeams: ' + JSON.stringify(dataSourceTeams));

          
          setIsLoading(false);
        })

    };

    getData();
  }, [reload]);

const chooseTeam = (team_uid) =>{
  //1. update the SecureStore userToken so the 'defaultTeam' is set to the team_uid
  //2. update the global.userToken the same way
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
  
    tmpArr.push(<Text style={styles.textBase}>Choose a team to work on below.</Text>)        
    
    tmpArr.push(
    <FlatList
          data={dataSourceTeams}
          style={{flex: 1, borderColor:'red', borderWidth:5}}
          renderItem={({ item }) => (
              <ListItem
                    onPress={() => {chooseTeam(item.team_uid)}}
                    chevron={true}
                    style={{ borderColor: 'red', borderWidth: 1 }}
                  >
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
    //tmpArr.push(<Text>It looks like you have not accepted any team invites or created a team yet.</Text>)
  }
  return tmpArr
}

const renderInvites = () =>{
  tmpArr = []
  if (dataSourceInvites.length > 0){
    tmpArr.push(<Text style={styles.textH1}>My Invites</Text>)
    tmpArr.push(<Text style={styles.textBase}>Accept an Invite to join a team.</Text>)  
    tmpArr.push(
      <FlatList
      data={dataSourceInvites}
      style={{flex: 1, borderColor:'red', borderWidth:5}}
      renderItem={({ item }) => (
          <ListItem
                onPress={() => {acceptInvite(item.team_uid)}}
                chevron={true}
                style={{ borderColor: 'red', borderWidth: 1 }}
              >
              <ListItem.Content>
                  
                  <ListItem.Title style={styles.teamListItem}>
                  {`${item.teamName}`}
                  </ListItem.Title>
                  <ListItem.Subtitle style={{ color: 'black' }}>
                  {`${item.creator_uid}`}
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

      <View style={styles.container}>
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
      </View>
    );

}



export default TeamsScreen;

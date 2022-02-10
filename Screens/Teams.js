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
  
  
  const [isLoading, setIsLoading] = useState(true);
  const [renderedTeams, setRenderedTeams] = useState([]);
  const [renderedInvites, setRenderedInvites] = useState([]);

  const [reloadDate, setReloadDate] = useState(reload)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Refreshed!');
      setReloadDate(Date.now())
    });
    return unsubscribe;
  }, [navigation]);  

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      console.log('in getData, checking records for:' + global.userToken.email);
      let myInvites = [];
      let myTeams = [];      
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

 
          renderTeams(myTeams);
          renderInvites(myInvites);
          console.log('Length of new teams object:' + myTeams.length);   
          console.log('TEAMS: ' + JSON.stringify(myTeams));
          console.log('INVITES: ' + JSON.stringify(myInvites));
 

          
          setIsLoading(false);
        })

    };

    getData();
  }, [reloadDate]);

const chooseTeam = async (data) => {
  console.log('in chooseTeam' + data.team_uid + global.userToken.uid + global.userToken.email + global.userToken.name);
  setIsLoading(true);
  //1a. Update firestore Users record
    firestore()
    .collection("Users")
    .doc(global.userToken.uid)
    .update({
        name: global.userToken.name,
        email: global.userToken.email,
        defaultTeam: data.team_uid,
    })



    .then(async () => {
        //1b. update the SecureStore userToken so the 'defaultTeam' is set to the team_uid
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
        //2. save teamname and description as well in global and create a new teamToken to restore a user that is remember-me.
        global.teamToken = data;
        SecureStore.setItemAsync('teamToken', JSON.stringify(data))
   
        .then(() => {
          console.log('in 3')
          //3. update the global.userToken the same way
          global.userToken.defaultTeam = data.team_uid;
        })

        .then(() =>{
          //4. navigate to home, and have home reload to show the new team name
          console.log('in 4')
          setIsLoading(false)
          navigation.navigate('Home', {teamTokenFromRoute:data})
        })
      })
    })
    .catch((error) => {
      console.log("FIREBASE ERROR:" + error);
      setIsLoading(false);
  }) 
}

const acceptInvite = (team_uid) =>{
  //1. update the Invite record for the user's uid and this team_uid for "active" to be true.
  firestore()
  .collection("Invites")
  .where("email", "==", global.userToken.email)
  .where("team_uid", "==", team_uid)
  .get()
  .then((querySnapshot) => {
    console.log("Firestore accepting # of invites: ", querySnapshot.size);

    querySnapshot.forEach((documentSnapshot) => {
      let docRef = (documentSnapshot.id)
      firestore()
      .collection("Invites")
      .doc(docRef)
      .update({
          active: true,
       })

    });
  });
  let myDate = Date.now()
  console.log('mydate:' + myDate);
  setReloadDate(myDate);

}

const renderTeams = (myTeams) =>{
  console.log('in renderTeams, the myTeams.length is: ' + myTeams.length);
  tmpArr = []
  if (myTeams.length > 0){
    tmpArr.push(<Text style={styles.textH1}>My Teams</Text>)
  
    tmpArr.push(<Text style={styles.textBase}>Click to choose a team to work on below.</Text>)        
    
    tmpArr.push(
    <FlatList
          data={myTeams}
          style={{ borderColor: '#eee', borderWidth:1, margin:5}}
          renderItem={({ item }) => (
              <ListItem
                    bottomDivider
                    onPress={() => {chooseTeam(item)}}
                    chevron={true}
                    style={{ flex:1 }}
                  >
                  <Avatar large
                              rounded
                              title={`${item.teamName}`} 
                              containerStyle={{ backgroundColor: '#FFE500', borderColor:'#eee', borderWidth:1 }}/>                    
                  <ListItem.Content>
                      <ListItem.Title style={styles.teamListItem}>
                      {`${item.teamName}`}
                      </ListItem.Title>
                      <ListItem.Subtitle style={{ color: 'black' }}>
                      {`${item.teamDescription}`}
                      </ListItem.Subtitle>       
                      <ListItem.ButtonGroup
                        buttons={item.creator_uid==global.userToken.uid ? ['Choose', 'Edit'] : ['Choose']}
                        onPress={(index) => {
                                            if (index == 0){
                                              chooseTeam(item)
                                            }else{
                                              navigation.navigate("TeamsEdit", {myTeam:item})
                                            }
                                          }
                                }
                      />                           
                  </ListItem.Content>
              </ListItem>                                 
          )}
          keyExtractor={(item, i) => item.team_uid + i}
        />   
    )      
  }else{
    //tmpArr.push(<Text>It looks like you have not accepted any team invites or created a team yet.</Text>)
  }
  setRenderedTeams(tmpArr);
}

const renderInvites = (myInvites) =>{
  console.log('in renderInvites, myInvites.length:' + myInvites.length);
  tmpArr = []
  if (myInvites.length > 0){
    tmpArr.push(<Text style={styles.textH1}>My Invites</Text>)
    tmpArr.push(<Text style={styles.textBase}>Click to accept an Invite to join a team.</Text>)  
    tmpArr.push(
      <FlatList
      data={myInvites}
      style={{ borderColor: '#eee', borderWidth:1, margin:5}}
      renderItem={({ item }) => (
          <ListItem
                bottomDivider
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
  setRenderedInvites(tmpArr)
}

  if (isLoading) {
    return <ActivityIndicator />;
  }

    return (

      <View style={styles.container}>
        {renderedTeams}
        {renderedInvites}      
              
        <Text style={styles.textH1}>New Team</Text>
        <Text style={styles.textBase}>Create a new team by clicking below.</Text>  
        <Button
          buttonStyle={styles.buttonBase}
          titleStyle={{ fontWeight: 'bold', fontSize: 18, color:'#000' }}
          title="Create A Team"
          onPress={() => {
            navigation.navigate("Create A Team");
          }}
        />
      </View>
    );

}



export default TeamsScreen;

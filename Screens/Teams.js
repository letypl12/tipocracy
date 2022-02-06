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





function TeamsScreen({ navigation }) {

  // const testData = [
  //   {teamName:"Tester",team_uid:"Teams1",creator_uid:"fwLz9DnrWOSiPigLFDqBco0b9De2"},
  //   {teamName:"Tester2",team_uid:"Teams12",creator_uid:"fwLz9DnrWOSiPigLFDqBco0b9De2"},
  // ]
  const testData = [{"teamName":"Tester","team_uid":"Teams1","creator_uid":"fwLz9DnrWOSiPigLFDqBco0b9De2"},{"teamName":"Test 1","team_uid":"Teams","creator_uid":"fwLz9DnrWOSiPigLFDqBco0b9De2"}];
  const [dataSourceTeams, setDataSourceTeams] = useState(testData);
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
                              team_uid: documentSnapshot.get("team_uid"),
                              creator_uid: documentSnapshot.get("creator_uid")
                            }
              myTeams.push(tmpTeam)
              setDataSourceTeams((oldArray) => [tmpTeam, ...oldArray]);                          
            }else{
              console.log('there is an invite');
              myInvites.push({
                teamName: documentSnapshot.get("teamName"),
                team_uid: documentSnapshot.get("team_uid"),
                creator_uid: documentSnapshot.get("creator_uid")
              })
            }
          });
          // 
          // setDataSourceInvites((oldArray) => [myInvites, ...oldArray]);

          setDataSourceTeams(myTeams);    
          console.log('Length of new teams object:' + myTeams.length);   
          console.log('TEAMS: ' + JSON.stringify(myTeams));
          console.log('dataSourceTeams: ' + JSON.stringify(dataSourceTeams));
          //{teamName:'test', team_uid:'test1', creator_uid:'asdf'}
          
          setIsLoading(false);
        })

    };

    getData();
  }, []);





  if (isLoading) {
    return <ActivityIndicator />;
  }

    return (

      <View style={{flex:1}}>
          <Text>My Teams</Text>        
  
          <Text>Choose a team to work on below.</Text>        
          

          <FlatList
                data={dataSourceTeams}
                style={{flex: 1, borderColor:'red', borderWidth:5}}
                renderItem={({ item }) => (
                    <ListItem
                          onPress={() => {alert(item.team_uid)}}
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

  
  
  
  
        <Button
          title="Create A Team"
          onPress={() => {
            navigation.navigate("Create A Team");
          }}
        />
      </View>
    );

}



export default TeamsScreen;

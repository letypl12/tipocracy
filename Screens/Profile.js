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

import { AuthContext } from "../utils/authContext";
import { useEffect, useState, useContext } from "react";
import styles from "../utils/styles";
import {ListItem, Button, Input} from "react-native-elements"
import auth from "@react-native-firebase/auth";
import * as SecureStore from "expo-secure-store";
import { BigHead } from 'react-native-bigheads'
import Ionicons from "react-native-vector-icons/Ionicons";

function ProfileScreen({ route, navigation }) {
  const { reload } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [ProfileErrors, setProfileErrors] = useState({});
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pronouns, setPronouns] = useState('');


  const avatarOptions = [
    {
        title: 'Hair', 
        name:'hair', 
        setFunc: 'setHair', 
        optionsName: 'hairOptions', 
        expandedName: 'hairExpanded', 
        expandedFunc: 'setHairExpanded',
        options: ['none', 'long', 'bun', 'short', 'pixie', 'balding', 'buzz', 'afro', 'bob', 'mohawk']
    },
    {
        title: 'Hair Color', 
        name:'hairColor', 
        setFunc: 'setHairColor', 
        optionsName: 'hairColorOptions', 
        expandedName: 'hairColorExpanded', 
        expandedFunc: 'sethairColorExpanded',
        options: ['blonde', 'orange', 'black', 'white', 'brown', 'blue', 'pink']
    },
    {
        title: 'Accessories', 
        name:'accessory', 
        setFunc: 'setAccessory', 
        optionsName: 'acessoryOptions', 
        expandedName: 'accessoryExpanded', 
        expandedFunc: 'setAccessoryExpanded',
        options: ['none', 'roundGlasses', 'tinyGlasses', 'shades', 'faceMask', 'hoopEarrings']
    },
    {
        title: 'Clothes', 
        name:'clothing', 
        setFunc: 'setClothing', 
        optionsName: 'clothingOptions', 
        expandedName: 'clothingExpanded', 
        expandedFunc: 'setClothingExpanded',
        options: ['naked', 'shirt', 'dressShirt', 'vneck', 'tankTop', 'dress', 'denimJacket', 'hoodie', 'chequeredShirt', 'chequeredShirtDark']
    },
    {
        title: 'Eyes', 
        name:'eyes', 
        setFunc: 'setEyes', 
        optionsName: 'eyesOptions', 
        expandedName: 'eyesExpanded', 
        expandedFunc: 'setEyesExpanded',
        options: ['normal', 'leftTwitch', 'happy', 'content', 'squint', 'simple', 'dizzy', 'wink', 'hearts', 'crazy', 'cute', 'dollars', 'stars', 'cyborg', 'simplePatch', 'piratePatch']
    },
]

  const hairOptions = ['none', 'long', 'bun', 'short', 'pixie', 'balding', 'buzz', 'afro', 'bob', 'mohawk'];
  const [hair, setHair] = useState('none');
  const [hairExpanded, setHairExpanded] = useState(false);
  
  const hairColorOptions = ['blonde', 'orange', 'black', 'white', 'brown', 'blue', 'pink'];
  const [hairColor, setHairColor] = useState('orange');
  const [hairColorExpanded, setHairColorExpanded] = useState(false);

  const accessoryOptions = ['none', 'roundGlasses', 'tinyGlasses', 'shades', 'faceMask', 'hoopEarrings'];
  const [accessory, setAccessory] = useState('none');
  const [accessoryExpanded, setAccessoryExpanded] = useState(false);

  const clothingOptions = ['naked', 'shirt', 'dressShirt', 'vneck', 'tankTop', 'dress', 'denimJacket', 'hoodie', 'chequeredShirt', 'chequeredShirtDark'];
  const [clothing, setClothing] = useState('none');
  const [clothingExpanded, setClothingExpanded] = useState(false);
  
  const eyesOptions = ['normal', 'leftTwitch', 'happy', 'content', 'squint', 'simple', 'dizzy', 'wink', 'hearts', 'crazy', 'cute', 'dollars', 'stars', 'cyborg', 'simplePatch', 'piratePatch'];
  const [eyes, setEyes] = useState('normal');
  const [eyesExpanded, setEyesExpanded] = useState(false);

  useEffect(() => {
      setIsLoading(false);
    // const getData = async () => {
    //   console.log('in getData, checking records for:' + global.userToken.email);
    //   firestore()
    //     .collection("Invites")
    //     .where("email", "==", global.userToken.email)
    //     .get()
    //     .then((querySnapshot) => {
    //       console.log("Firestore Total Teams: ", querySnapshot.size);

    //       querySnapshot.forEach((documentSnapshot) => {
    //         if (documentSnapshot.get("active") == true){
    //           let tmpTeam = {
    //                           teamName: documentSnapshot.get("teamName"),
    //                           teamDescription: documentSnapshot.get("teamDescription"),
    //                           team_uid: documentSnapshot.get("team_uid"),
    //                           creator_uid: documentSnapshot.get("creator_uid")
    //                         }
    //           myTeams.push(tmpTeam)
    //           setDataSourceTeams((oldArray) => [tmpTeam, ...oldArray]);                          
    //         }else{
    //           console.log('there is an invite');
    //           myInvites.push({
    //             teamName: documentSnapshot.get("teamName"),
    //             teamDescription: documentSnapshot.get("teamDescription"),
    //             team_uid: documentSnapshot.get("team_uid"),
    //             creator_uid: documentSnapshot.get("creator_uid")
    //           })
    //         }
    //       });
    //       // 
    //       // setDataSourceInvites((oldArray) => [myInvites, ...oldArray]);

    //       setDataSourceTeams(myTeams);  
    //       setDataSourceInvites(myInvites);  
    //       console.log('Length of new teams object:' + myTeams.length);   
    //       console.log('TEAMS: ' + JSON.stringify(myTeams));
    //       console.log('INVITES: ' + JSON.stringify(myInvites));
    //       console.log('dataSourceTeams: ' + JSON.stringify(dataSourceTeams));

          
    //       setIsLoading(false);
    //     })

    // };

    // getData();
  }, [reload]);

 const saveProfile = () =>{
    console.log('in saveProfile');
    setIsLoading(true); 
    // ToDo
    //1. save the firebase auth changes (ie: password, name, email)
    //2. Save the profile in firestore profile (pronouns, phone, avatar)
    //3. create a global.profile object to use on the home page and elsewhere we want the avatar.

    
     alert('Profile Saved')
     setIsLoading(false);
     navigation.navigate('Home')
 }

 const renderHairOptions = () =>{
     let tmpArr = []
     hairOptions.map((myThing) =>{
        tmpArr.push(
            <Button title={myThing} onPress={()=>setHair(myThing)}  buttonStyle={styles.buttonSmall} />
        )
     })
     return tmpArr
 }
 const renderHairColorOptions = () =>{
    let tmpArr = []
    hairColorOptions.map((myThing) =>{
       tmpArr.push(
           <Button title={myThing} onPress={()=>setHairColor(myThing)}  buttonStyle={styles.buttonSmall} />
       )
    })
    return tmpArr
}

const expandThis = (action, myThing, myThingFunc) =>{
    if (action == 'check'){
        return({myThing}) 
    }else{
        //it is expando press
        // eval(`$myThingFunc(!{`myThing``})`);
    }

}
  if (isLoading) {
    return <ActivityIndicator />;
  }

    return (

      <ScrollView style={styles.container}>


        <Text style={styles.textH1}>Login Info</Text>


        <Text style={styles.textH1}>Personal Info</Text>
            <Input
            label={"Phone"}
            placeholder="(555) 555-1212"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType='phone-pad'
            errorStyle={{ color: "red" }}
            errorMessage={ProfileErrors ? ProfileErrors.phone : null}
            />
            <Input
            label={"Pronouns"}
            placeholder="they/them"
            value={pronouns}
            onChangeText={setPronouns}
            keyboardType='default'
            errorStyle={{ color: "red" }}
            errorMessage={ProfileErrors ? ProfileErrors.pronouns : null}
            />

        <View style={{flexDirection:'row'}}>
            <View style={{flex:.5, flexDirection:'column'}}>
                <Text style={styles.textH1}>Avatar</Text>
                {/* {
                    avatarOptions.map((avatarOption, i) => (
                        <ListItem.Accordion
                            isExpanded={expandThis('check', avatarOption.expandedName)}
                            onPress={() => {expandThis('press', avatarOption.expandedName, avatarOption.expandedFunc)}}
                            content={
                                <>
                                <ListItem.Content>
                                    <ListItem.Title>{avatarOption.title}</ListItem.Title>
                                </ListItem.Content>
                                </>
                            }
                        >

                    
                            {avatarOption.options.map((myThing, i) => (
                                    <ListItem 
                                        key={avatarOption.name+i} 
                                        onPress={()=>{avatarOption.setFunc(myThing)}} 
                                        bottomDivider
                                    >
                                    <ListItem.Content>
                                        <ListItem.Title>{myThing}</ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Chevron />
                                    </ListItem>
                            ))}                

                        </ListItem.Accordion> 
                    )
                    )} */}
                <ListItem.Accordion
                isExpanded={hairExpanded}
                onPress={() => {setHairExpanded(!hairExpanded); }}
                content={
                    <>
                      <ListItem.Content>
                        <ListItem.Title>Hair</ListItem.Title>
                      </ListItem.Content>
                    </>
                  }
                >
                {hairOptions.map((myThing, i) => (
                    <ListItem key={i} onPress={()=>setHair(myThing)} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{myThing}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                    </ListItem>
                ))}
                </ListItem.Accordion>

                <ListItem.Accordion
                isExpanded={hairColorExpanded}
                onPress={() => {setHairColorExpanded(!hairColorExpanded); }}
                content={
                    <>
                      <ListItem.Content>
                        <ListItem.Title>Hair Color</ListItem.Title>
                      </ListItem.Content>
                    </>
                  }
                >
                {hairColorOptions.map((myThing, i) => (
                    <ListItem key={i} onPress={()=>setHairColor(myThing)} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{myThing}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                    </ListItem>
                ))}
                </ListItem.Accordion>      

                <ListItem.Accordion
                isExpanded={accessoryExpanded}
                onPress={() => {setAccessoryExpanded(!accessoryExpanded); }}
                content={
                    <>
                      <ListItem.Content>
                        <ListItem.Title>Accessory</ListItem.Title>
                      </ListItem.Content>
                    </>
                  }
                >
                {accessoryOptions.map((myThing, i) => (
                    <ListItem key={i} onPress={()=>setAccessory(myThing)} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{myThing}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                    </ListItem>
                ))}
                </ListItem.Accordion>    

                <ListItem.Accordion
                isExpanded={clothingExpanded}
                onPress={() => {setClothingExpanded(!clothingExpanded); }}
                content={
                    <>
                      <ListItem.Content>
                        <ListItem.Title>Clothing</ListItem.Title>
                      </ListItem.Content>
                    </>
                  }
                >
                {clothingOptions.map((myThing, i) => (
                    <ListItem key={i} onPress={()=>setClothing(myThing)} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{myThing}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                    </ListItem>
                ))}
                </ListItem.Accordion>                                   

            </View>
            <View style={{flex:.5, flexDirection:'column'}}>
                <BigHead
                    accessory={accessory}
                    bgColor="blue"
                    bgShape="circle"
                    body="breasts"
                    clothing={clothing}
                    clothingColor="black"
                    eyebrows="raised"
                    eyes="cute"
                    facialHair="none"
                    graphic="rainbow"
                    hair={hair}
                    hairColor={hairColor}
                    hat="none"
                    hatColor="green"
                    lashes={true}
                    lipColor="purple"
                    mouth="open"
                    showBackground={true}
                    size={200}
                    skinTone="brown"
                />                
            </View>            
        </View>




        <Button
          style={styles.buttonBase}
          title="Save"
          onPress={saveProfile}
        />
      </ScrollView>
    );

}



export default ProfileScreen;

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


  // Avatar variables
  const [hair, setHair] = useState('none');
  const [hairExpanded, setHairExpanded] = useState(false);
  
  const [hairColor, setHairColor] = useState('orange');
  const [hairColorExpanded, setHairColorExpanded] = useState(false);

  const [accessory, setAccessory] = useState('none');
  const [accessoryExpanded, setAccessoryExpanded] = useState(false);

  const [clothing, setClothing] = useState('none');
  const [clothingExpanded, setClothingExpanded] = useState(false);

  const [clothingColor, setClothingColor] = useState('white');
  const [clothingColorExpanded, setClothingColorExpanded] = useState(false);  
  
  const [eyes, setEyes] = useState('normal');
  const [eyesExpanded, setEyesExpanded] = useState(false);

  const [body, setBody] = useState('breasts');
  const [bodyExpanded, setBodyExpanded] = useState(false);

  const [graphic, setGraphic] = useState('rainbow');
  const [graphicExpanded, setGraphicExpanded] = useState(false);

  const [skinTone, setSkinTone] = useState('brown');
  const [skinToneExpanded, setSkinToneExpanded] = useState(false);

  const [mouth, setMouth] = useState('grin');
  const [mouthExpanded, setMouthExpanded] = useState(false);

  const [lipColor, setLipColor] = useState('pink');
  const [lipColorExpanded, setLipColorExpanded] = useState(false);
  
  const avatarOptions = [
    {
        title: 'Hair', 
        name:hair, 
        setFunc: setHair, 
        expandedName: hairExpanded, 
        expandedFunc: setHairExpanded,
        options: ['none', 'long', 'bun', 'short', 'pixie', 'balding', 'buzz', 'afro', 'bob', 'mohawk']
    },
    {
        title: 'Hair Color', 
        name:hairColor, 
        setFunc: setHairColor, 
        expandedName: hairColorExpanded, 
        expandedFunc: setHairColorExpanded,
        options: ['blonde', 'orange', 'black', 'white', 'brown', 'blue', 'pink']
    },
    {
        title: 'Accessories', 
        name:accessory, 
        setFunc: setAccessory, 
        expandedName: accessoryExpanded, 
        expandedFunc: setAccessoryExpanded,
        options: ['none', 'roundGlasses', 'tinyGlasses', 'shades', 'faceMask', 'hoopEarrings']
    },
    {
        title: 'Clothes', 
        name:clothing, 
        setFunc: setClothing, 
        expandedName: clothingExpanded, 
        expandedFunc: setClothingExpanded,
        options: ['naked', 'shirt', 'dressShirt', 'vneck', 'tankTop', 'dress', 'denimJacket', 'hoodie', 'chequeredShirt', 'chequeredShirtDark']
    },
    {
        title: 'Clothing Color', 
        name:clothingColor, 
        setFunc: setClothingColor, 
        expandedName: clothingColorExpanded, 
        expandedFunc: setClothingColorExpanded,
        options: ['white', 'blue', 'black', 'green', 'red']
    },    
    {
        title: 'Eyes', 
        name:eyes, 
        setFunc: setEyes, 
        expandedName: eyesExpanded, 
        expandedFunc: setEyesExpanded,
        options: ['normal', 'leftTwitch', 'happy', 'content', 'squint', 'simple', 'dizzy', 'wink', 'hearts', 'crazy', 'cute', 'dollars', 'stars', 'cyborg', 'simplePatch', 'piratePatch']
    },
    {
        title: 'Body', 
        name:body, 
        setFunc: setBody, 
        expandedName: bodyExpanded, 
        expandedFunc: setBodyExpanded,
        options: ['chest', 'breasts']
    },
    {
        title: 'Shirt Graphic', 
        name:graphic, 
        setFunc: setGraphic, 
        expandedName: graphicExpanded, 
        expandedFunc: setGraphicExpanded,
        options: ['none', 'redwood', 'gatsby', 'vue', 'react', 'graphQL', 'donut', 'rainbow']
    },    
    {
        title: 'Skin Tone', 
        name:skinTone, 
        setFunc: setSkinTone, 
        expandedName: skinToneExpanded, 
        expandedFunc: setSkinToneExpanded,
        options: ['light', 'yellow', 'brown', 'dark', 'red', 'black']
    },   
    {
        title: 'Mouth', 
        name:mouth, 
        setFunc: setMouth, 
        expandedName: mouthExpanded, 
        expandedFunc: setMouthExpanded,
        options: ['grin', 'sad', 'openSmile', 'lips', 'open', 'serious', 'tongue', 'piercedTongue', 'vomitingRainbow' ]
    },
    {
        title: 'Lip Color', 
        name:lipColor, 
        setFunc: setLipColor, 
        expandedName: lipColorExpanded, 
        expandedFunc: setLipColorExpanded,
        options: ['red', 'purple', 'pink', 'turqoise', 'green' ]
    },    
    
]



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
            key={"phone"}
            />
            <Input
            label={"Pronouns"}
            placeholder="they/them"
            value={pronouns}
            onChangeText={setPronouns}
            keyboardType='default'
            errorStyle={{ color: "red" }}
            errorMessage={ProfileErrors ? ProfileErrors.pronouns : null}
            key={"pronouns"}
            />

        <View style={{flexDirection:'row'}}>
            <View style={{flex:.5, flexDirection:'column'}}>
                <Text style={styles.textH1}>Avatar</Text>
                {
                    avatarOptions.map((avatarOption, i) => (
                        <ListItem.Accordion
                            key={avatarOption.name + i}
                            isExpanded={avatarOption.expandedName}
                            onPress={() => {avatarOption.expandedFunc(!avatarOption.expandedName)}}
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
                    ))
                }


            </View>
            <View style={{flex:.5, flexDirection:'column'}}>
                <BigHead
                    accessory={accessory}

                    body={body}
                    clothing={clothing}
                    clothingColor={clothingColor}

                    eyes={eyes}

                    graphic={graphic}
                    hair={hair}
                    hairColor={hairColor}

                    lashes={true}
                    lipColor={lipColor}
                    mouth={mouth}
                    showBackground={true}
                    size={200}
                    skinTone={skinTone}
                    hat="none"
                    hatColor="green"
                    facialHair="none"       
                    eyebrows="raised"   
                    bgColor="blue"
                    bgShape="circle"                                                  
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

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
import firestore from "@react-native-firebase/firestore";

function ProfileScreen({ route, navigation }) {
    console.log(JSON.stringify(global.userToken));
  const { reload } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [ProfileErrors, setProfileErrors] = useState({});
  const [phoneNumber, setPhoneNumber] = useState(global.userToken.phone ? global.userToken.phone : '');
  const [pronouns, setPronouns] = useState(global.userToken.pronouns ? global.userToken.pronouns : '');

  //set the defaults for the avatar values using the existing user token, or
  //if that does not exist, give them some fun defaults.
  let userTokenAvatarObj = {
    hair:'afro',
    hairColor:'brown',
    accessory:'none',
    clothing:'none',
    clothingColor:'white',
    eyes:'normal',
    eyebrows: 'raised',
    body:'breasts',
    graphic:'rainbow',
    skinTone:'brown',
    mouth:'grin',
    lipColor:'pink',
    facialHair:'none'
    }
  if (global.userToken.avatarObj){
    userTokenAvatarObj = global.userToken.avatarObj;
  };

  // Avatar variables
  const [hair, setHair] = useState(userTokenAvatarObj.hair);
  const [hairExpanded, setHairExpanded] = useState(false);
  
  const [hairColor, setHairColor] = useState(userTokenAvatarObj.hairColor);
  const [hairColorExpanded, setHairColorExpanded] = useState(false);

  const [accessory, setAccessory] = useState(userTokenAvatarObj.accessory);
  const [accessoryExpanded, setAccessoryExpanded] = useState(false);

  const [clothing, setClothing] = useState(userTokenAvatarObj.clothing);
  const [clothingExpanded, setClothingExpanded] = useState(false);

  const [clothingColor, setClothingColor] = useState(userTokenAvatarObj.clothingColor);
  const [clothingColorExpanded, setClothingColorExpanded] = useState(false);  
  
  const [eyes, setEyes] = useState(userTokenAvatarObj.eyes);
  const [eyesExpanded, setEyesExpanded] = useState(false);
  
  const [eyeLashes, setEyeLashes] = useState(userTokenAvatarObj.eyes);
  const [eyeLashesExpanded, setEyeLashesExpanded] = useState(false);

  const [eyebrows, setEyebrows] = useState(userTokenAvatarObj.eyebrows);
  const [eyebrowsExpanded, setEyebrowsExpanded] = useState(false);  

  const [body, setBody] = useState(userTokenAvatarObj.body);
  const [bodyExpanded, setBodyExpanded] = useState(false);

  const [graphic, setGraphic] = useState(userTokenAvatarObj.graphic);
  const [graphicExpanded, setGraphicExpanded] = useState(false);

  const [skinTone, setSkinTone] = useState(userTokenAvatarObj.skinTone);
  const [skinToneExpanded, setSkinToneExpanded] = useState(false);

  const [mouth, setMouth] = useState(userTokenAvatarObj.mouth);
  const [mouthExpanded, setMouthExpanded] = useState(false);

  const [lipColor, setLipColor] = useState(userTokenAvatarObj.lipColor);
  const [lipColorExpanded, setLipColorExpanded] = useState(false);
  
  const [facialHair, setFacialHair] = useState(userTokenAvatarObj.facialHair);
  const [facialHairExpanded, setFacialHairExpanded] = useState(false);


  const avatarOptions = [
    
    {
        title: 'Body', 
        name:body, 
        setFunc: setBody, 
        expandedName: bodyExpanded, 
        expandedFunc: setBodyExpanded,
        options: ['chest', 'breasts']
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
        title: 'Eye Lashes', 
        name:eyeLashes, 
        setFunc: setEyeLashes, 
        expandedName: eyeLashesExpanded, 
        expandedFunc: setEyeLashesExpanded,
        options: ['true', 'false']
    },        
    {
        title: 'Eyebrows', 
        name:eyebrows, 
        setFunc: setEyebrows, 
        expandedName: eyebrowsExpanded, 
        expandedFunc: setEyebrowsExpanded,
        options: ['raised', 'leftLowered', 'serious', 'angry', 'concerned']
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
    {
        title: 'Facial Hair', 
        name:facialHair, 
        setFunc: setFacialHair, 
        expandedName: facialHairExpanded, 
        expandedFunc: setFacialHairExpanded,
        options: ['none', 'stubble', 'mediumBeard', 'goatee']
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
        title: 'Shirt Graphic', 
        name:graphic, 
        setFunc: setGraphic, 
        expandedName: graphicExpanded, 
        expandedFunc: setGraphicExpanded,
        options: ['none', 'redwood', 'gatsby', 'vue', 'react', 'graphQL', 'donut', 'rainbow']
    },      

    {
        title: 'Accessories', 
        name:accessory, 
        setFunc: setAccessory, 
        expandedName: accessoryExpanded, 
        expandedFunc: setAccessoryExpanded,
        options: ['none', 'roundGlasses', 'tinyGlasses', 'shades', 'faceMask', 'hoopEarrings']
    },    
]



  useEffect(() => {
      setIsLoading(false);
  
  }, [reload]);

 const saveProfile = () =>{
    console.log('in saveProfile');
    setIsLoading(true); 
    // ToDo
    //1. save the firebase auth changes (ie: password, name, email)
    //2. Save the profile in firestore profile (pronouns, phone, avatar)
    //3. create a global.profile object to use on the home page and elsewhere we want the avatar.

    let newUserObj = {
        uid: global.userToken.uid,
        email: global.userToken.email,
        name: global.userToken.name,
        defaultTeam: global.userToken.defaultTeam,
        phone: phoneNumber,
        pronouns: pronouns,
        avatarObj: {
            hair:hair,
            hairColor:hairColor,
            accessory:accessory,
            clothing:clothing,
            clothingColor:clothingColor,
            eyes:eyes,
            eyeLashes:eyeLashes,
            eyebrows: eyebrows,
            body:body,
            graphic:graphic,
            skinTone:skinTone,
            mouth:mouth,
            lipColor:lipColor,
            facialHair:facialHair
        }

    }

    console.log('==== New Object for the user is: ' + JSON.stringify(newUserObj));
    firestore()
    .collection("Users")
    .doc(global.userToken.uid)
    .update(newUserObj)
    .then( () => {
        SecureStore.setItemAsync('userToken', JSON.stringify(newUserObj))
        .then(() =>{
            console.log('in 1')
            global.userToken = newUserObj;
        })
        .then(() =>{
            //4. navigate to home, and have home reload to show the new team name
            console.log('in 4')
            setIsLoading(false)
            alert('Profile Saved')
        })
      })
    
    .catch((error) => {
      console.log("FIREBASE ERROR:" + error);
      alert('There was an error.  Please try again later.')
      setIsLoading(false);    
    }) 
 }



  if (isLoading) {
    return <ActivityIndicator />;
  }

    return (

      <ScrollView style={styles.container}>



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
                                        onPress={()=>{avatarOption.setFunc(myThing)
                                                    avatarOption.expandedFunc(!avatarOption.expandedName)
                                          }} 
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
            <View style={{flex:.5, flexDirection:'column', alignItems:'flex-start'}}>
                <BigHead
                    accessory={accessory}
                    body={body}
                    clothing={clothing}
                    clothingColor={clothingColor}
                    eyes={eyes}
                    eyebrows={eyebrows}  
                    graphic={graphic}
                    hair={hair}
                    hairColor={hairColor}
                    lashes={eyeLashes=='true'?true:false}
                    lipColor={lipColor}
                    mouth={mouth}
                    showBackground={true}
                    size={200}
                    skinTone={skinTone}
                    facialHair={facialHair}   
                    hat="none"
                    hatColor="green"                     
                    bgColor="blue"
                    bgShape="squircle"                                                  
                />                
            </View>            
        </View>




        <Button
          buttonStyle={[styles.buttonBase, {marginTop:10}]}
          titleStyle={{ fontWeight: 'bold', fontSize: 18, color:'#000' }}
          title="Save"
          onPress={saveProfile}
        />
      </ScrollView>
    );

}



export default ProfileScreen;

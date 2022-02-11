import React, { useEffect, useState, useContext } from 'react';
import { validateAll } from 'indicative/validator';

import {
    CheckBox, 
    Input,
    Card,
    FormValidationMessage,
    Button,
} from 'react-native-elements';
import {
    ActivityIndicator,
    Image,
    Text,
    View,
    TouchableOpacity,
  } from "react-native";

import { AuthContext } from '../utils/authContext';
import auth from '@react-native-firebase/auth';
import * as SecureStore from "expo-secure-store";
import * as Icons from "react-native-vector-icons";
import styles from "../utils/styles";
import firestore from "@react-native-firebase/firestore";

const SignInScreen = ({ navigation }) => {
    const [emailAddress, setemailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [SignUpErrors, setSignUpErrors] = useState({});
    const [rememberMe, setRememberMe] = useState(false);

    const { signIn, signUp } = useContext(AuthContext);

    const handleSignIn = () => {
        // https://indicative.adonisjs.com
        const rules = {
            email: 'required|email',
            password: 'required|string|min:6|max:40'
        };

        const data = {
            email: emailAddress,
            password: password
        };

        const messages = {
            required: field => `${field} is required`,
            'username.alpha': 'Username contains unallowed characters',
            'email.email': 'Please enter a valid email address',
            'password.min': 'Wrong Password?'
        };

        validateAll(data, rules, messages)
            .then(async () => {

                await firebaseSignIn(data);
                // signIn({ emailAddress, password });
            })
            .catch(err => {
                console.log('caught:' + JSON.stringify(err));
                const formatError = {};
                for (let myErr of err) {

                    formatError[myErr.field] = myErr.message;
                };
                setSignUpErrors(formatError);
            });
    };



    const firebaseSignIn = async (data) => {
        console.log('in firebaseSignIn' + data.email + data.password);
        auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then(async () =>{
            
            let myUser = auth().currentUser;
            console.log('The user\'s ID is: ' + myUser.uid);

            firestore()
            .collection("Users")
            .doc(myUser.uid)
            .get()
            .then(async (documentSnapshot) => {
                
                
                  const data = documentSnapshot.data();
                  //console.log(documentSnapshot.id, data);
                
                //Note: we use the myUser.uid to set the userToken because some old user accounts
                //      did not have uid as a separate field in the record itself.
                const userToken = {
                    uid: myUser.uid,
                    email: data.email,
                    name: data.name,
                    defaultTeam: data.defaultTeam,
                    phone: data.phone,
                    pronouns: data.pronouns,
                    avatarObj: data.avatarObj
                }

                console.log('=====newUserObj=====' + JSON.stringify(userToken))

                if (rememberMe){
                    await SecureStore.setItemAsync('userToken', JSON.stringify(userToken))
                    
                }
                
                global.userToken = userToken;
                console.log('User account signed in!  Dispatching to protected route/screen.');
                signIn({ emailAddress, password, userToken }); 

              })
            .catch(err => {
            console.log('Error getting documents', err);
            });


            

                           
        })               
        .catch(error => {
            const formatError = {};
            console.log('FIREBASE ERROR:' + error);
            if (error.code === 'auth/email-already-in-use') {
                formatError['email'] = 'That email address is already in use!';
            }

            if (error.code === 'auth/invalid-email') {
                formatError['email'] = 'That email address is invalid!';
            }   
            if (error.code === 'auth/wrong-password') {
                formatError['password'] = 'Incorrect password.';
            }                         
            
            setSignUpErrors(formatError);                            
            return false
        });

          
    }

    useEffect(() => {}, [SignUpErrors]);  
    return (
        <View style={{flex:1, backgroundColor:'#FFE500'}}>
                <View style={{alignItems:'center'}}>
                    <Image resizeMode='contain' source={require('../images/tipocracy_logo.png')} style={{width:300, height:100}} />
                </View>
            <Card title="Sign In">

                <Input
                    label={'Email'}
                    placeholder="Email"
                    autoCapitalize="none"
                    keyboardType='email-address'
                    value={emailAddress}
                    onChangeText={setemailAddress}
                    errorStyle={{ color: 'red' }}
                    errorMessage={SignUpErrors ? SignUpErrors.email : null}
                    leftIcon={
                        <Icons.Fontisto
                          name='email'
                          size={24}
                          color='black'
                        />
                      }
                />
                <Input
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    errorStyle={{ color: 'red' }}
                    errorMessage={SignUpErrors ? SignUpErrors.password : null}
                    leftIcon={
                        <Icons.Ionicons
                          name='lock-closed-outline'
                          size={24}
                          color='black'
                        />
                      }
                />
                <CheckBox
                    center
                    title="Remember Me"
                    checked={rememberMe}
                    onPress={() => setRememberMe(!rememberMe)}
                />

                <Button
                    buttonStyle={styles.buttonBase}
                    title="Sign in"
                    onPress={() => handleSignIn()}
                    titleStyle={{ fontWeight: 'bold', fontSize: 18, color:'#000' }}
                />
                <Text style={{ marginLeft: 100 }} onPress={() => signUp()}>
                    No Acount? Sign Up
                </Text>
            </Card>
        </View>
    );
};

export default SignInScreen;
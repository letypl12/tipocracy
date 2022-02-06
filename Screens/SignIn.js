import React, { useEffect, useState, useContext } from 'react';
import { validateAll } from 'indicative/validator';
import { View, Text } from 'react-native';
import {
    CheckBox, 
    Input,
    Card,
    FormValidationMessage,
    Button
} from 'react-native-elements';

import { AuthContext } from '../utils/authContext';
import auth from '@react-native-firebase/auth';
import * as SecureStore from "expo-secure-store";

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
                //Now store it in the authContext (global state)
                const userToken = {
                    uid: myUser.uid,
                    name: myUser.displayName,
                    email: myUser.email,
                    defaultTeam: ''                            
                }

                if (rememberMe){
                    await SecureStore.setItemAsync('userToken', JSON.stringify(userToken))
                    
                }
            

            console.log('User account signed in!  Dispatching to protected route/screen.');
            signIn({ emailAddress, password, userToken });                
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
        <View>
            <Card>
                <Input
                    label={'Email'}
                    placeholder="Email"
                    autoCapitalize="none"
                    value={emailAddress}
                    onChangeText={setemailAddress}
                    errorStyle={{ color: 'red' }}
                    errorMessage={SignUpErrors ? SignUpErrors.email : null}
                />
                <Input
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    errorStyle={{ color: 'red' }}
                    errorMessage={SignUpErrors ? SignUpErrors.password : null}
                />
                <CheckBox
                    center
                    title="Remember Me"
                    checked={rememberMe}
                    onPress={() => setRememberMe(!rememberMe)}
                />

                <Button
                    buttonStyle={{ margin: 10, marginTop: 50 }}
                    title="Sign in"
                    onPress={() => handleSignIn()}
                />
                <Text style={{ marginLeft: 100 }} onPress={() => signUp()}>
                    No Acount? Sign Up
                </Text>
            </Card>
        </View>
    );
};

export default SignInScreen;
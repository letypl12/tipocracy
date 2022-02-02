import React, { useEffect, useState, useContext } from 'react';
import { validateAll } from 'indicative/validator';
import { View, Text } from 'react-native';
import {
    Input,
    Card,
    FormValidationMessage,
    Button
} from 'react-native-elements';

import { AuthContext } from '../utils/authContext';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUpScreen = ({ navigation }) => {
    const [displayName, setDisplayName] = useState('');
    const [emailAddress, setemailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [SignUpErrors, setSignUpErrors] = useState({});

    const { signUp, signIn } = useContext(AuthContext); // should be signUp

    const handleSignUp = async () => {
        // https://indicative.adonisjs.com
        const rules = {
            displayName: 'required|string',
            email: 'required|email',
            password: 'required|string|min:6|max:40|confirmed'
        };

        const data = {
            displayName: displayName,
            email: emailAddress,
            password: password,
            password_confirmation: passwordConfirm
        };

        const messages = {
            required: field => `${field} is required`,
            'username.alpha': 'Username contains unallowed characters',
            'email.email': 'Please enter a valid email address',
            'password.min':
                'Password is too short. Must be greater than 6 characters',
            'password.confirmed': 'Passwords do not match'
        };

        validateAll(data, rules, messages)
            .then(async () => {
                console.log('form validated, sending: ' + JSON.stringify(data));
                await registerUser(data)
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

    const registerUser = async (data) => {
        console.log('in registerUser' + data.email + data.password);
                auth()
                .createUserWithEmailAndPassword(data.email, data.password)
                .then(() =>{
                    const update = {
                        displayName: data.displayName,
                    };
                    auth()
                    .currentUser.updateProfile(update)
                    .then(() => {
                        let myUser = auth().currentUser;
                        console.log('The user\'s ID is: ' + myUser.uid);
                        
                        firestore()
                            .collection('Users')
                            .doc(myUser.uid)
                            .set({
                                name: myUser.displayName,
                                email: myUser.email,
                                defaultTeam: ''
                            })
                            .then(() => {
                            console.log('User added!');
                            });

                        //Now store it in the authContext (global state)
                        const userToken = {
                            uid: myUser.uid,
                            name: myUser.displayName,
                            email: myUser.email,
                            defaultTeam: ''                            
                            }
                        
                        //get the userid from firebase and make that a token
                        //save a user info in your datastore with their first, last names and the token  
                        console.log('User account created & signed in!');                            
                        signUp({ emailAddress, password, userToken })
                    }
                    )

                    
                })                 


                .catch(error => {
                    console.log('FIREBASE ERROR:' + error);
                    if (error.code === 'auth/email-already-in-use') {
                    alert('That email address is already in use!');
                    }
    
                    if (error.code === 'auth/invalid-email') {
                    alert('That email address is invalid!');
                    }                               
                    return false
                });
        
    }


    useEffect(() => {}, [SignUpErrors]);

    return (
        <View style={{ paddingVertical: 20 }}>
            <Card>
            <Input
                    label={'Name'}
                    placeholder="First Last"
                    value={displayName}
                    onChangeText={setDisplayName}
                    errorStyle={{ color: 'red' }}
                    errorMessage={SignUpErrors ? SignUpErrors.displayName : null}
                />
                <Input
                    label={'Email'}
                    placeholder="Email address..."
                    value={emailAddress}
                    onChangeText={setemailAddress}
                    errorStyle={{ color: 'red' }}
                    errorMessage={SignUpErrors ? SignUpErrors.email : null}
                />
                <Input
                    label={'Password'}
                    placeholder="Password.."
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Input
                    label={'Password Confirm'}
                    placeholder="Enter password again"
                    value={passwordConfirm}
                    onChangeText={setPasswordConfirm}
                    secureTextEntry
                />
                <Text style={{ color: 'red', marginLeft: 10, fontSize: 10 }}>
                    {SignUpErrors ? SignUpErrors.password : null}
                </Text>

                <Button
                    buttonStyle={{ margin: 10, marginTop: 50 }}
                    backgroundColor="#03A9F4"
                    title="SIGN UP"
                    onPress={() => handleSignUp()}
                />
                <Text style={{ marginLeft: 80 }} onPress={() => signIn()}>
                    Already Signed Up? Sign In
                </Text>
            </Card>
        </View>
    );
};

export default SignUpScreen;
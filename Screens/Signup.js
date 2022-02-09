import React, { useEffect, useState, useContext } from "react";
import { validateAll } from "indicative/validator";
import { Image, View, Text } from "react-native";
import {
    Input,
    Card,
    FormValidationMessage,
    Button,
    } from "react-native-elements";

import { AuthContext } from "../utils/authContext";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import * as Icons from "react-native-vector-icons";
import styles from "../utils/styles";


const SignUpScreen = ({ navigation }) => {
    const [displayName, setDisplayName] = useState("");
    const [emailAddress, setemailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [SignUpErrors, setSignUpErrors] = useState({});

    const { signUp, signIn } = useContext(AuthContext); // should be signUp

    const handleSignUp = async () => {
        // https://indicative.adonisjs.com
        const rules = {
        displayName: "required|string",
        email: "required|email",
        password: "required|string|min:6|max:40|confirmed",
        };

        const data = {
        displayName: displayName,
        email: emailAddress,
        password: password,
        password_confirmation: passwordConfirm,
        };

        const messages = {
        required: (field) => `${field} is required`,
        "username.alpha": "Username contains unallowed characters",
        "email.email": "Please enter a valid email address",
        "password.min":
            "Password is too short. Must be greater than 6 characters",
        "password.confirmed": "Passwords do not match",
        };

        validateAll(data, rules, messages)
        .then(async () => {
            console.log("form validated, sending: " + JSON.stringify(data));
            await registerUser(data);
        })

        .catch((err) => {
            console.log("caught:" + JSON.stringify(err));
            const formatError = {};
            for (let myErr of err) {
            formatError[myErr.field] = myErr.message;
            }
            setSignUpErrors(formatError);
        });
    };

    const registerUser = async (data) => {
        console.log("in registerUser" + data.email + data.password);
        auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(() => {
            const update = {
            displayName: data.displayName,
            };
            auth()
            .currentUser.updateProfile(update)
            .then(() => {
                let myUser = auth().currentUser;
                console.log("The user's ID is: " + myUser.uid);

                firestore()
                .collection("Users")
                .doc(myUser.uid)
                .set({
                    name: myUser.displayName,
                    email: myUser.email,
                    defaultTeam: "",
                })
                .then(() => {
                    console.log("User added!");
                });

                //Now store it in the authContext (global state)
                const userToken = {
                uid: myUser.uid,
                name: myUser.displayName,
                email: myUser.email,
                defaultTeam: "",
                };

                //get the userid from firebase and make that a token
                //save a user info in your datastore with their first, last names and the token
                console.log("User account created & signed in!");
                signUp({ emailAddress, password, userToken });
            });
        })

        .catch((error) => {
            console.log("FIREBASE ERROR:" + error);
            if (error.code === "auth/email-already-in-use") {
            alert("That email address is already in use!");
            }

            if (error.code === "auth/invalid-email") {
            alert("That email address is invalid!");
            }
            return false;
        });
    };

    useEffect(() => {}, [SignUpErrors]);

    return (
        <View style={{flex:1, backgroundColor:'#FFE500'}}>
                <View style={{alignItems:'center'}}>
                    <Image resizeMode='contain' source={require('../images/tipocracy_logo.png')} style={{width:300, height:100}} />
                </View>
        <Card title="Sign Up">
            <Input
            label={"Name"}
            placeholder="First Last"
            autoCapitalize="words"
            value={displayName}
            onChangeText={setDisplayName}
            errorStyle={{ color: "red" }}
            errorMessage={SignUpErrors ? SignUpErrors.displayName : null}
            leftIcon={
                <Icons.Ionicons
                  name='person-circle-outline'
                  size={24}
                  color='black'
                />
              }
            />
            <Input
            label={"Email"}
            placeholder="Email address..."
            autoCapitalize="none"
            keyboardType='email-address'
            value={emailAddress}
            onChangeText={setemailAddress}
            errorStyle={{ color: "red" }}
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
            label={"Password"}
            placeholder="Password.."
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            leftIcon={
                <Icons.Ionicons
                  name='lock-closed-outline'
                  size={24}
                  color='black'
                />
              }
            />
            <Input
            label={"Password Confirm"}
            placeholder="Enter password again"
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            secureTextEntry
            leftIcon={
                <Icons.Ionicons
                  name='lock-closed-outline'
                  size={24}
                  color='black'
                />
              }
            />
            <Text style={{ color: "red", marginLeft: 10, fontSize: 10 }}>
            {SignUpErrors ? SignUpErrors.password : null}
            </Text>

            <Button
            buttonStyle={styles.buttonBase}
            backgroundColor="#03A9F4"
            title="SIGN UP"
            onPress={() => handleSignUp()}
            titleStyle={{ fontWeight: 'bold', fontSize: 18, color:'#000' }}
            />
            <Text style={{ marginLeft: 80 }} onPress={() => signIn()}>
            Already Signed Up? Sign In
            </Text>
        </Card>
        </View>
    );
    };

export default SignUpScreen;

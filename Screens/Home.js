import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
const logout = (navigation) =>{
  console.log('in logout');
  global.authenticated = false;
  navigation.navigate('Login');
}
// const navigation = useNavigation();
function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.setFontSizeOne}>Hello User!:</Text>

      <Button
        title="Want to join a Team?"
        onPress={() => navigation.navigate("Teams")}
      />

      <Button
        title="Logout"
        onPress={() => logout(navigation)}
      />      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aquamarine",
    alignItems: "center",
    justifyContent: "center",
  },
  setFontSizeOne: {
    fontSize: 25,
  },
});

export default HomeScreen;

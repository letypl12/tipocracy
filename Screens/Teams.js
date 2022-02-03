import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
// import { navigation } from '@react-navigation/native';

//useEffect to query for teams by invitee and by owner
// firestore join for two collections, Teams and Invitees

function TeamsScreen({ navigation }) {
  return (
    <View style={styles.container_std}>
      <Text>My Teams</Text>
      <Text>Choose a team to work on below.</Text>
      {/* replace wiht a flatlist and react native elements ListItem to have a button that sets the default team
        <Button
        title="Choose A Team"
        onPress={() => {
          navigation.navigate("Choose A Team");
        }}
      /> */}
      <Text>Invites</Text>
      <Text>Accept any open invitations to join a team.</Text>

      <Button
        title="Create A Team"
        onPress={() => {
          navigation.navigate("Create A Team");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TeamsScreen;

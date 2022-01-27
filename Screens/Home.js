import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

// const navigation = useNavigation();
function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.setFontSizeOne}>Hello User!:</Text>

      <Button
        title="Want to join a Team?"
        onPress={() => navigation.navigate("Teams")}
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

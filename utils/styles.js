import { StyleSheet } from "react-native";
import {Dimensions} from 'react-native'
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container_std: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "row",
    },

    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "column",
    },

    containerTopRow: {
        flex:.1,
        backgroundColor: "#000",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },

    containerTop: {
        flex:1,
        backgroundColor: "#000",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },

    containerTopFont: {
        fontSize: SCREEN_HEIGHT * 0.08,
        color: "#FFF",
    },

    containerBody: {
        flex:.9,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    containerRow: {
        flex:1,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    
    setFontSizeOne: {
        fontSize: 25,
    },

    standardButton: {
        margin: 10, 
        marginTop: 50 
    },

    teamListItem: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        color:'black',
    },   
    



});


export default styles;
import { StyleSheet } from "react-native";

import { Dimensions, Platform, PixelRatio } from 'react-native';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    } = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

const TipocracyYellow = '#FFE500';

export function normalize(size) {
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#fff",
        margin:0,
        padding:5
    },

    containerRow: {
        // flex:1,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    
    containerCol: {
        flex:1,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },    

    textBase:{
        padding:1,
        margin:5
        // margin:10,
    },
    
    textH1:{
        padding:5,
        //margin:10,
        fontSize: normalize(18),
    },
    textH1home:{
        padding:5,
        //margin:10,
        fontSize: normalize(20),
        textShadowColor:'white',
        textShadowOffset:{width:0,height:0},
        textShadowRadius:3,
        fontWeight:'bold',
    },    

    buttonBase:{
        padding:10,
        //margin:10,
        color: '#000',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,  
        backgroundColor:'#FFE500',     
    },    

    buttonSmall:{
        padding:1,
        //margin:10,
        color: '#007AFF',
        fontSize: normalize(8),
    },        

    home_container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "column",
    },

    home_containerTopRow: {
        flex:.1,
        backgroundColor: TipocracyYellow,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },

    home_containerTop: {
        flex:1,
        backgroundColor: TipocracyYellow,
        flexDirection: "row",
        //alignItems: "flex-end",
        //justifyContent: "center",
    },

    home_textTitle: {
        fontSize: normalize(18),
        color: "#000",
    },

    home_textSubTitle: {
        fontSize: normalize(10),
        color: "#000",
    },

    home_containerBody: {
        flex:.9,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width:'100%',
    },
    

    
    setFontSizeOne: {
        fontSize: normalize(25),
    },


    teamListItem: {
        padding: 2,
        color:'black',

    },   
    
    item_email: {
        padding:5,
        fontSize: normalize(12)
    },
    backgroundVideo: {
        height: SCREEN_HEIGHT,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
    },
    avatarChoices:{
        fontSize: normalize(8),
    }

});


export default styles;
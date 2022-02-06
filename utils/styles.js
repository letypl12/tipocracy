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
        backgroundColor: "#fff",
        margin:0,
        padding:5
    },

    containerRow: {
        flex:1,
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
        padding:10,
        // margin:10,
    },
    
    textH1:{
        padding:10,
        //margin:10,
        fontSize: normalize(24),
    },

    buttonBase:{
        padding:10,
        //margin:10,
        color: '#007AFF',
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
    }


});


export default styles;
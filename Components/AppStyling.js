import { StyleSheet, Dimensions } from 'react-native';

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
      height: deviceHeight,
      width: deviceWidth,
      backgroundColor: '#fdffed',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    titleContainer: {
      backgroundColor: '#daa0eb',
      justifyContent: 'center',
      flexDirection: 'row',
    },
  
    contentContainer: {
      height: 19*(deviceHeight/25),
      width: deviceWidth, 
      backgroundColor: "#fff",
    },
  
    titleText: {
      fontFamily: 'fantasy',
      fontSize: deviceHeight/32,
      color: 'white',
      alignItems: 'center',
      fontWeight: 'bold',
    }, 
  
    subText: {
      fontFamily: 'fantasy',
      fontSize: deviceHeight/24,
      marginLeft: deviceWidth/35,
      color: '#daa0eb',
      fontWeight: 'bold',
    },
  
    tabLabel: {
      fontFamily: 'fantasy',
      fontSize: deviceHeight/28,
      fontWeight: 'bold',
      marginLeft: deviceWidth/20,
    },
  
    navBarContainer: {
      flexDirection: 'row',
      height: (3.2)*(deviceHeight/25),
      width: deviceWidth,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#daa0eb',
      borderWidth: 2,
    },
  
    settingTab: {
      flexDirection: 'row',
      height: deviceHeight/7,
      width: 8*(deviceWidth/10),
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    icon: {
      height: deviceWidth/10,
      width: deviceWidth/10,
    },
  
    navBarButton: {
      height: deviceWidth/7,
      width: deviceWidth/7,
      margin: deviceWidth/23,
    },
  
    linkButton: {
      height: deviceHeight/7,
      width: deviceHeight/7,
      margin: deviceWidth/15,
      backgroundColor: '#b386f7',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    settingButtonImages: {
      height: deviceHeight/10,
      width: deviceWidth/10,
      margin: deviceWidth/24,
    },
  
    categoryRow: {
      flexDirection: 'row',
      
    },
  
    card: {
        height: deviceHeight/6,
        width: deviceWidth/ 5,
    }, 
  
    cardImage: {
        height: deviceHeight/6,
        width: deviceWidth/5,
    }
  
  });
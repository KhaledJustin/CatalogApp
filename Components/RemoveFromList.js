import React from 'react';
import { View, Text, Dimensions } from "react-native";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;


export const RemoveFromList = () => {
  return (
    <>
            <View style={{ 
                height: deviceHeight/15,
                width: deviceWidth/4,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#d9fcff',
                borderWidth: 3,
                borderColor: '#828282',
                borderRadius: 10,
            }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                }}>Remove From Favorites -</Text>
            </View>
        </>
  )
}
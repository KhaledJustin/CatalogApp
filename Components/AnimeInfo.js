import React from 'react';
import { View, Text, Image, Dimensions, ScrollView } from 'react-native';
import { AddToList } from './AddToList';

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

export const AnimeInfo = (props) => {
        const {title,images:{jpg:{large_image_url}},source,rank,score,popularity,members,synopsis,status,rating,duration}=props.animeInfo
    return (
        <Text>
            <View style={{ 
                height: deviceHeight/4,
                width: deviceWidth/4,
                margin: 20,
                justifyContent: 'center',
                flexDirection: 'row',
            }}>
                    <Image 
                        source={{uri: large_image_url}}
                        style={{ height: (1.2)*(deviceHeight/6), width: deviceWidth/4, marginLeft: 30,}}
                    />

                <View style={{ margin: 10, justifyContent: 'center', height: deviceHeight/4, width: (2.5)*(deviceWidth/4)}}>

                    <ScrollView>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                         }}>{title}</Text>

                        <Text style={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: '#aa9db0',
                        }}>source: {source}</Text>

                        <Text style={{
                            fontSize: 18,
                            color: '#aa9db0',
                        }}>status: {status}</Text>

                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                        }}>{synopsis}</Text>
                    </ScrollView>
                    

                </View>

            </View>
        </Text>
        
    )
}
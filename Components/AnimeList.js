import React from 'react';
import { Image, Text, Dimensions, View, TouchableHighlight, ScrollView } from 'react-native';
import { AddToList } from './AddToList';

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

export const AnimeList = ({ animelist,setAnimeInfo,animeComponent,handleList}) => {
    const AddToList=animeComponent;
    return (
        <>
            {
                animelist ? (
                    animelist.map((anime, index) => {
                        return (

                            <TouchableHighlight onPress={() => setAnimeInfo(anime)}>
                               <View 
                                    style={{ 
                                        height: deviceHeight/4,
                                        width: deviceWidth/4,
                                        margin: 20,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}

                                    key={index}
                                >
                                    <Image 
                                        source={{uri: anime.images.jpg.image_url}}
                                        style={{ height: (1.2)*(deviceHeight/6), width: deviceWidth/4, marginBottom: 5}}
                                        key={index}
                                    /> 

                                        <View 
                                            style={{ 
                                                backgroundColor: '#d9ff30', 
                                                height: deviceHeight/15,
                                                width: deviceWidth/4, 
                                                borderRadius: 10, 
                                                borderColor: '#d9ff30',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                        }}>
                                            <Text style={{
                                                fontSize: 18,
                                                fontWeight: 'bold',
                                            }}
                                            >{anime.title}</Text>
                                        </View>                                   

                                    <TouchableHighlight onPress={()=>handleList(anime)}>
                                        <AddToList/>
                                    </TouchableHighlight>
                                    
                                </View>   
                            </TouchableHighlight>
                              
                        )
                    })
                ) : "Not Found"
            }
        </>
    )
}
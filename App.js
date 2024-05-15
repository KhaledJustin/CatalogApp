import React, { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as MailComposer from 'expo-mail-composer';
import { Button, StyleSheet, Text, TextInput, View, Image, Share, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AnimeList } from './Components/AnimeList';
import { AnimeInfo } from './Components/AnimeInfo';
import { AddToList } from './Components/AddToList';
import { RemoveFromList } from './Components/RemoveFromList';

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

async function sendEmailAsync() {
  let result = await MailComposer.composeAsync({
    recipients: ['khaled.justin.ibrahim@gmail.com'],
    subject: 'Contact Questions',
    body: 'Please type any suggestions, concerns, or questions that you might have:',
  });

  alert(result.status);
}

const onShare = async () => {
  try {
    const result = await Share.share({
      message: ('App Name: NebulAnime')
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log('shared with activity type of: ', result.activityType)
      } else {
        console.log('shared')
      } 
    } else if ( result.action === Share.dismissedAction) {
      console.log('dismissed')
    }
  }
  catch (error) {
    console.log(error.message)
  }
}

function HomeScreen({ navigation }) {

  const [search,setSearch]=useState('Naruto')
  const [animeData,setAnimeData]=useState();
  const [animeInfo,setAnimeInfo]=useState()
  const [myAnimeList,setMyAnimeList]=useState([])

  const addTo=(anime)=>{
      const newArray=[...myAnimeList,anime]
      setMyAnimeList(newArray);
  }

  const removeFrom=(anime)=>{
    const newArray=myAnimeList.filter((myanime)=>{
      return myanime.mal_id !== anime.mal_id
    })
    setMyAnimeList(newArray)
  }

  const getData=async() =>{
    const res=await fetch('https://api.jikan.moe/v4/anime?q=${search}&limit=20')
    const resData = await res.json()
    setAnimeData(resData.data)
  }

  useEffect(() =>{
    getData()
  },[search])
  
  return (
    <View style = {styles.container }>
      <ScrollView>
        <View style ={styles.contentContainer}>

          <View style={{flexDirection:'row', alignItems:'center'}}>  
            <Text style={styles.subText}>
              Home
            </Text>
            <View>
              <TextInput 
                placeholder='Search your anime'
                onChange={ (e)=>setSearch(e.target.value)}
                style={{color:'#91908d', margin: 10, fontSize: 24}}
              />
          </View>

          </View>
            
            <ScrollView>
              

              <View style={styles.searchRow}>
                {animeInfo && <AnimeInfo animeInfo={animeInfo}/>}
              </View>

              <ScrollView horizontal={true}>
                <View style={styles.searchRow}>
                  <Text>
                    <AnimeList 
                    animelist={animeData}
                    setAnimeInfo={setAnimeInfo}
                    animeComponent={AddToList}
                    handleList={(anime)=>addTo(anime)}
                    />
                  </Text>
                </View>
              </ScrollView>

              <Text style={styles.subText}>Favorites</Text>

              <ScrollView horizontal={true}>
                <View style={styles.searchRow}>
                  
                  <Text>
                    <AnimeList 
                    animelist={myAnimeList}
                    setAnimeInfo={setAnimeInfo}
                    animeComponent={RemoveFromList}
                    handleList={(anime)=>removeFrom(anime)}
                    />
                  </Text>
                </View>
              </ScrollView>

              <Text style={{
                fontSize: deviceHeight/34,
                marginLeft: deviceWidth/35,
                marginTop: deviceHeight/28,
                color: '#daa0eb',
                fontWeight: 'bold',
              }}>Our top streaming platforms</Text>

              <Button
              title="Crunchyroll"
              onPress={() => WebBrowser.openBrowserAsync('https://www.crunchyroll.com/')}
              style={styles.linkButton}
              />

              <Button
              title="Viz Media"
              onPress={() => WebBrowser.openBrowserAsync('https://www.viz.com/')}
              style={styles.linkButton}
              />

              <Button
              title="Netflix"
              onPress={() => WebBrowser.openBrowserAsync('https://www.netflix.com/')}
              style={styles.linkButton}
              />

              </ScrollView>

        </View>

        <View style = {styles.navBarContainer}>

            <TouchableHighlight
              onPress={ () => navigation.navigate('Home')}
            >
              <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/61/61972.png' }}
              style={styles.navBarButton}
              />
            </TouchableHighlight>

            <TouchableHighlight
              onPress={ () => navigation.navigate('Settings')}
            >
              <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/126/126472.png' }}
              style={styles.navBarButton}
              />
            </TouchableHighlight>
          
        </View> 
      </ScrollView>
      
    </View>
    
  );
}

function SettingsScreen( { navigation }) {
  return (
    <View style = {styles.container }>
      <ScrollView>
        <View style ={styles.contentContainer}>

          <Text style={styles.subText}>Settings</Text>

          <TouchableHighlight 
          onPress={ () => navigation.navigate('Share')}>
            <View style = {styles.settingTab}>
              <Image
                source={{ uri: 'https://www.iconpacks.net/icons/2/free-paper-plane-icon-2563-thumb.png' }}
                style={styles.navBarButton}
              />

              <Text style = {styles.tabLabel}>
                Share
              </Text>

            </View>
          </TouchableHighlight>
          
          <TouchableHighlight 
          onPress={ () => navigation.navigate('Contact')}>
            <View style = {styles.settingTab}>
              <Image
                source={{ uri: 'https://cdn.iconscout.com/icon/free/png-256/free-email-2029111-1713291.png?f=webp' }}
                style={styles.navBarButton}
              />

              <Text style = {styles.tabLabel}>
                Contact Us
              </Text>

            </View>
          </TouchableHighlight>
          
          <TouchableHighlight
          onPress={ () => navigation.navigate('Information')}>
            <View style = {styles.settingTab}>
            <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infobox_info_icon.svg/1200px-Infobox_info_icon.svg.png' }}
              style={styles.navBarButton}
            />

            <Text style = {styles.tabLabel}>
            Info
            </Text>

            </View>
          </TouchableHighlight>
          

        </View>

        <View style = {styles.navBarContainer}>

            <TouchableHighlight
              onPress={ () => navigation.navigate('Home')}
            >
              <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/61/61972.png' }}
              style={styles.navBarButton}
              />
            </TouchableHighlight>

            <TouchableHighlight
              onPress={ () => navigation.navigate('Settings')}
            >
              <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/126/126472.png' }}
              style={styles.navBarButton}
              />
            </TouchableHighlight>
          
        </View> 
      </ScrollView>  

    </View>
  );
}

function ShareScreen( { navigation }) {

  return (
    <View style={styles.container}>
      <View style={{ height: (22) * (deviceHeight/24)}}>

        <TouchableHighlight onPress={onShare}>
          <View style={{
            height: deviceHeight/12, 
            width: (1.5)*(deviceWidth/2),
            borderWidth: 5,
            borderRadius: 30,
            borderColor: '#daa0eb',
            backgroundColor: '#ffffff',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 45,
          }}>
            <Text 
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: '#daa0eb',
            }}>Share</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

function ContactUsScreen( { } ) {
  return (
    <View style={styles.container}>
      <View style={{ height: (22) * (deviceHeight/24)}}>

        <TouchableHighlight onPress={sendEmailAsync}>
          <View style={{
            height: deviceHeight/12, 
            width: (1.5)*(deviceWidth/2),
            borderWidth: 5,
            borderRadius: 30,
            borderColor: '#daa0eb',
            backgroundColor: '#ffffff',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 45,
          }}>
            <Text 
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: '#daa0eb',
            }}>Contact Us</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  )
}

function InformationScreen( { } ) {
  return (
    <View style={styles.container}>
      <View style={{ height: deviceHeight}}>
        <Text style={{ fontSize: 24, margin: 30, fontWeight: 'bold'}}>
        Nebulanime is a free anime catalog that allows you to keep track of all your favorite Animes.
        The app is composed of two sections to help the user navigate the app with less confusion.
        </Text>
      </View>
    </View>
  )
}

function LogoTitle() {
  return (
    <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          NebulAnime
        </Text>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/360/360731.png' }}
          style={styles.icon}
        />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#daa0eb',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      >
        <Stack.Screen name="Home" 
          component={HomeScreen}
          options={{ headerTitle: (props) => <LogoTitle {...props} />}} 
        />
        <Stack.Screen name="Settings" 
        component={SettingsScreen}
        options={{ headerTitle: (props) => <LogoTitle {...props} />}}  
        />
        <Stack.Screen name="Share" 
        component={ShareScreen}
        options={{ headerTitle: (props) => <LogoTitle {...props} />}}  
        />
        <Stack.Screen name="Contact" 
        component={ContactUsScreen}
        options={{ headerTitle: (props) => <LogoTitle {...props} />}}  
        />
        <Stack.Screen name="Information" 
        component={InformationScreen}
        options={{ headerTitle: (props) => <LogoTitle {...props} />}}  
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

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

    fontSize: deviceHeight/32,
    color: 'white',
    alignItems: 'center',
    fontWeight: 'bold',
  }, 

  subText: {
    fontSize: deviceHeight/24,
    marginLeft: deviceWidth/35,
    color: '#daa0eb',
    fontWeight: 'bold',
  },

  tabLabel: {
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
    alignItems: 'center',
    justifyContent: 'center',
  },

  settingButtonImages: {
    height: deviceHeight/10,
    width: deviceWidth/10,
    margin: deviceWidth/24,
  },

  searchRow: {
    height: deviceHeight/3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
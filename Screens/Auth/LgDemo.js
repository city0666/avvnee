import React, { useState,useEffect} from 'react';
import { Text, TextInput,View, StyleSheet,Platform,TouchableOpacity } from 'react-native';
import  MapView,{ Marker ,PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';



const LgDemo =() => {



    const [latitude, setlatitude] = useState( 15.500863);
    const [longitude, setlongitude] = useState(73.911776);
    const [errorMsg, setErrorMsg] = useState(null);
    const [location, setLocation] = useState(null);
    let [hover, sethover] = useState( 5 );

    let latitude01;
    let longitude01;
    let loctionset = true;

  
    useEffect(() => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
        );
      } else {
        (async () => {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
          }
  
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }
    });
    let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    longitude01 = JSON.stringify(location.coords.longitude);
    latitude01 = JSON.stringify(location.coords.latitude);

    text = JSON.stringify(location);
  }
  const handledestination = () => {

    loctionset=false;
   const test= sethover({
      hover:10
    });
    if(hover === 5) {
return( 
  
  <View style={StyleSheet.absoluteFillObject}>
  <MapView style={StyleSheet.absoluteFillObject} 
           provider={PROVIDER_GOOGLE}

     initialRegion={{
      // latitude: latitude,                      //15.500863, 73.911776
      // longitude: longitude,

      latitude:location.coords.latitude, 
      longitude:location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    showsUserLocation={true}

  >


<Marker coordinate={{latitude:location.coords.latitude, longitude:location.coords.longitude}}
         title={latitude01}
      description={longitude01}
      image={require('../../assets/pin100.png')}

    >
    
      
    </Marker>


  </MapView>
  {  loctionset == true ?  ( <View    style={styles.designview}  >
    <TouchableOpacity
    onPress={handledestination}
                  style={[styles.signIn, {
                      borderColor: '#7c2b83',
                      borderWidth: 1,
                      marginTop: 15
                  }]}
              >
                  <Text style={[styles.button, {
                      color: '#7c2b83'
                  }]}>set Destination</Text>
              </TouchableOpacity>
    </View>) : null } 
  <View    style={styles.top}
>
    <Text>Set</Text>
  </View>
 {hover == 10 ?  (<View    style={styles.topdest}
  >
    <Text>Set</Text>
  </View>) : null }
</View>

    )    }

  }
  
  
    if ( !location){
      return(
        <View style={styles.container}>
        <Text>{text}</Text>
      </View>
    );
    }

    return( 
  
  <View style={StyleSheet.absoluteFillObject}>
  <MapView style={StyleSheet.absoluteFillObject} 
           provider={PROVIDER_GOOGLE}

     initialRegion={{
     latitude:location.coords.latitude, 
      longitude:location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    showsUserLocation={true}

  >


<Marker coordinate={{latitude:location.coords.latitude, longitude:location.coords.longitude}}
         title={latitude01}
      description={longitude01}
      image={require('../../assets/pin100.png')}

    >
    
      
    </Marker>


  </MapView>
  {  loctionset == true ?  ( <View    style={styles.designview}  >
    <TouchableOpacity
    onPress={handledestination}
                  style={[styles.signIn, {
                      borderColor: '#7c2b83',
                      borderWidth: 1,
                      marginTop: 15
                  }]}
              >
                  <Text style={[styles.button, {
                      color: '#7c2b83'
                  }]}>set Destination</Text>
              </TouchableOpacity>
    </View>) : null } 
  <View    style={styles.top}
>
    <Text>Set</Text>
  </View>
 {hover == 5 ?  (<View    style={styles.topdest}

  >
  <TextInput
  placeholder="enet your destination"></TextInput>
    <Text>Set</Text>
  </View>) : null }
</View>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      map: {
     ...StyleSheet.absoluteFillObject,
        // height:300
      },
      text:{
       height:100
        
      },
      paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center',
      },
      designview: {
        position: 'absolute', 
        bottom: 10, 
        left: 10,
        right: 10,
        padding:10, 
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50


      },
      top: {
        position: 'absolute', 
        top: 50, 
        left: 25,
        padding:10, 
        backgroundColor: '#7c2b83',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',

        height:50,
        width:50
       

      },
      topdest: {
        position: 'absolute', 
        top: 100, 
        margin:25,
        padding:10, 
        borderColor: '#7c2b83',
        borderWidth: 3,
        borderRadius: 10,
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        width:"80%",
       

      },
      button: {
        color: '#ffff',
        fontWeight: 'bold',
        fontSize: 20,
        opacity:.4
      },
      markerWrap: {
        alignItems: "center",
        justifyContent: "center",
      },
      marker: {
        width: 20,
        height: 20,
        borderRadius: 50,
        backgroundColor: "rgba(130,4,150, 0.9)",
      },
      ring: {
        width: 200,
        height: 200,
        borderRadius: 1,
        backgroundColor: "rgba(130,4,150, 0.3)",
        position: "absolute",
        borderColor: "rgba(130,4,150, 0.5)",
      },
      signIn: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop:0
      
    },
    // map:{
    //     height: 500
    // }
});
export default LgDemo;

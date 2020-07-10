import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Button,
    Image
} from 'react-native';




const SplashScreen = ({navigation}) => {
    return (
    <View style={styles.container}>
      <View style={styles.header}>
    <Image
    source={require('../../assets/splashbg.jpg')}
    style={styles.logo}
/>
</View>

      <View style={styles.footer}>
      <Text style={{fontSize:35, color: 'white'}}>Welcome to the new  Driver app</Text>
<View style={styles.button}>
<TouchableOpacity
    onPress={() => navigation.navigate('Driverhere')}
    style={[styles.signIn, {
        borderColor: 'white',
        borderWidth: 1,
        marginTop: 15
    }]}
>
    <Text style={[styles.textSign, {
        color: 'white'
    }]}>driver not completed</Text>
</TouchableOpacity>

<TouchableOpacity
    onPress={() => navigation.navigate('map')}
    style={[styles.signIn, {
        backgroundColor: '#892c91',
        marginTop: 15
    }]}
>
    <Text style={[styles.textSign, {
        color: 'white'
    }]}>Rider here</Text>
</TouchableOpacity>

</View>
     <View style={{height:1,backgroundColor:'white',marginTop:'25%'}}></View>
     <Text style={{ color:'white', fontSize:20 ,textAlign:'center',padding:5}}>or ride with avvnee</Text>

      </View>
      <View style={styles.box2}>
      <TouchableOpacity
        onPress={() => navigation.navigate('LgDemo')}>
        <Text style={styles.title}>avvnee</Text>

     </TouchableOpacity>
      </View>

      </View>


    );
};


      

export default SplashScreen;
const {height} = Dimensions.get("screen");
 const height_logo = height * 0.57;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor : 'white',
    
  },
  button: {
      flexDirection:'row',
      justifyContent: 'space-around',
      marginTop:'6%'

  },
  signIn: {
    width: '45%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  
},
  textSign: {
    fontSize: 25,
},
  box2:{
    height:50,
    position: 'absolute',
    alignItems: 'center',
    top:10,
    right:10,
    justifyContent: 'center',


  },
  header: {
      flex: 1.2,
      justifyContent: 'center',
      alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#7c2b83',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingHorizontal: 5,
    paddingVertical : 5
},
logo: {
    width:height_logo,
    height:height_logo
},
title:{
    color:'white',
    fontSize:40,
    fontWeight:'bold'
}

  
});

import React ,{useState,useContext} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Dimensions,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../constants/color';
import {Context as AuthContext} from '../../context/AuthContext';

import { LinearGradient } from 'expo-linear-gradient';



const SignUpScreen = ({navigation}) => {
    const { state, signup } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('admin');

    const [password, setPassword] = useState('');
    const [passwordConfirm  , setPasswordConfirm  ] = useState('');




  return (

    <View style={styles.container}>
    <StatusBar backgroundColor='#7c2b83' barStyle="light-content"/>
      <View style={styles.header}>



          <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View 
          animation="fadeInUpBig"
          style={[styles.footer, {
              backgroundColor: 'white'
          }]}
      >
       <Text style={[styles.text_footer, {
              color: Colors.buttonred
          }]}>Name</Text>
          <View style={styles.action}>
              <FontAwesome 
                  name="user-o"
                  color={Colors.buttonred}
                  size={20}
              />
               <TextInput 
                  placeholder="Enter Your Name"
                  placeholderTextColor="#666666"
                  style={[styles.textInput, {
                      color: Colors.buttonred
                  }]}
                  autoCapitalize="none"
                  autoCorrect = {false}

                   onChangeText = {setName}
                   value = {name}
              />

              </View>

          <Text style={[styles.text_footer, {
              color: Colors.buttonred
          }]}>email</Text>
          <View style={styles.action}>
              <FontAwesome 
                  name="envelope-open-o"
                  color={Colors.buttonred}
                  size={20}
              />
              <TextInput 
                  placeholder="Your Email"
                  placeholderTextColor="#666666"
                  style={[styles.textInput, {
                      color: Colors.buttonred
                  }]}
                  autoCapitalize="none"
                  autoCorrect = {false}

                  onChangeText = {setEmail}
                  value = {email}
              />
              {setEmail ? 
              <Animatable.View    animation="bounceIn" >
                  <Feather 
                      name="check-circle"
                      color="green"
                      size={20}
                  />
              </Animatable.View>
              : null}
          </View>
          {/* { data.isValidUser ? null : 
          <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
          </Animatable.View>
          }
           */}
           <Text style={[styles.text_footer, {
              color: Colors.buttonred
          }]}>password </Text>
          <View style={styles.action}>
              <FontAwesome 
                   name="lock"
                  color={Colors.buttonred}
                  size={20}
              />
               <TextInput 
                  placeholder="Enter Your Password "
                  placeholderTextColor="#666666"
                  style={[styles.textInput, {
                      color: Colors.buttonred
                  }]}
                  autoCapitalize="none"
                  autoCorrect = {false}
                  value = {password}
      onChangeText = {setPassword}
                  
                  secureTextEntry={true}
                 
              />

              </View>

          <Text style={[styles.text_footer, {
              color:  Colors.buttonred,
              marginTop: 10
          }]}>Password Confirm</Text>
          <View style={styles.action}>
              <Feather 
                  name="lock"
                  color={Colors.buttonred}
                  size={20}
              />
              <TextInput 
                  placeholder="Your Password Again"
                  placeholderTextColor="#666666"
                 
                  style={[styles.textInput, {
                    color: Colors.buttonred
                  }]}

        secureTextEntry={true}
      
      onChangeText = {setPasswordConfirm}
                  value = {passwordConfirm}
      autoCapitalize ="none"
      autoCorrect = {false}

                
              />
              
             
                  
                  <Feather 
                      name="eye-off"
                      color="grey"
                      size={20}
                  />
                 
          </View>
          {/* { state.errorMessage?null : 
          <Animatable.View animation="fadeInLeft" duration={500}>
        
    <Text>{state.errorMessage}</Text>    </Animatable.View>
          }
           */}
           {state.errorMessage?(<Text style={{color: 'red', marginTop:15}}>{state.errorMessage}</Text>) : null}
          <TouchableOpacity>
             
              <Text style={{color: '#009387', marginTop:15}}>Forgot password?</Text>
          </TouchableOpacity>
          <View style={styles.button}>
              <TouchableOpacity
                  style={styles.signIn}
                  onPress={() => signup ({ name,email,password,passwordConfirm,role })}
              >
               <LinearGradient
                    colors={['#7c2b83', '#892c91']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign Up</Text>
                </LinearGradient>
    
              </TouchableOpacity>
              <TouchableOpacity
                  style={styles.signIn}
                  onPress={() => navigation.navigate('SplashScreen')}
              >
              <LinearGradient

          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={[styles.signIn, {
                      borderColor: '#7c2b83',
                      borderWidth: 1,
                      marginTop: 15
                  }]}
              >
          <Text
            style={{
              backgroundColor: 'transparent',
              fontSize: 15,
              color: '#fff',
            }}>
            Sign in with Facebook
          </Text>
        </LinearGradient>
        </TouchableOpacity>

              <TouchableOpacity
                  onPress={() => navigation.navigate('SignInScreen')}
                  style={[styles.signIn, {
                      borderColor: '#7c2b83',
                      borderWidth: 1,
                      marginTop: 15
                  }]}
              >
                  <Text style={[styles.textSign, {
                      color: '#7c2b83'
                  }]}>Sign In</Text>
              </TouchableOpacity>
          </View>
          
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

const {height} = Dimensions.get("screen");
 const height_logo = height * 0.28;
 const newLocal = 100;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: Colors.bgmain
  },
  header: {
   
        flex: .5,
        justifyContent: 'center',
         alignItems:'center'
    
  },
  logo: {
    width: height_logo,
    height: height_logo,
    
},
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 3,
      borderTopRightRadius: 55,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30,
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
  button: {
      alignItems: 'center',
  },
  signIn: {
      width: '100%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginTop:0
    
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  }
});

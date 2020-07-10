import React, { Component } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableHighlight,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from "react-native";
import MapView, { Polyline, Marker ,PROVIDER_GOOGLE} from "react-native-maps";
import apiKey from "./google_api_key";
import _ from "lodash";
import PolyLine from "@mapbox/polyline";
import socketIO from "socket.io-client";

export default class Driverhere extends Component {
   
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      latitude: 0,
      longitude: 0,
      test:0,
      predictions: [],
      pointCoords: [],
      lookingForPassengers: false,
      buttonText:"Find Passenger"
     
    };
    
   
  }
    
  
  componentDidMount() {
    //Get current location and set initial region to this
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          test: position.coords

        });
      },
      error => console.error(error),
      { enableHighAccuracy: true, maximumAge: 2000, timeout: 20000 }
    );
  }

  async getRouteDirections(destinationPlaceId ) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${
          this.state.latitude
        },${
          this.state.longitude
        }&destination=place_id:${destinationPlaceId}&key=${apiKey}`
      );
      const json = await response.json();
      console.log(json);
      const points = PolyLine.decode(json.routes[0].overview_polyline.points);
      const pointCoords = points.map(point => {
        return { latitude: point[0], longitude: point[1] };
      });
      this.setState({
        pointCoords,
        predictions: [],
      });
      this.map.fitToCoordinates(pointCoords);
    } catch (error) {
      console.error(error);
    }
  }



  async lookforpassenger(){
      this.setState({
        lookingForPassengers: true

      })

    const socket = socketIO.connect("http://192.168.225.22:8080")
   socket.on("connect", () => {
     socket.emit("passengerRequest",'some one looking passenger')
    console.log('client connected');
   })

   socket.on('taxiRequest', routeResponse =>{
       console.log(routeResponse);
      this.getRouteDirections(routeResponse.geocoded_waypoints[1].place_id);  
      this.setState({lookingForPassengers: false,buttonText:"Found Passenger"})
   })
   
    // socket.on ('connect'=()=>{
    //   console.log('client connected');
    // })
  }

  render() {
    let marker = null;

    if (this.state.pointCoords.length > 1) {
      marker = (
        <Marker
          coordinate={this.state.pointCoords[this.state.pointCoords.length - 1]}
          title={"destination"}
      description={"location"}
      image={require('../../assets/pin100.png')}
        />
      );
      
    }

    // const predictions = this.state.predictions.map(prediction => (
    //   <TouchableHighlight
    //     onPress={() =>
    //       this.getRouteDirections(
    //         prediction.place_id,
    //         prediction.structured_formatting.main_text
    //       )
    //     }
    //     key={prediction.id}
    //   >
    //     <View>
    //       <Text style={styles.suggestions}>
    //         {prediction.structured_formatting.main_text}
    //       </Text>
    //     </View>
    //   </TouchableHighlight>
    // ));


        // if (this.state.latitude == 0){
        //   return(
        //     <View style={styles.waiting}>
        //     <Text style={{ justifyContent:"center",alignItems:"center"}}>waiting for location....</Text>
        //   </View>
        // );
        // }

    return (
      <View style={styles.container}>
        <MapView
          ref={map => {
            this.map = map;
          }}
          
          style={styles.map}
          provider={PROVIDER_GOOGLE}

          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
          // region={this.state.region}
          showsUserLocation={true}
        >
          <Polyline
            coordinates={this.state.pointCoords}
            strokeWidth={4}
            strokeColor="#7c2b83"
          />
          {marker}
          

          

        </MapView>
       
        <TouchableOpacity style={styles.bottomButton}
      onPress={() => this.lookforpassenger()}> 
       
        <Text style={styles.bottomButtonText}>{this.state.buttonText}</Text>
      { this.state.lookingForPassengers === true? (<ActivityIndicator animating = {this.state.lookingForPassengers} size="large"  />) : null}
        </TouchableOpacity>
        
              </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomButton: {
    backgroundColor: "black",
    marginTop:"auto",
    margin: 20,
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    alignSelf: "center"
  },
  bottomButtonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "600"
  },
  suggestions: {
    backgroundColor: "white",
    padding: 5,
    fontSize: 18,
    borderWidth: 0.5,
    marginLeft: 5,
    marginRight: 5
  },
  destinationInput: {
    height: 40,
    borderWidth: 0.5,
    marginTop: 50,
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
    backgroundColor: "white"
  },
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  waiting: {
    justifyContent: "center",
    alignItems: "center",
    flex:1
  }
});
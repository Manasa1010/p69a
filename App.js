import * as React from "react";
import {View ,Text,TouchableOpacity, StyleSheet,Image} from "react-native";
import ScanScreen from "./screens/ScanScreen";

export default class App extends React.Component{

  render(){
    return (
     <ScanScreen/>
    );
  }
}

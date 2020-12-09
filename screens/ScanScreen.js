import * as React from "react";
import {View ,Text,TouchableOpacity, StyleSheet,Image} from "react-native";
import * as Permissions from "expo-permissions";
import {BarCodeScanner} from "expo-barcode-scanner";

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:"",
            buttonState:'normal'
        }
    }
    getCameraPermissions=async()=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions:status==="granted",
            buttonState:"clicked"
        })
    }
handleBarCodeScanner=async({type,data})=>{
    this.setState({
        scanned:true,
        scannedData:data,
        buttonState:"normal"
    })                                
}
render(){
    const  hasCameraPermissions=this.state.hasCameraPermissions;
    const scanned=this.state.scanned;
    const buttonState=this.state.buttonState;

    if(buttonState==="clicked"&&hasCameraPermissions===true){
        return(
            <BarCodeScanner
            onBarCodeScanned={scanned?undefined:this.handleBarCodeScanner}
            style={StyleSheet.absoluteFillObject}
            ></BarCodeScanner>
        )
    }else if (buttonState==="normal"){
        return(
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
             <Text>{hasCameraPermissions===true?this.state.scannedData:"requestCameraPermission"}</Text>
             <TouchableOpacity onPress={this.getCameraPermissions}><Text>Scan QR Code</Text></TouchableOpacity>   
            </View>
            )
    }
           
        
    }
}
    


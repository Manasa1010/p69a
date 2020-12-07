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
    getCameraPermission=async()=>{
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
    const  hasCameraPermission=this.state.hasCameraPermission;
    const scanned=this.state.scanned;
    const buttonState=this.state.buttonState;

    if(buttonState==="clicked"&&hasCameraPermissions===true){
        return(
            <BarCodeScanner
            onBarCodeScanned={scanned?undefined:this.handleBarCodeScanner}
            style={StyleSheet.absoluteFillObject}
            ></BarCodeScanner>
        )
    }else if(buttonState==="normal"){
        return(
            <View style={StyleSheet.container}>
           <Text style={styles.displayText}>{
               hasCameraPermissions===true?this.state.scannedData:"Request Camera Permission"
           }
           </Text>
           <TouchableOpacity
           onPress={this.getCameraPermissions}> 
           style={styles.scanButton}
           <Text style={styles.scanButton}>Scan QR Code</Text>
          
           </TouchableOpacity>

            </View>
        )
    }
}
    
}
var styles=StyleSheet.create({
    inputBox:{
        width:150,
        height:50,
        borderWidth:2
    },
    scanButton:{
        width:150,
        height:50,
        borderWidth:2
    },inputView:{
        flexDirection:"row",
margin:20
    },
    container:{
        flex:1,justifyContent:"center",alignItems:"center"
    }
})
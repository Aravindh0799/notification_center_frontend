import { StyleSheet, Text, View, TouchableOpacity,TouchableWithoutFeedback,Keyboard,Alert} from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const HomeScreen = ({navigation,route}) => {

  // const showAlert = () =>
  // Alert.alert(
  //   'Alert Title',
  //   'My Alert Msg',
  //   // [
  //   //   {
  //   //     text: 'Cancel',
  //   //     onPress: () => Alert.alert('Cancel Pressed'),
  //   //     style: 'cancel',
  //   //   },
  //   // ],
  //   {
  //     cancelable: true,
  //     onDismiss: () =>
  //       Alert.alert(
  //         'This alert was dismissed by tapping outside of the alert dialog.',
  //       ),
  //   },
  // );


  return (
    <KeyboardAwareScrollView>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    
    <View style={styles.inner}>
   <View style={styles.container}>
   <View style={styles.topBar}>
      <Text style={styles.topText}>Home</Text>
      </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity
            onPress={()=>{
                navigation.navigate('')
            }}
            style={[styles.button,styles.buttonOutline]}
            >
        <Text style={styles.buttonOutlineText}>Apply</Text>
        </TouchableOpacity>
    </View>

    <View style={styles.buttonContainer1}>
      <TouchableOpacity
            onPress={()=>{
                navigation.navigate('')
            }}
            style={[styles.button,styles.buttonOutline]}
            >
        <Text style={styles.buttonOutlineText}>Track</Text>
        </TouchableOpacity>
    </View>
   </View>
  </View>
  </TouchableWithoutFeedback>
  </KeyboardAwareScrollView>
   
  )
}

export default HomeScreen

const styles = StyleSheet.create({
container:{
  flex:1,
  justifyContent: 'center',
  alignItems: 'center',
},
topBar:{
  backgroundColor:"#0782F9",
  height:350,
  width:390,
  borderBottomLeftRadius:50,
  borderBottomRightRadius:50,
  marginBottom:30,
  alignItems:'center',

},
topText:{
  marginTop:150,
  color:'white',
  fontSize:50,
  
},

buttonContainer:{
  backgroundColor:'green',
  height:100,
  width:'80%',
  borderRadius:20,
  alignItems:'center',
  textAlignVertical:'center',
  marginBottom:20,
  marginTop:30
},

buttonContainer1:{
  backgroundColor:'purple',
  height:100,
  width:'80%',
  borderRadius:20,
  alignItems:'center',
  textAlignVertical:'center',
  marginBottom:20,
  marginTop:30
},

buttonOutlineText:{
  marginTop:23,
  color:'white',
  fontSize:35
}
})
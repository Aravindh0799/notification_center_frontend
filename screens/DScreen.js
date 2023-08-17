import { StyleSheet, Text, View, TouchableOpacity,TouchableWithoutFeedback,Keyboard,Alert} from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const DScreen = ({navigation,route}) => {

  return (
    <KeyboardAwareScrollView>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    
    <View style={styles.inner}>
    <View style={styles.container}>


    <View style={styles.topBar}>
        <Text style={styles.topText}>{route.params.dName} </Text>
    </View>
    
    </View>
    </View>
  </TouchableWithoutFeedback>
  </KeyboardAwareScrollView>
  )
}

export default DScreen


const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    topBar:{
        backgroundColor:"#0782F9",
        height:250,
        width:390,
        borderBottomLeftRadius:50,
        borderBottomRightRadius:50,
        marginBottom:30,
        alignItems:'center',
            
    },
    topText:{
        marginTop:100,
        fontSize:50,
        color:'white'
    }

})
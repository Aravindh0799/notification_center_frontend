import { StyleSheet, Text, View, Alert, TouchableOpacity,} from 'react-native'
import React from 'react'

const HomeScreen = ({navigation,route}) => {

  const showAlert = () =>
  Alert.alert(
    'Alert Title',
    'My Alert Msg',
    // [
    //   {
    //     text: 'Cancel',
    //     onPress: () => Alert.alert('Cancel Pressed'),
    //     style: 'cancel',
    //   },
    // ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          'This alert was dismissed by tapping outside of the alert dialog.',
        ),
    },
  );


  return (
   <View style={styles.container}>
    
    <TouchableOpacity
            onPress={showAlert}
            style={[styles.button,styles.buttonOutline]}
            >
        <Text style={styles.buttonOutlineText}>Click</Text>
        </TouchableOpacity>
  </View>
   
  )
}

export default HomeScreen

const styles = StyleSheet.create({
container:{
  marginTop:50,
}
})
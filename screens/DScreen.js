import { StyleSheet, Text, View, Image,TouchableOpacity,TouchableWithoutFeedback,Keyboard,Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import instance from '../components/axios';
import { useSafeAreaFrame } from 'react-native-safe-area-context';

const DScreen = ({navigation,route}) => {


  let dName;
  const email=route.params.email
  const dept =route.params.dept
  const [notices,setNotices] = useState("")

  useEffect(()=>{
    dName = route.params.dName
    instance.post("getNotices",({dept:dName})).then(
      (res)=>{
        console.log(res.data)
        const temp = res.data
        setNotices(temp)
      }
    )

  },[])

  const nlist = () =>{
    if(notices && Array.isArray(notices)){
    return notices.reverse().map(element=>{
    return(
        
            <View key={element._id} style={styles.cards}>
            <View style={styles.details}>
            <Text style={styles.dName}>{element.title}</Text>
            <Text style={styles.desc}>{element.description}</Text>
            <Image src={element.image}></Image>
            </View>
            <View style={styles.vdate}>
            <Text style={styles.dText}>Valid till : {element.validityDate}</Text>
            </View>
            </View>
            

    )
   })
}
  }


  return (
    <KeyboardAwareScrollView>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    
    <View style={styles.inner}>
    <View style={styles.container}>


    <View style={styles.topBar}>
        <Text style={styles.topText}>{route.params.dName} </Text>
    </View>

    <View style={styles.content}>
      {nlist()}
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
    },

    cards:{
      backgroundColor:"grey",
      width:"100%",
      // alignItems:"center",
      padding:"2%",
      color:'white',
      borderRadius:10,
      marginBottom:20
    },

    content:{
      width:"80%",
      color:'white',
      
    },

    details:{
      alignItems:"center"
    },

    dName:{
      fontSize:30,
      color:"white",
      
    },

    dText:{
      alignItems:"flex-start"
    },
    vdate:{ 
      
      marginTop:10,
      // backgroundColor:"yellow",
      alignItems:"flex-end"
    },

    dText:{
      fontSize:12,
    },
    desc:{
      marginTop:5
    }

})
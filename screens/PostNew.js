import React, { useState, useEffect } from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    TextInput, 
    Button, 
    Image, 
    TouchableOpacity,
    ScrollView,
    Platform,
    Alert,
    FlatList,
   } from 'react-native';
import CheckBox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import instance from '../components/axios';

export default function PostNew(){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [validityDate, setValidityDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [staffChecked, setStaffChecked] = useState(false);
  const [studentChecked, setStudentChecked] = useState(false);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);

  const [isChecked, setIsChecked] = useState({
    staff: false,
    student: false,
  });

  const [errorTitle, setErrorTitle] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [errorImage, setErrorImage] = useState('');
  const [errorCheckbox, setErrorCheckbox] =  useState('');

  useEffect(() => {
    (async () =>{
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted') ;
    })();
  }, []);

  const pickImage = async () => {
    try {const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [20,18],
      quality: 1,
    });

    console.log(result);

    if(!result.cancelled){
      setImage(result.assets[0].uri);
    }
    else{
      console.log('Image selection cancelled');
    }
  }catch(error){
    console.error("Error while picking an image", error);
  }

  };

  if(hasGalleryPermission === false){
    return <Text> No access to Internal Storage </Text>
  }

  const toggleDatePicker=()=>{
    setShowDatePicker(!showDatePicker);
  }

  const handleDate=(event, selectedDate)=>{
    setShowDatePicker(Platform.OS=='ios');
    if(selectedDate!==undefined){
      setValidityDate(selectedDate);
    }
  };
  const handleStaffCheck = () =>{
    setStaffChecked(staffChecked);
    // if(!studentChecked && !staffChecked){ 
    // setStudentChecked(true);
    // }
  };
  const handleStudentCheck = () =>{
    setStudentChecked(!studentChecked);
    // if(!studentChecked && !staffChecked){ 
    // setStaffChecked(true);
    // }
  };
  
  const handleSubmit = async () => {
    try{
          if(!title){
            setErrorTitle('Title is required');
          }
          else{
            setErrorTitle('');
          }
          if(!description){
            setErrorDescription('Description is required');
          }
          else{
            setErrorDescription('');
          }
          if(!image){
            setErrorImage('Image is not selected');
          }
          else{
            setErrorImage('');
          }
          // if(!(staffChecked || studentChecked)){
          //   setErrorCheckbox('Select atleast one option (Staff / Student)');
          // }
          // else{
          //   setErrorCheckbox('');
          // }
          if (!studentChecked && !staffChecked) {
            // Display an error message or take appropriate action if neither checkbox is checked.
            alert('Please select at least one option (Staff or Student).');
            return;
          }
      if(!title || !description || !image || !(staffChecked || studentChecked)){
        Alert.alert('Validation Error', 'Please fill all the required fields.');
        return;
      }
    const response = await instance.post('newPost', { 
      title,
      description,
      validityDate: validityDate.toDateString(),
      staffChecked,
      studentChecked,
      image,
    });
    if( response.data.message === 'success'){
      console.log("success");
      Alert.alert("submitted successfully");
      setTitle('');
      setDescription('');
      setValidityDate(new Date());
      setStaffChecked(false);
      setStudentChecked(false);
      setImage('');
      setErrorTitle('');
      setErrorDescription('');
      setErrorImage('');
      setErrorCheckbox('');
    }
    else{
      console.error('Registration failed. Response:', response.data);
    }
  }
    catch (error){
      if(error.response){
        console.error('Registration failed. Response:', error.response.data);
      }
      else if(error.request){
        console.error('No response received. Request:', error.request);
      }
      else{
        console.error('Error in making the request:', error.message);
      }
      
    }
  };

  return (
    <View style={styles.first}>
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}> New Circular</Text>
        <View style={styles.inputContainer}>
         {/* Title */}
          <Text style={styles.label}>Title:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setTitle(text)}
            value={title}
            placeholder="Enter title"
          />
          {errorTitle ? <Text style={styles.error}>{errorTitle}</Text> : null}
        </View> 
         {/* Description */} 
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setDescription(text)}
            value={description}
            placeholder="Enter description"
          />
          {errorDescription ? <Text style ={styles.error}> {errorDescription}</Text> : null}
        </View>

          {/* Validity Date */}
          <Text style={styles.label}>Validity Date:</Text>
          <TouchableOpacity onPress={toggleDatePicker}>
          <Text  style={styles.input}>
            {validityDate.toDateString()}
          </Text>
          </TouchableOpacity>
          {
            showDatePicker && (
              <DateTimePicker
                value={validityDate}
                mode="date"
                placeholder="default"
                onChange={handleDate}
                />
            )
          }
          {/*Checkboxes Staff / Student*/}
          <Text style={styles.labelCheck}> Post To :</Text>
            <View style={styles.checkboxContainer}>
              <CheckBox
                style={styles.checkbox}
                value={staffChecked}
                onValueChange={setStaffChecked}
                color={staffChecked? '#4630EB' : undefined}
              />
              <Text style={styles.checkboxLabel}>Staff</Text>
              <CheckBox
                style={styles.checkbox}
                value={studentChecked}
                onValueChange={setStudentChecked}
                color={studentChecked? '#4630EB' : undefined}
              />
              <Text>Student</Text>
            </View>
            

              <Text style={styles.label}>Posted Date:</Text>
              <TextInput
                style={styles.input}
                value={new Date().toDateString()}
                editable={false}
              />

              <View style={styles.button1}>
              <Button title="Upload Image" onPress={() => pickImage() }/> 
              {image && <Image source ={{uri : image}} style= {{flex:1/2}} />}
              {errorImage ? <Text style ={styles.error}>{errorImage}</Text>: null}
              </View>
              <View style={styles.button2}>
              <Button title="Submit" onPress={handleSubmit} />
              </View>
          
    
    </ScrollView>
    </View> 
  );  
};

const styles = StyleSheet.create({

  first:{
    marginTop:50,
    padding:20,
    borderRadius:15,
  },
  container:{
    padding:16,
  },
  title:{
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color:"#000080",
  },
  inputContainer:{
    marginBottom:16,
  },
  label:{
    fontSize: 15,
    marginBottom: 8,
    color:"#000000",
    
  },
  labelCheck:{
    marginTop: 15,
  },
  input:{
    borderWidth: 2,
    borderColor:'#ccc',
    borderRadius:15,
    padding: 8,
    fontSize: 16,
  },
  checkboxContainer:{
    flexDirection:'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 10,
  },
  checkbox:{
    marginHorizontal: 10,
  },
  checkboxLabel:{
    fontSize: 16,
  },
  image:{
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 4,
    marginBottom: 16,
  },
  uploadImage:{
    marginTop: 20,
    backgroundColor: 'yellow',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
    textAlign: 'center'
  },
  uploadText:{
    color:"white",
    fontSize: 16,
    fontWeight: 'bold',
  },
  button1:{
    marginTop:20,
    marginBottom:10,
    marginVertical:'10',
    borderRadius:5,
    backgroundColor: '#00ff22',
  },  
  button2:{
    marginTop:10,
    marginBottom:10,
    color: "yellow",
  },
  error:{
    color:'red',
    fontSize: 12,
    marginTop: 5,
  },

});

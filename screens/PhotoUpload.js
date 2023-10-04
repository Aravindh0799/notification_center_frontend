import React, { useState, useEffect } from 'react';
import { 
    View, 
    StyleSheet,  
    Button, 
    Image, 
   } from 'react-native';
import CheckBox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import axios from '../components/axios'; 
import instance from '../components/axios';

export default function UploadPhoto(){
  const [image, setImage] = useState(null);

  const pickImageAndUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access image library denied');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5, // Adjust the quality as needed
      base64: false, // Set this option to false
    });

    if (!result.cancelled) {
      const formData = new FormData();
      formData.append('image', {
        uri: result.uri,
        type: 'image/png', // Adjust the type as needed
        name: 'image.png',
      });

      try {
        const response = await axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          const imageUrl = response.data.imageUrl;
          setImage(imageUrl);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Upload Image" onPress={pickImageAndUpload} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

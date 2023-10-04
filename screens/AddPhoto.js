// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, Button } from 'react-native';
// import ImagePicker from 'react-native-image-picker';

// const AddPhoto = () => {
//   const [photo, setPhoto] = useState(null);

//   // Function to handle image selection
//   const selectImage = () => {
//     const options = {
//       title: 'Select Image',
//       mediaType: 'photo',
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };

//     ImagePicker.showImagePicker(options, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else {
//         // Set the selected image to the state
//         setPhoto(response);
//       }
//     });
//   };

//   const handleCreate = () => {
//     console.log('Creating a product with the selected photo:', photo);
//   }
//   return (
//     <View>
//       <TouchableOpacity onPress={selectImage}>
//         <View style={{ alignItems: 'center', marginTop: 20 }}>
//           {photo ? (
//             <Image
//               source={{ uri: `data:image/jpeg;base64,${photo.data}` }}
//               style={{ width: 200, height: 200 }}
//             />
//           ) : (
//             <Text>Select a photo</Text>
//           )}
//         </View>
//       </TouchableOpacity>

//       <Button title="Create Product" onPress={handleCreate} />
//     </View>
//   );
// };

// export default AddPhoto;

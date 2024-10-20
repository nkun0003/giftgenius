import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import PeopleContext from '../PeopleContext';

export default function AddIdeaScreen() {
  const [name, setName] = useState(''); // State for idea name
  const [image, setImage] = useState(null); // State for the captured image
  const [hasPermission, setHasPermission] = useState(null); // Camera permission state
  const cameraRef = useRef(null); // Reference to the Camera component

  const navigation = useNavigation();
  const route = useRoute(); // Route hook to get params
  const { personId } = route.params; // Extract personId from route params

  const { addIdeaToPerson } = useContext(PeopleContext); // Access context function to add ideas

  // This hook request camera permissions on component mount
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Function to take a picture
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImage(photo.uri); //here saving the image URI to state
    }
  };

  // Function to save the idea
  const saveIdea = () => {
    if (!name || !image) {
      Alert.alert('Error', 'Please provide a name and take a picture.');
      return;
    }

    // Add the idea to the person in the context
    addIdeaToPerson(personId, { name, image });
    navigation.goBack(); // Navigate back to the previous screen
  };

  if (hasPermission === null) {
    return <View />; // If permission status is not determined yet, return empty view
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>; // Show error message if permission is denied
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Add a Gift Idea</Text>

      {/* Text input for the idea name */}
      <TextInput
        style={styles.inputText}
        placeholder="Idea Name"
        value={name}
        onChangeText={setName}
      />

      {/* Camera preview or image preview */}
      {image ? (
        <Image source={{ uri: image }} style={styles.preview} />
      ) : (
        <Camera style={styles.camera} ref={cameraRef} />
      )}

      {/* Button to capture the image */}
      <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
        <Text style={styles.buttonText}>Take Picture</Text>
      </TouchableOpacity>

      {/* Save and Cancel buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={saveIdea} />
        <Button title="Cancel" onPress={() => navigation.goBack()} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 30,
    marginBottom: 20
  },
  inputText: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20
  },
  camera: {
    width: '100%',
    height: 300,
    marginBottom: 20
  },
  captureButton: {
    backgroundColor: 'blue',
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  },
  preview: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

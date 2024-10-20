import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Camera, CameraView } from 'expo-camera';
import PeopleContext from '../PeopleContext';

export default function AddIdeaScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [facing, setFacing] = useState('back');
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const { personId, personName } = route.params; //extracting both personId and personName from route params

  const { addIdeaToPerson } = useContext(PeopleContext);

  // Request camera permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // If permission is not granted
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera, please allow access</Text>;
  }

  // Function to take a picture
  const takePicture = async () => {
    if (cameraRef) {
      const data = await cameraRef.takePictureAsync();
      setPhoto(data.uri); // Set the photo URI to display
    }
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  const saveIdea = () => {
    if (!name || !photo) {
      Alert.alert('Error', 'Please provide a name and take a picture.');
      return;
    }

    const newIdea = { id: Date.now().toString(), text: name, img: photo };
    addIdeaToPerson(personId, newIdea);

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>Add Idea for {personName}</Text>
      <TextInput
        style={styles.inputText}
        placeholder="Gift Idea"
        value={name}
        onChangeText={setName}
      />
      <View style={styles.cameraContainer}>
        {/* Camera view if no photo is taken yet */}
        {!photo ? (
          <CameraView style={styles.cameraView} facing={facing} ref={(ref) => setCameraRef(ref)}>
            <View style={styles.cameraContainer}>
              <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
                <Text style={styles.flipText}> Flip </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                <Text style={styles.captureText}> Take Picture </Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        ) : (
          // If a photo is taken, display the preview
          <View style={styles.previewContainer}>
            <Image source={{ uri: photo }} style={styles.imagePreview} />
            <TouchableOpacity style={styles.retakeButton} onPress={() => setPhoto(null)}>
              <Text style={styles.captureText}> Retake </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

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
  cameraContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20
  },
  cameraView: {
    flex: 1
  },
  flipButton: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10
  },
  flipText: {
    fontSize: 18,
    color: 'black'
  },
  captureButton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    right: '15%',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20
  },
  retakeButton: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20
  },
  captureText: {
    fontSize: 18,
    color: 'black'
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imagePreview: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 45
  }
});

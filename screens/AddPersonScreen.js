import React, { useContext, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import PeopleContext from '../PeopleContext';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';

export default function AddPersonScreen() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const { addPerson } = useContext(PeopleContext);
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to save the new person
  const savePerson = () => {
    if (!name || !dob) {
      toggleModal(); // Show modal if the name or dob is missing
    } else if (name && dob) {
      addPerson(name, dob); // Save the person to the context
      navigation.goBack();
    }
  };

  // Function to handle date selection
  const selectDobDate = (day) => {
    setDob(day.dateString); // Update the dob state with the selected date
  };

  // Function to toggle the modal
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Add a Person</Text>

          {/* Text input for the person's name */}
          <TextInput
            style={styles.inputText}
            placeholder="Person Name"
            value={name}
            onChangeText={setName}
          />

          {/* Permanent calendar view for date selection */}
          <Text style={styles.calendarLabel}>Date of Birth:</Text>
          <Calendar
            style={styles.calendar}
            onDayPress={selectDobDate} // Function called when a day is selected
            markedDates={{
              [dob]: { selected: true, marked: true, selectedColor: 'blue' }
            }} //this to highlight the selected date
            theme={{
              todayTextColor: 'red',
              arrowColor: 'blue'
            }}
          />

          {/* Buttons to save or cancel */}
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={savePerson} />
            <Button title="Cancel" onPress={() => navigation.goBack()} />
          </View>

          {/* Modal for missing name */}
          <Modal visible={isModalVisible} transparent={true} animationType="slide">
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Please add a person name and Date of birth!</Text>
              <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
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
    paddingBottom: 20
  },
  calendarLabel: {
    fontSize: 15,
    padding: 10,
    color: '#A9A9A9'
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 20
  },
  inputText: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5
  },
  modalView: {
    marginTop: 400,
    marginHorizontal: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    paddingTop: 20,
    fontSize: 18,
    color: 'black',
    marginBottom: 20
  },
  closeButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

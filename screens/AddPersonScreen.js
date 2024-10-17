import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
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
    if (!name) {
      toggleModal(); //show modal if the name is missing
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
        onDayPress={selectDobDate} // Function called when a day is selected
        markedDates={{
          [dob]: { selected: true, marked: true, selectedColor: 'blue' }
        }} // Highlight the selected date
        theme={{
          todayTextColor: 'red',
          arrowColor: 'blue'
        }}
      />

      {/* Buttons to save or cancel */}
      <Button class title="Save" onPress={savePerson} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />

      {/* Modal for missing name */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Please add a person name!</Text>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
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
    // Shadow/Elevation for Android
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
  }
});

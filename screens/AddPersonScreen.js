import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import PeopleContext from '../PeopleContext';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import DatePicker from 'react-native-modern-datepicker';

export default function AddPersonScreen() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const { addPerson } = useContext(PeopleContext);
  const navigation = useNavigation();

  // Function to save the new person
  const savePerson = () => {
    if (name && dob) {
      addPerson(name, dob); // here save the person to the context
      navigation.goBack();
    }
  };

  // Function to handle date selection
  const selectDobDate = (day) => {
    setDob(day.dateString); // Update the dob state with the selected date
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
      <DatePicker
        onSelectedChange={(selectedDate) => {
          setDob(selectedDate);
        }}
        mode="calendar"
      />

      {/* Buttons to save or cancel */}
      <Button class title="Save" onPress={savePerson} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
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
  }
});

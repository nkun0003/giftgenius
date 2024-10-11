import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import PeopleContext from '../PeopleContext';
import { useNavigation } from '@react-navigation/native';

export default function AddPersonScreen() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const { addPerson } = useContext(PeopleContext);
  const navigation = useNavigation();

  const savePerson = () => {
    if (name && dob) {
      addPerson(name, dob);
      navigation.goBack();
    }
  };
  return (
    <View>
      <Text style={styles.title}>Add a Person</Text>
      <TextInput placeholder=" Person Name" value={name} onChangeText={setName} />
      <TextInput placeholder="2003-01-03" value={dob} onChangeText={setDob} />

      <Button title="Save" onPress={savePerson} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 2,
    borderColor: '#ddd',
    padding: 20
  },
  title: {
    fontSize: 30,
    paddingTop: 20,
    paddingLeft: 20
  }
});

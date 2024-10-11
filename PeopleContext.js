import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { randomUUID } from 'expo-crypto'; // Importing randomUUID to generate unique IDs for each new person.

const PeopleContext = createContext(); // Creating a new context called PeopleContext, which will be used to share state across components.

export const PeopleProvider = ({ children }) => {
  // PeopleProvider component will wrap around other components to provide them with access to PeopleContext.
  // 'children' represents any components nested inside PeopleProvider.

  const [people, setPeople] = useState([]); // State 'people' is used to store an array of person objects, initially set to an empty array.

  const STORAGE_KEY = 'people'; // Key used for storing and retrieving data from AsyncStorage.

  // Load people from AsyncStorage when the component mounts
  useEffect(() => {
    // useEffect runs when the component is first rendered to load data from AsyncStorage.
    const loadPeople = async () => {
      const savedPeople = await AsyncStorage.getItem(STORAGE_KEY); // Asynchronously get data stored under the key 'people' from AsyncStorage.
      if (savedPeople) setPeople(JSON.parse(savedPeople)); // If saved data exists, parse the JSON string into a JavaScript array and update the 'people' state.
    };
    loadPeople(); // Call loadPeople to load the data from AsyncStorage.
  }, []); // Empty dependency array ensures this effect only runs once when the component mounts.

  // Function to add a new person to the list.
  const addPerson = async (name, dob) => {
    const newPerson = {
      id: randomUUID(), // Generate a unique ID for the new person.
      name, // The name of the person, passed as an argument.
      dob // The date of birth of the person, passed as an argument.
    };
    const updatedPeople = [...people, newPerson]; // Create a new array with the existing people plus the new person added.
    setPeople(updatedPeople); // Update the 'people' state with the new array.
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople)); // Save the updated people array to AsyncStorage.
  };

  return (
    <PeopleContext.Provider value={{ people, addPerson }}>
      {/* 
      The PeopleContext.Provider component provides the current value of the context to all its children.
      The value prop contains the 'people' array and the 'addPerson' function, allowing components
      wrapped in PeopleProvider to access and modify this state.
      */}
      {children}
      {/* 'children' represents any components that are wrapped inside PeopleProvider.
      It allows those components to access the context values. */}
    </PeopleContext.Provider>
  );
};

export default PeopleContext;
// Exporting PeopleContext so other components can consume it and access the shared state.

import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { randomUUID } from 'expo-crypto'; // Importing randomUUID to generate unique IDs for each new person.

const PeopleContext = createContext(); // Creating a new context called PeopleContext, which will be used to share state across components.

export const PeopleProvider = ({ children }) => {
  // PeopleProvider component will wrap around other components to provide them with access to PeopleContext.
  // 'children' represents any components nested inside PeopleProvider in my app.js.
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
  }, []); //empty dependency array ensures this effect only runs once when the component mounts.

  // Function to add a new person to the list.
  const addPerson = async (name, dob) => {
    const newPerson = { id: randomUUID(), name, dob, ideas: [] };
    const updatedPeople = [...people, newPerson];
    setPeople(updatedPeople);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
  };

  // This function to delete a person from the list.
  const deletePerson = async (personId) => {
    const updatedPeople = people.filter((p) => p.id !== personId);
    setPeople(updatedPeople);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
  };

  //Adds a new idea to a specific person based on personId.
  const addIdeaToPerson = async (personId, idea) => {
    const updatedPeople = people.map((p) =>
      p.id === personId ? { ...p, ideas: [...p.ideas, idea] } : p
    ); // here adding the new idea if the IDs match.
    setPeople(updatedPeople);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople)); // Save updated state to AsyncStorage.
  };

  //Delete an idea based on personId and the index of the idea.
  const deleteIdeaFromPerson = async (personId, ideaIndex) => {
    const updatedPeople = people.map((p) =>
      p.id === personId ? { ...p, ideas: p.ideas.filter((_, index) => index !== ideaIndex) } : p
    );
    setPeople(updatedPeople);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople)); // Save changes.
  };

  //Retrieve the list of ideas for a specific person.
  const getIdeasByPersonId = (personId) => {
    const person = people.find((p) => p.id === personId);
    return person ? person.ideas : [];
  };

  //added all functions inside the context value so they can be accessed by other components.
  return (
    <PeopleContext.Provider
      value={{
        people,
        addPerson,
        addIdeaToPerson,
        deleteIdeaFromPerson,
        getIdeasByPersonId,
        deletePerson
      }}>
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

//exporting PeopleContext so other components can consume it and access the shared state
export default PeopleContext;

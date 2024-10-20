import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
  Text,
  SafeAreaView,
  Alert
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PeopleContext from '../PeopleContext';
import { MaterialIcons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';

// Helper function to format the date to 'Month Day' (e.g., 'September 08')
const formatDate = (dob) => {
  const date = new Date(dob); // Convert the string to a Date object
  return date.toLocaleDateString('en-US', {
    month: 'long', // Full month name (e.g., "September")
    day: '2-digit' // Two-digit day (e.g., "08")
  });
};

export default function PeopleScreen() {
  const navigation = useNavigation();
  const { people, deletePerson } = useContext(PeopleContext); // Context usage
  const [isDeleting, setIsDeleting] = useState(false); // State to handle delete operations

  // Handle Delete Person - Async function
  const handleDelete = async (personId) => {
    setIsDeleting(true); //Indicating loading or deletion process
    await deletePerson(personId); //Calling context method to delete the person
    setIsDeleting(false); //added to reset deleting state
  };

  //Rendering the swipeable delete button
  const renderRightActions = (personId) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() =>
        Alert.alert(
          'Delete Person', // Alert title
          'Are you sure you want to delete this person?', // Alert message
          [
            { text: 'Cancel', style: 'cancel' }, // Cancel button
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => handleDelete(personId) // Call handleDelete if confirmed
            }
          ]
        )
      }>
      <MaterialIcons name="delete" size={30} color="white" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>People List</Text>
        {/* If the array is empty, display a message to add a person */}
        {people.length === 0 ? (
          <Text style={styles.savedText}>No People Saved Yet.</Text>
        ) : (
          <FlatList
            data={people}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              //wrapped the person with "swipeable" so that it can be removed
              <Swipeable renderRightActions={() => renderRightActions(item.id)}>
                <View style={styles.people}>
                  <View style={styles.nameAndDateContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.dob}>{formatDate(item.dob)}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.ideaButton}
                    onPress={
                      () => navigation.navigate('Ideas', { personId: item.id }) //here just Passing personId to Ideas screen
                    }>
                    <MaterialIcons name="lightbulb" size={45} color="black" />
                  </TouchableOpacity>
                </View>
              </Swipeable>
            )}
          />
        )}

        {/* Floating Action Button to Add a New Person */}
        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Add Person')}>
          <MaterialIcons name="add" size={60} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 2,
    borderColor: '#ddd'
  },
  title: {
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10
  },
  people: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#606060',
    padding: 15,
    backgroundColor: '#d3d3d3',
    marginHorizontal: 10
  },
  nameAndDateContainer: {
    flexDirection: 'column'
  },
  name: {
    fontSize: 20
  },
  dob: {
    fontSize: 15,
    color: '#606060'
  },
  ideaButton: {
    padding: 5
  },
  savedText: {
    textAlign: 'center',
    color: '#606060',
    padding: 10,
    fontSize: 15
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: '100%'
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    left: '50%',
    transform: [{ translateX: -30 }],
    backgroundColor: 'green',
    borderRadius: 30,
    width: 60,
    height: 60,
    elevation: 5
  }
});

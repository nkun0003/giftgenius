import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Button,
  FlatList,
  View,
  Text,
  SafeAreaView
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PeopleContext from '../PeopleContext';
import { MaterialIcons } from '@expo/vector-icons';

// Helper function to format the date to 'Month Day' (e.g., 'September 08')
const formatDate = (dob) => {
  const date = new Date(dob); //convert the string to a Date object
  return date.toLocaleDateString('en-US', {
    month: 'long', //full month name (e.g., "September")
    day: '2-digit' //two-digit day (e.g., "08")
  });
};

export default function PeopleScreen() {
  const navigation = useNavigation();
  const { people } = useContext(PeopleContext);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>People List</Text>
        {/*If the array is empty then a message should be displayed on the screen asking the user to add a first Person.*/}
        {people.length === 0 ? (
          <Text style={styles.savedText}>No People Saved Yet.</Text>
        ) : (
          <FlatList
            data={people}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.people}>
                <View style={styles.nameAndDateContainer}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.dob}>{formatDate(item.dob)}</Text>
                </View>
                <TouchableOpacity
                  style={styles.ideaButton}
                  onPress={() => navigation.navigate('Ideas')}>
                  <MaterialIcons name="lightbulb" size={45} color="black" />
                </TouchableOpacity>
              </View>
            )}
          />
        )}

        {/* Floating Action Button */}
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

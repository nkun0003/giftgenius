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

export default function PeopleScreen() {
  const navigation = useNavigation();
  const { people } = useContext(PeopleContext);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>People List</Text>

        {people.length === 0 ? (
          <Text style={styles.savedText}>No People Saved Yet.</Text>
        ) : (
          <FlatList
            data={people}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.people}>
                <Text>{item.name}</Text>
                <Text>{item.dob}</Text>
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
    borderColor: '#ddd',
    padding: 20
  },
  title: {
    fontSize: 30,
    paddingTop: 20,
    paddingLeft: 20,
    textAlign: 'center'
  },
  people: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    marginLeft: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
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

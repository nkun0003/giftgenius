import React, { useContext } from 'react';
import { StyleSheet, FlatList, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import PeopleContext from '../PeopleContext';

export default function IdeaScreen() {
  const { getIdeasByPersonId } = useContext(PeopleContext);
  const route = useRoute(); //Here accessing route params
  const navigation = useNavigation();
  const { personId } = route.params; //extracting personId from route params

  const ideas = getIdeasByPersonId(personId) || []; //Retrieve ideas for the specific person or use an empty array if no ideas exist

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Gift Ideas</Text>

        {ideas.length === 0 ? (
          <Text style={styles.noIdeasText}>No gift ideas added yet!</Text>
        ) : (
          <FlatList
            data={ideas}
            keyExtractor={(item, index) => index.toString()} //added index as key in case if ideas don't have unique IDs
            renderItem={({ item, index }) => (
              <View style={styles.ideaItem}>
                <Text style={styles.ideaText}>{item.name}</Text>
                <TouchableOpacity
                  onPress={() => {
                    // Delete idea and refresh the screen
                    deleteIdeaFromPerson(personId, index);
                  }}>
                  <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
            )}
          />
        )}

        {/* Floating Action Button */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('Add Idea', { personId })}>
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
    padding: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  noIdeasText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#606060',
    marginTop: 20
  },
  ideaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  ideaText: {
    fontSize: 18,
    flex: 1,
    marginRight: 10
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
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5
  }
});

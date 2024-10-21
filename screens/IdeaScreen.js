import React, { useContext } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import PeopleContext from '../PeopleContext';

export default function IdeaScreen() {
  const { getIdeasByPersonId, deleteIdeaFromPerson } = useContext(PeopleContext);
  const route = useRoute(); //Here accessing route params
  const navigation = useNavigation();
  const { personId, personName } = route.params; //extracting both personId and personName from route params

  const ideas = getIdeasByPersonId(personId) || []; //Retrieve ideas for the specific person or use an empty array if no ideas exist

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Displaying the person's name in the title */}
        <Text style={styles.title}>Ideas for {personName}</Text>

        {ideas.length === 0 ? (
          <Text style={styles.noIdeasText}>No Ideas Added Yet!</Text>
        ) : (
          <FlatList
            data={ideas}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.ideaItem}>
                {/* Displaying the image of the idea */}
                <Image source={{ uri: item.img }} style={styles.image} />

                {/* Displaying the name of the idea */}
                <Text style={styles.ideaText}>{item.text}</Text>

                {/* Delete Button */}
                <TouchableOpacity
                  onPress={() => {
                    deleteIdeaFromPerson(personId, index); // Call delete function
                    navigation.navigate('Ideas', { personId, personName }); // Refresh screen
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
          onPress={() => navigation.navigate('Add Idea', { personId, personName })}>
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
    fontSize: 30,
    fontWeight: 'regular',
    margin: 10
  },
  noIdeasText: {
    fontSize: 20,
    color: '#606060',
    margin: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    padding: 10,
    backgroundColor: 'white'
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
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5
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

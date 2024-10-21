import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal
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
  //this hook to display the message when deleting an idea
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIdeaIndex, setSelectedIdeaIndex] = useState(null); // Track which idea to delete

  const toggleModal = (index = null) => {
    setSelectedIdeaIndex(index); //setting the idea index for deletion
    setIsModalVisible(!isModalVisible);
  };

  // Confirm and delete the idea
  const confirmDelete = () => {
    if (selectedIdeaIndex !== null) {
      deleteIdeaFromPerson(personId, selectedIdeaIndex);
    }
    toggleModal(); //Close the modal after deletion
  };

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
                <TouchableOpacity style={styles.deleteButton} onPress={() => toggleModal(index)}>
                  <MaterialIcons name="delete" size={35} color="white" />
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

        {/* Modal for deleting pop up message */}
        <Modal visible={isModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to delete this idea?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.deleteModalButton} onPress={confirmDelete}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelModalButton} onPress={toggleModal}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  ideaText: {
    fontSize: 18,
    flex: 1,
    marginRight: 10
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
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
  },
  modalView: {
    marginTop: '100%',
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  deleteModalButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center'
  },
  cancelModalButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  }
});

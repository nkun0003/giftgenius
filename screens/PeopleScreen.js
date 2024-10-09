import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { Button, FlatList, View, Text, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PeopleContext from '../PeopleContext';

export default function PeopleScreen() {
  const navigation = useNavigation();
  const { people } = useContext(PeopleContext);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <FlatList
          data={people}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.dob}</Text>
            </View>
          )}
        />
        <Button title="Add Person" onPress={() => navigation.navigate('AddPerson')} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

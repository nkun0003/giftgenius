import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './AppNavigator';
import { PeopleProvider } from './PeopleContext'; //imported global context from PeopleContext compo

export default function App() {
  return (
    <View style={styles.container}>
      {/*wrapped the navigation compo inside the global context*/}
      <PeopleProvider>
        <AppNavigator />
      </PeopleProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

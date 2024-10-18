import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import PeopleScreen from './screens/PeopleScreen';
import AddPersonScreen from './screens/AddPersonScreen';
import IdeaScreen from './screens/IdeaScreen';

const Stack = createStackNavigator(); //created "Stack" navigation container for stack navigation

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="People" component={PeopleScreen} />
        <Stack.Screen name="Add Person" component={AddPersonScreen} />
        <Stack.Screen name="Ideas" component={IdeaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

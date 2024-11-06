import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import BookList from '../screens/BookList'
import BookDetail from '../screens/BookDetail';

function HomeStackNavigator() {
  const Stack = createStackNavigator();  
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="BooksList" component={BookList} options={{ title: 'Books' }} />
      <Stack.Screen name="BookDetail" component={BookDetail} options={{ title: 'Book Detail' }} />
    </Stack.Navigator>
  )
}

export default HomeStackNavigator
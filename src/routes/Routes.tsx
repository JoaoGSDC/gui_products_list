import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from '../auth';
import { useNavigation } from '@react-navigation/native';
const { Navigator, Screen } = createStackNavigator();

import Login from '../pages/Login';
import ProductsList from '../pages/ProductsList';
import ProductsCategory from '../pages/ProductsCategory';

export default function Routes() {


  function componentsNavigation() {
    let comp;
    if (auth.token === '') {
      comp = (
        <>
          <Screen
            name="ProductsCategory"
            component={ProductsCategory}
          />

          <Screen
            name="ProductsList"
            component={ProductsList}
          />
        </>
      )
    } else {
      const navigation = useNavigation();
      navigation.navigate('Login');
    }

    return comp;
  }

  return (
    <NavigationContainer>

      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#F2F3F5' }
        }}>

        <Screen
          name="Login"
          component={Login}
        />

        {componentsNavigation()}

      </Navigator>
    </NavigationContainer>
  );
}
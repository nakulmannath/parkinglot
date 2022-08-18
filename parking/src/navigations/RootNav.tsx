import {NavigationContainer} from '@react-navigation/native';
import HomeStackNavigator from './HomeStackNavigator';
import React from 'react';

const RootNav = () => {
  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
};

export default RootNav;

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Movie from '../screens/Movie';
import News from '../screens/News';
import Popular from '../screens/Popular';
import Search from '../screens/Search';
import {IconButton} from 'react-native-paper';

const Stack = createStackNavigator();

export default function StackNavigation(props) {
  const {navigation} = props;

  const ButtonLeft = screen => {
    switch (screen) {
      case 'search':
      case 'movie':
        return (
          <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        );

      default:
        return (
          <IconButton icon="menu" onPress={() => navigation.openDrawer()} />
        );
    }
  };

  const buttonRight = () => {
    return (
      <IconButton
        icon="magnify"
        onPress={() => navigation.navigate('search')}
      />
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: 'TheMovieApp',
          headerLeft: () => ButtonLeft(),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="movie"
        component={Movie}
        options={{
          headerTransparent: true,
          title: '',
          headerLeft: () => ButtonLeft('movie'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="news"
        component={News}
        options={{
          title: 'Nuevas películas',
          headerLeft: () => ButtonLeft('news'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="popular"
        component={Popular}
        options={{
          title: 'Peliculas populares',
          headerLeft: () => ButtonLeft('popular'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="search"
        component={Search}
        options={{
          title: '',
          headerTransparent: true,
          headerLeft: () => ButtonLeft('search'),
        }}
      />
    </Stack.Navigator>
  );
}

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Drawer, Switch, TouchableRipple, Text} from 'react-native-paper';
import usePreference from '../hooks/usePreferences';

export default function DrawerContent(props) {
  const {navigation} = props;
  const [active, setActive] = useState('home');
  const {theme, toggleTheme} = usePreference();

  const onchangeScreen = screen => {
    setActive(screen);
    navigation.navigate(screen);
  };
  return (
    <DrawerContentScrollView>
      <Drawer.Section>
        <Drawer.Item
          label="Inicio"
          active={active === 'home'}
          onPress={() => onchangeScreen('home')}
        />
        <Drawer.Item
          label="Peliculas populares"
          active={active === 'popular'}
          onPress={() => onchangeScreen('popular')}
        />
        <Drawer.Item
          label="Nuevas peículas"
          active={active === 'news'}
          onPress={() => onchangeScreen('news')}
        />
      </Drawer.Section>
      <Drawer.Section title="Opciones">
        <TouchableRipple>
          <View style={styles.preference}>
            <Text>Tema Oscuro</Text>
            <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
          </View>
        </TouchableRipple>
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

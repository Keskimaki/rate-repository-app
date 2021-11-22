import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    backgroundColor: theme.colors.appBarBackground
  },
  tab: {
    paddingLeft: 10,
  },
  text: {
    color: theme.colors.appBarText
  }
});

const AppBarTab = ({ text }) => (
  <View style={styles.tab}>
    <Pressable>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  </View>
);

const AppBar = () => {
  return (
  <View style={styles.container}>
    <AppBarTab text="Repositories"/>
  </View>
  );
};

export default AppBar;
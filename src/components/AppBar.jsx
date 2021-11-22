import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import { Link } from 'react-router-native';

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

const AppBarTab = ({ text, route }) => (
  <View style={styles.tab}>
    <Pressable>
      <Link to={route} ><Text style={styles.text}>{text}</Text></Link>
    </Pressable>
  </View>
);

const AppBar = () => {
  return (
  <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab text="Repositories" route="/" />
      <AppBarTab text="Sign in" route="/login" />
    </ScrollView>
  </View>
  );
};

export default AppBar;
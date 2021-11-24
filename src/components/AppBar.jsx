import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { CHECK_USER } from '../qraphql/queries';

import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

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

const Logout = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const handleLogout = async () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  };
  return (
    <View style={styles.tab}>
      <Pressable onPress={handleLogout}>
        <Text style={styles.text}>Sign out</Text>
      </Pressable>
    </View>
  );
};

const AppBar = () => {
  const loggedIn = useQuery(CHECK_USER);
  if (loggedIn.loading) {
    return (
      <Text>Loading..</Text>
    );
  }
  return (
  <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab text="Repositories" route="/" />
      {loggedIn.data.authorizedUser 
        ? <Logout />
        : <AppBarTab text="Sign in" route="/login" />}
    </ScrollView>
  </View>
  );
};

export default AppBar;
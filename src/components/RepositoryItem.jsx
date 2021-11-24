import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    backgroundColor: theme.colors.repositoryItem,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  text: {
    paddingLeft: 15,
    flex: 1,
    flexWrap: 'wrap',
  },
  language: {
    backgroundColor: '#0366d6',
    borderRadius: 5,
    padding: 5,
    height: 30
  },
  bottomItem: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 15,
    backgroundColor: theme.colors.repositoryItem,
    textAlign: 'center',
    justifyContent: 'space-evenly',
    marginTop: -1,
  }
});

const RepositoryItem = ({ repository }) => {
  return (
    <View>
      <ItemTop repository={repository.item}/>
      <BottomItems repository={repository.item}/>
    </View>
  );
};

const ItemTop = ({ repository }) => (
  <View style={styles.container}>
    <Image style={styles.image} source={{ uri : repository.ownerAvatarUrl }} />
    <Text style={styles.text}>
      <Text fontWeight="bold" testID="name">{repository.fullName} {'\n'}</Text>
      <Text color="textSecondary" testID="description">{repository.description} {'\n'}</Text>
      <View style={styles.language}>
        <Text style={{color: '#FFF'}} testID="language">{repository.language} {'\n'}</Text>
      </View>
    </Text>
  </View>
);

const BottomItems = ({ repository }) => {
  return (
    <View style={styles.bottomItem}>
      <BottomItem data={repository.stargazersCount} text="Stars" testID="stars" />
      <BottomItem data={repository.forksCount} text="Forks" testID="forks" />
      <BottomItem data={repository.reviewCount} text="Reviews" testID="reviews" />
      <BottomItem data={repository.ratingAverage} text="Rating" testID="rating" />
    </View>
  );
};

const BottomItem = ({ data, text, testID }) => {
  const formatNumber = (num) => num > 999 ? (num/1000).toFixed(1) + 'K' : num;
  return (
    <View style={{alignItems: 'center'}}>
      <Text fontWeight="bold" testID={testID}>{formatNumber(data)} </Text>
      <Text color="textSecondary">{text}</Text>
  </View>
  );
};

export default RepositoryItem;

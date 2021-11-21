import React from "react";
import { View, Text } from "react-native";

const RepositoryItem = ({ repository }) => {
  const repo = repository.item;
  return (
    <View>
      <Text>
        Full name: {repo.fullName} {'\n'}
        Language: {repo.language} {'\n'}
        Stars: {repo.stargazersCount} {'\n'}
        Forks: {repo.forksCount} {'\n'}
        Reviews: {repo.reviewCount} {'\n'}
        Rating: {repo.ratingAverage}
      </Text>
    </View>
  );
};

export default RepositoryItem;
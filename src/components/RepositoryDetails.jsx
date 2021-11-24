import React from "react";
import Text from "./Text";
import { View, FlatList, StyleSheet } from "react-native";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import RepositoryItem from "./RepositoryItem";
import { GET_REPOSITORY } from "../qraphql/queries";
import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 15,
    backgroundColor: theme.colors.repositoryItem,
  },
  rating: {
    color: theme.colors.primary,
    borderColor: theme.colors.primary,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 15,
    width: 30,
    height: 30,
    textAlign: 'center',
    paddingTop: 4,
    marginLeft: 10
  }
});

const RepositoryDetails = () => {
  const { id } = useParams();
  const repository = useQuery(GET_REPOSITORY, {variables: { id } });

  if (repository.loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <RepositoryItem repository={repository.data.repository} detailed={true} />
      <ReviewList reviews={repository.data.repository.reviews.edges} />
    </View>
  );
};

const ReviewItem = ({ review }) => {
  const parseDate = date => date.substring(0, date.indexOf('T')).split('-').reverse().join('.');
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Text fontWeight="bold">{review.user.username}</Text>
          <Text color="textSecondary">{parseDate(review.createdAt)}</Text>
        </View>
        <Text style={styles.rating} fontWeight="bold">{review.rating}</Text>
      </View>
      <Text>{review.text}</Text>
    </View>
  );
};

const ReviewList = ( {reviews} ) => {
  const reviewNodes = reviews.map(edge => edge.node);

  const ItemSeparator = () => <View style={styles.separator} />;

  const renderItem = (review) => (
    <ReviewItem review={review.item} />
  );

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      ListHeaderComponent={() => <ItemSeparator />}
  />
  );
};

export default RepositoryDetails;

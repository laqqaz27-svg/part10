import { FlatList, StyleSheet, View } from 'react-native';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';

import ReviewItem from './ReviewItem';

const GET_CURRENT_USER = gql`
  query Me($includeReviews: Boolean = false) {
    me {
      id
      username

      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt

            repository {
              id
              fullName
            }

            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => (
  <View style={styles.separator} />
);

const MyReviews = () => {
  const { data, loading, error } = useQuery(
    GET_CURRENT_USER,
    {
      variables: {
        includeReviews: true,
      },
      fetchPolicy: 'cache-and-network',
    },
  );

  if (loading) {
    return <View />;
  }

  if (error) {
    return <View />;
  }

  const reviews = data?.me?.reviews?.edges.map(
    (edge) => edge.node,
  ) || [];

  return (
    <FlatList
      data={reviews}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <ReviewItem review={item} />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
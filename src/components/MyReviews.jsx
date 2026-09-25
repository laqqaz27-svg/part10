import {
  Alert,
  Button,
  FlatList,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import { useMutation, useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { useNavigate } from 'react-router-native';

import ReviewItem from './ReviewItem';
import { DELETE_REVIEW } from '../graphql/queries';

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
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

const ItemSeparator = () => (
  <View style={styles.separator} />
);

const MyReviews = () => {
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useQuery(
    GET_CURRENT_USER,
    {
      variables: {
        includeReviews: true,
      },
      fetchPolicy: 'cache-and-network',
    },
  );

  const [deleteReview] = useMutation(DELETE_REVIEW);

  const deleteReviewById = async (reviewId) => {
    try {
      await deleteReview({
        variables: {
          id: reviewId,
        },
      });

      await refetch();
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };

  const handleDelete = (reviewId) => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(
        'Are you sure you want to delete this review?',
      );

      if (confirmed) {
        deleteReviewById(reviewId);
      }

      return;
    }

    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteReviewById(reviewId),
        },
      ],
    );
  };

  if (loading) {
    return <View />;
  }

  if (error) {
    return <View />;
  }

  const reviews =
    data?.me?.reviews?.edges.map(
      (edge) => edge.node,
    ) || [];

  return (
    <FlatList
      data={reviews}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <View>
          <ReviewItem review={item} />

          <View style={styles.actions}>
            <View style={styles.button}>
              <Button
                title="View repository"
                onPress={() =>
                  navigate(
                    `/repositories/${item.repository.id}`,
                  )
                }
              />
            </View>

            <View style={styles.button}>
              <Button
                title="Delete review"
                color="red"
                onPress={() => handleDelete(item.id)}
              />
            </View>
          </View>
        </View>
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;


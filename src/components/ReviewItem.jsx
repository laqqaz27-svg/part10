import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  content: {
    flex: 1,
  },
  username: {
    marginBottom: 5,
  },
  date: {
    marginBottom: 10,
  },
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text fontWeight="bold">
          {review.rating}
        </Text>
      </View>

      <View style={styles.content}>
        <Text
          style={styles.username}
          fontWeight="bold"
        >
          {review.user.username}
        </Text>

        <Text
          style={styles.date}
          color="textSecondary"
        >
          {format(
            new Date(review.createdAt),
            'dd MMM yyyy',
          )}
        </Text>

        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
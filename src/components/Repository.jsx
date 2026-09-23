import { FlatList, StyleSheet, View } from 'react-native';

import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

import useRepository from '../hooks/useRepository';
import { useParams } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => (
  <View style={styles.separator} />
);

const Repository = () => {
  const { id } = useParams();

  const { repository, loading, error } = useRepository(id);

  if (loading) {
    return <View />;
  }

  if (error) {
    return <View />;
  }

  if (!repository) {
    return <View />;
  }

  const reviews = repository.reviews.edges.map(
    (edge) => edge.node,
  );

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem review={item} />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <RepositoryItem
          item={repository}
          showGitHubButton
        />
      )}
    />
  );
};

export default Repository;
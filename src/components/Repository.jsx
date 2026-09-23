import { View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

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

  return (
    <View style={styles.container}>
      <RepositoryItem
        item={repository}
        showGitHubButton
      />
    </View>
  );
};

export default Repository;
import {
  View,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import * as Linking from 'expo-linking';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  content: {
    flex: 1,
  },
  fullName: {
    marginBottom: 5,
  },
  description: {
    marginBottom: 10,
  },
  language: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    color: 'white',
    padding: 5,
    borderRadius: 5,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  stat: {
    alignItems: 'center',
  },
  githubButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 5,
  },
  githubButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const formatCount = (count) => {
  if (count < 1000) {
    return count.toString();
  }

  return `${(count / 1000).toFixed(1)}k`;
};

const RepositoryItem = ({
  item,
  showGitHubButton = false,
}) => {
  const openGitHub = async () => {
    await Linking.openURL(item.url);
  };

  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{ uri: item.ownerAvatarUrl }}
        />

        <View style={styles.content}>
          <Text
            style={styles.fullName}
            fontSize="subheading"
            fontWeight="bold"
          >
            {item.fullName}
          </Text>

          <Text style={styles.description}>
            {item.description}
          </Text>

          <Text style={styles.language}>
            {item.language}
          </Text>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text fontWeight="bold">
            {formatCount(item.stargazersCount)}
          </Text>
          <Text color="textSecondary">Stars</Text>
        </View>

        <View style={styles.stat}>
          <Text fontWeight="bold">
            {formatCount(item.forksCount)}
          </Text>
          <Text color="textSecondary">Forks</Text>
        </View>

        <View style={styles.stat}>
          <Text fontWeight="bold">
            {item.reviewCount}
          </Text>
          <Text color="textSecondary">Reviews</Text>
        </View>

        <View style={styles.stat}>
          <Text fontWeight="bold">
            {item.ratingAverage}
          </Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>

      {showGitHubButton && (
        <Pressable
          style={styles.githubButton}
          onPress={openGitHub}
        >
          <Text style={styles.githubButtonText}>
            Open in GitHub
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
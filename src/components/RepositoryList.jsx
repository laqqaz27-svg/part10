import {
  FlatList,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    backgroundColor: 'white',
    marginBottom: 10,
  },
});

const ItemSeparator = () => (
  <View style={styles.separator} />
);

export const RepositoryListContainer = ({
  repositories,
  onPressRepository,
  orderBy,
  orderDirection,
  setOrderBy,
  setOrderDirection,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onPressRepository(item.id)}
        >
          <RepositoryItem item={item} />
        </Pressable>
      )}
      ListHeaderComponent={
        <Picker
          selectedValue={`${orderBy}-${orderDirection}`}
          onValueChange={(value) => {
            if (value === 'CREATED_AT-DESC') {
              setOrderBy('CREATED_AT');
              setOrderDirection('DESC');
            }

            if (value === 'RATING_AVERAGE-DESC') {
              setOrderBy('RATING_AVERAGE');
              setOrderDirection('DESC');
            }

            if (value === 'RATING_AVERAGE-ASC') {
              setOrderBy('RATING_AVERAGE');
              setOrderDirection('ASC');
            }
          }}
          style={styles.picker}
        >
          <Picker.Item
            label="Latest repositories"
            value="CREATED_AT-DESC"
          />

          <Picker.Item
            label="Highest rated repositories"
            value="RATING_AVERAGE-DESC"
          />

          <Picker.Item
            label="Lowest rated repositories"
            value="RATING_AVERAGE-ASC"
          />
        </Picker>
      }
    />
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] =
    useState('DESC');

  const { repositories } = useRepositories({
    orderBy,
    orderDirection,
  });

  const navigate = useNavigate();

  const onPressRepository = (id) => {
    navigate(`/repositories/${id}`);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onPressRepository={onPressRepository}
      orderBy={orderBy}
      orderDirection={orderDirection}
      setOrderBy={setOrderBy}
      setOrderDirection={setOrderDirection}
    />
  );
};

export default RepositoryList;
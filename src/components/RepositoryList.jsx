import {
  FlatList,
  View,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  header: {
    backgroundColor: '#eee',
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
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
  searchKeyword,
  setSearchKeyword,
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
        <View style={styles.header}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search repositories"
            value={searchKeyword}
            onChangeText={setSearchKeyword}
          />

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
        </View>
      }
    />
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] =
    useState('DESC');

  const [searchKeyword, setSearchKeyword] = useState('');

  const [debouncedSearchKeyword] = useDebounce(
    searchKeyword,
    500,
  );

  const { repositories } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchKeyword,
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
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};

export default RepositoryList;
import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useQuery } from '@apollo/client';
import { Picker } from '@react-native-picker/picker';
import { GET_REPOSITORIES } from '../qraphql/queries';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [sorting, setSorting] = useState(['CREATED_AT', 'DESC']);
  const [selected, setSelected] = useState();

  const repositories = useQuery(GET_REPOSITORIES, {
    variables: { 
      searchKeyword: '',
      orderBy: sorting[0],
      orderDirection: sorting[1]
    },
    fetchPolicy: 'cache-and-network'
  });

  if (repositories.loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <RepositoryListContainer 
      repositories={repositories.data.repositories} 
      setSorting={setSorting} 
      selected={selected}
      setSelected={setSelected}
    />
  );
};

export const RepositoryListContainer = ({ repositories, setSorting, selected, setSelected }) => {
  const repositoryNodes = repositories.edges.map(edge => edge.node);
  const renderItem = (repository) => (
    <RepositoryItem repository={repository} />
  );

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      ListHeaderComponent={() => <SelectComponent setSorting={setSorting} selected={selected} setSelected={setSelected} />}
    />
  );
};

const SelectComponent = ({ setSorting, setSelected, selected }) => {
  const updateSorting = (itemValue) => {
    setSelected(itemValue);
    switch (itemValue) {
      case 'latest':
        setSorting(['CREATED_AT', 'DESC']);
        break;
      case 'highest':
        setSorting(['RATING_AVERAGE', 'DESC']);
        break;
      case 'lowest':
        setSorting(['RATING_AVERAGE', 'ASC']);
        break;
      default:
        break;
    }
  };

  return(
    <Picker style={{height: 50}}
      selectedValue={selected}
      onValueChange={(itemValue) => updateSorting(itemValue)
      }>
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  );
};

export default RepositoryList;
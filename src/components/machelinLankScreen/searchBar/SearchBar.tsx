import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/Button';
import { Colors } from 'const/global-styles';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { searchRestaurantsState } from 'store/searchRestaurantsState';
import KeywordsModal from './KeywordsModal';

export default function SearchBar() {
  const [toggleModal, setToggleModal] = useState(false);
  const [searchRestaurant, setSearchRestaurant] = useRecoilState(searchRestaurantsState);

  const searchTextChangeHandler = (searchText: string) => {
    setSearchRestaurant(prev => ({ ...prev, searchText }));
  };

  const searchHandler = () => {};

  const openKeywordsHandler = () => {
    setToggleModal(prev => !prev);
  };

  return (
    <View style={styles.wrap}>
      <Button onPress={searchHandler} style={styles.searchIcon}>
        <Ionicons name="search-outline" size={25} color={Colors.mainWhite1} />
      </Button>
      <TextInput
        style={styles.searchInput}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="검색해볼까요?"
        onChangeText={searchTextChangeHandler}
        value={searchRestaurant.searchText}
      />
      <Button onPress={openKeywordsHandler} style={styles.searchIcon}>
        <Ionicons name="flash" size={25} color={Colors.mainWhite1} />
      </Button>
      <KeywordsModal toggleModal={toggleModal} openKeywordsHandler={openKeywordsHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: Colors.mainGreen2,
    overflow: 'hidden',
  },
  searchIcon: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainGreen3,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

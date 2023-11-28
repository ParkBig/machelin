import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/Button';
import { Colors } from 'const/global-styles';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import KeywordsModal from './KeywordsModal';
import { regionalSettingsState } from 'store/searchState';

export default function SearchBar() {
  const [toggleModal, setToggleModal] = useState(false);
  const [regionalSettings, setRegionalSettings] = useRecoilState(regionalSettingsState);

  const searchTextChangeHandler = (searchText: string) => {
    setRegionalSettings(prev => ({ ...prev, searchText }));
  };

  const searchHandler = () => {};

  const toggleModalHandler = () => {
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
        value={regionalSettings.searchText}
      />
      <Button onPress={toggleModalHandler} style={styles.searchIcon}>
        <Ionicons name="flash" size={25} color={Colors.mainWhite1} />
      </Button>
      <KeywordsModal toggleModal={toggleModal} toggleModalHandler={toggleModalHandler} />
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

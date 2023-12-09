import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/layout/Button';
import { Colors } from 'const/global-styles';
import { useRecoilState } from 'recoil';
import { regionalRestaurantSearchInputState } from 'store/searchState';

export default function SearchBar() {
  const [regionalRestaurantSearchInput, setRegionalRestaurantSearchInput] = useRecoilState(
    regionalRestaurantSearchInputState
  );

  const onFocusHandler = () => {
    setRegionalRestaurantSearchInput(prev => ({ ...prev, isTyping: true }));
  };

  const searchHandler = () => {
    setRegionalRestaurantSearchInput(prev => ({ ...prev, isTyping: false }));
  };

  const searchTextChangeHandler = (searchText: string) => {
    setRegionalRestaurantSearchInput(prev => ({ ...prev, searchText }));
  };

  const deleteHandler = () => {
    setRegionalRestaurantSearchInput(prev => ({ ...prev, searchText: '' }));
  };

  return (
    <View style={styles.wrap}>
      <Button onPress={searchHandler} style={styles.searchIcon}>
        <Ionicons style={styles.ionicons} name='search' size={30} color={Colors.mainGreen2} />
      </Button>
      <TextInput
        style={styles.searchInput}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="식당이름 or 지역이름 식당이름 검색"
        onFocus={onFocusHandler}
        onEndEditing={searchHandler}
        onChangeText={searchTextChangeHandler}
        value={regionalRestaurantSearchInput.searchText}
      />
      <Button onPress={deleteHandler} style={styles.searchIcon}>
        <Ionicons style={styles.ionicons} name="close" size={30} color={Colors.mainGreen2} />
      </Button>
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
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ionicons: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  searchInput: {
    flex: 1,
  },
});

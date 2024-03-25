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

  return (
    <View style={styles.wrap}>
      <Button onPress={searchHandler} style={styles.searchIcon}>
        <Ionicons name='search' size={30} color={Colors.mainGreen2} />
      </Button>
      <TextInput
        style={styles.searchInput}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="식당이름 or 키워드 검색"
        onFocus={onFocusHandler}
        onEndEditing={searchHandler}
        onChangeText={searchTextChangeHandler}
        value={regionalRestaurantSearchInput.searchText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.mainGreen2,
    overflow: 'hidden',
  },
  searchIcon: {
    height: 60,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
  },
});

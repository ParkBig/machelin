import { LayoutAnimation, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadow } from 'const/global-styles';
import { useRecoilState } from 'recoil';
import { mainScreenTogglesState } from 'store/toggleState';
import { TextInput } from 'react-native-gesture-handler';
import Button from 'components/common/Button';
import { mainSearchState } from 'store/searchState';
import { useEffect, useState } from 'react';
import useNearbyRestaurantsQuery from 'query/hooks/restaurants/useNearbyRestaurantsQuery';

export default function Header() {
  const [{ toggleRestaurantSearch }, setMainScreenToggles] = useRecoilState(mainScreenTogglesState);
  const { reRestaurants } = useNearbyRestaurantsQuery();
  const [textInputValue, setTextInputValue] = useState('');
  const [mainSearch, setMainSearch] = useRecoilState(mainSearchState);

  const initMainSearchHandler = () => {
    setTextInputValue('');
    setMainSearch(prev => ({ ...prev, mainSearchValue: '' }));
  };

  const toggleRestaurantSearchHandler = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (toggleRestaurantSearch) {
      setMainScreenToggles(prev => ({ ...prev, toggleRestaurantSearch: false }));
      if (!textInputValue) {
        setMainSearch({ isTyping: false, mainSearchValue: '' });
      } else {
        setTextInputValue('');
      }
    } else {
      if (mainSearch) {
        setTextInputValue(mainSearch.mainSearchValue);
      }
      setMainSearch(prev => ({ ...prev, isTyping: true }));
      setMainScreenToggles(prev => ({ ...prev, toggleRestaurantSearch: true }));
    }
  };

  const onChangeTextHandler = (text: string) => {
    setTextInputValue(text);
  };

  const onSubmitEditingHandler = () => {
    setMainScreenToggles(prev => ({ ...prev, toggleRestaurantSearch: !prev.toggleRestaurantSearch }));
    setMainSearch({ isTyping: false, mainSearchValue: textInputValue });
  };

  useEffect(() => {
    reRestaurants();
  }, [mainSearch.isTyping, reRestaurants]);

  return (
    <View style={styles.wrap}>
      {!toggleRestaurantSearch && (
        <>
          <View style={styles.logo}>
            <Text>logo</Text>
          </View>
          {mainSearch.mainSearchValue && (
            <View style={styles.mainSearchWrap}>
              <Button style={styles.mainSearch} onPress={toggleRestaurantSearchHandler}>
                <Text numberOfLines={1} ellipsizeMode="tail">
                  {mainSearch.mainSearchValue}
                </Text>
              </Button>
              <Button style={styles.initMainSearchButton} onPress={initMainSearchHandler}>
                <Ionicons name="close-outline" size={35} color={Colors.mainGreen2} />
              </Button>
            </View>
          )}
        </>
      )}
      <View style={toggleRestaurantSearch ? styles.onSearch : styles.offSearch}>
        <Button onPress={toggleRestaurantSearchHandler} style={styles.searchIcon}>
          <Ionicons name={toggleRestaurantSearch ? 'chevron-back' : 'search'} size={30} color={Colors.mainWhite3} />
        </Button>
        {toggleRestaurantSearch && (
          <>
            <TextInput
              keyboardType="web-search"
              autoCapitalize="none"
              style={styles.searchInput}
              onChangeText={onChangeTextHandler}
              onSubmitEditing={onSubmitEditingHandler}
              value={textInputValue}
            />
            <Button style={styles.initMainSearchButton} onPress={initMainSearchHandler}>
              <Ionicons name="close-outline" size={35} color={Colors.mainGreen2} />
            </Button>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 50,
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 10,
    zIndex: 2,
    gap: 10,
  },
  logo: {
    height: 50,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainGreen2,
    ...Shadow,
  },
  mainSearchWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.mainWhite1,
    borderRadius: 5,
    ...Shadow,
  },
  mainSearch: {
    flex: 1,
    paddingHorizontal: 10,
  },
  initMainSearchButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offSearch: {
    height: 50,
    width: 50,
    borderRadius: 5,
    overflow: 'hidden',
  },
  onSearch: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.mainGreen2,
    backgroundColor: Colors.mainWhite1,
  },
  searchIcon: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainGreen2,
  },
  searchInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },
});

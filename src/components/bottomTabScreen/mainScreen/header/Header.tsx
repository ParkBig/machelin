import { LayoutAnimation, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadow } from 'const/global-styles';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { mainScreenTogglesState, toggleNearbySearchState } from 'store/toggleState';
import Button from 'components/common/layout/Button';
import { mainSearchState } from 'store/searchState';
import { useState } from 'react';
import { searchRadiusState } from 'store/locationState';
import { StatusBarHeight } from 'const/dimenstions';

export default function Header() {
  const [textInputValue, setTextInputValue] = useState('');
  const [mainSearch, setMainSearch] = useRecoilState(mainSearchState);
  const searchRadius = useRecoilValue(searchRadiusState);
  const [{ toggleRestaurantSearch, toggleRestaurantList }, setMainScreenToggles] =
    useRecoilState(mainScreenTogglesState);
  const setToggleNearbySearch = useSetRecoilState(toggleNearbySearchState);

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
      setMainScreenToggles({ toggleRestaurantSearch: true, toggleOptions: false, toggleRestaurantList: false });
    }
  };

  const onChangeTextHandler = (text: string) => {
    setTextInputValue(text);
  };

  const onSubmitEditingHandler = () => {
    setMainScreenToggles(prev => ({ ...prev, toggleRestaurantSearch: !prev.toggleRestaurantSearch }));
    setMainSearch({ isTyping: false, mainSearchValue: textInputValue });
    
    if (textInputValue.length > 0) {
      setToggleNearbySearch(true);
    }
  };

  const onFocusHandler = () => {
    if (toggleRestaurantList) {
      setMainScreenToggles(prev => ({ ...prev, toggleRestaurantList: false }));
    }
  };

  return (
    <View style={styles.wrap}>
      {!toggleRestaurantSearch && (
        <>
          <View style={styles.logo}>
            <Ionicons name="restaurant" size={35} color={Colors.mainWhite3} />
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
              onFocus={onFocusHandler}
              onChangeText={onChangeTextHandler}
              onSubmitEditing={onSubmitEditingHandler}
              value={textInputValue}
              placeholder={`키워드, 식당명을 통해 검색 (${searchRadius}m)`}
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
    top: StatusBarHeight && Platform.OS === 'android' ? StatusBarHeight + 10 : StatusBarHeight,
    zIndex: 2,
    gap: 10,
  },
  logo: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
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
    paddingLeft: 10,
  },
});

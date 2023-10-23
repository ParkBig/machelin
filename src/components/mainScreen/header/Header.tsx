import { LayoutAnimation, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadow } from 'const/global-styles';
import { useRecoilState } from 'recoil';
import { toggleSearchState } from 'store/toggleState';
import { TextInput } from 'react-native-gesture-handler';
import Button from 'components/common/Button';

export default function Header() {
  const [toggleSearch, setToggleSearch] = useRecoilState(toggleSearchState);

  const toggleSearchHandler = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setToggleSearch(prev => !prev);
  };

  return (
    <View style={styles.wrap}>
      {!toggleSearch && (
        <View style={styles.logo}>
          <Text>logo</Text>
        </View>
      )}
      <View style={toggleSearch ? styles.onSearch : styles.offSearch}>
        <Button onPress={toggleSearchHandler} style={styles.searchIcon}>
          <Ionicons name={toggleSearch ? 'chevron-back' : 'search'} size={25} color="white" />
        </Button>
        {toggleSearch && <TextInput keyboardType="web-search" autoCapitalize="none" style={styles.searchInput} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 40,
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: StatusBar.currentHeight,
    zIndex: 2,
  },
  logo: {
    height: 40,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainGreen3,
    ...Shadow,
  },
  offSearch: {
    height: 40,
    width: 40,
    borderRadius: 6,
    overflow: 'hidden',
    ...Shadow,
  },
  onSearch: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    borderRadius: 6,
    overflow: 'hidden',
    ...Shadow,
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
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: 'red',
  },
});

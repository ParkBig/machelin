import Button from 'components/common/Button';
import { Colors, Size } from 'const/global-styles';
import { LayoutAnimation, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Title from './Title';
import Search from './Search';

interface Props {
  isFollow: boolean;
  setIsFollow: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSearch: boolean;
  setToggleSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SocialTitle({ isFollow, setIsFollow, toggleSearch, setToggleSearch }: Props) {
  const toggleSearchHandler = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setToggleSearch(prev => !prev);
  };

  return (
    <View style={styles.wrap}>
      {!toggleSearch && <Title isFollow={isFollow} setIsFollow={setIsFollow} />}
      <View style={styles.search}>
        <Button onPress={toggleSearchHandler} style={styles.searchButton}>
          <Ionicons name={toggleSearch ? 'chevron-back-outline' : 'search-outline'} size={30} />
        </Button>
        {toggleSearch && <Search />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  titleButton: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  line: {
    height: '40%',
    width: 2,
    backgroundColor: Colors.mainGreen2,
  },
  titleText: {
    fontSize: Size.normalMiddle,
  },
  focusedText: {
    fontWeight: 'bold',
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.mainGreen1,
    borderRadius: 10,
  },
  searchButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  searchLine: {
    width: 2,
    height: 25,
    backgroundColor: Colors.mainGreen1,
  },
});

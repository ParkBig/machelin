import Button from 'components/common/layout/Button';
import { Colors, Size } from 'const/global-styles';
import { LayoutAnimation, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { WhichClickedInMyInfoSocialState, whichClickedInMyInfoSocialState } from 'store/toggleState';
import SearchInput from './SearchInput';
import { searchNickNameState } from 'store/searchState';

export default function Title() {
  const [whichClickedInMyInfoSocial, setWhichClickedInMyInfoSocial] = useRecoilState(whichClickedInMyInfoSocialState);
  const setSearchNickName = useSetRecoilState(searchNickNameState);

  const whichClicked =
    whichClickedInMyInfoSocial === 'follow'
      ? 'follow'
      : whichClickedInMyInfoSocial === 'follower'
      ? 'follower'
      : whichClickedInMyInfoSocial === 'search'
      ? 'search'
      : null;

  const setWhichClickedInMyInfoSocialHandler = (which: WhichClickedInMyInfoSocialState) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (whichClickedInMyInfoSocial === which) {
      if (which === 'search') {
        setSearchNickName({ isTyping: false, searchText: '' })
      }

      setWhichClickedInMyInfoSocial(null);
      return;
    }
    setWhichClickedInMyInfoSocial(which);
  };

  return (
    <View style={styles.wrap}>
      {whichClicked !== 'search' && (
        <>
          <Button style={styles.button} onPress={setWhichClickedInMyInfoSocialHandler.bind(null, 'follow')}>
            <Text style={[styles.buttonText, whichClicked === 'follow' && { fontSize: Size.bigSmall }]}>팔로우</Text>
          </Button>
          <Button style={styles.button} onPress={setWhichClickedInMyInfoSocialHandler.bind(null, 'follower')}>
            <Text style={[styles.buttonText, whichClicked === 'follower' && { fontSize: Size.bigSmall }]}>팔로워</Text>
          </Button>
        </>
      )}
      {whichClicked === 'search' && <SearchInput />}
      <Button style={styles.ionicons} onPress={setWhichClickedInMyInfoSocialHandler.bind(null, 'search')}>
        <Ionicons name={whichClicked === 'search' ? 'close' : 'search'} size={30} color={Colors.mainWhite3} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: Colors.mainGreen2,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.mainWhite3,
    fontWeight: 'bold',
  },
  ionicons: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

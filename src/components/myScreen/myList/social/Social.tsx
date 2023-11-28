import { useEffect, useState } from 'react';
import { BackHandler, LayoutAnimation, StyleSheet, View } from 'react-native';
import SocialTitle from './title/SocialTitle';
import SocialList from './list/SocialList';
import { useQueryClient } from 'react-query';
import { searchNickNameState } from 'store/searchState';
import { useSetRecoilState } from 'recoil';

export default function Social() {
  const queryClient = useQueryClient();
  const [isFollow, setIsFollow] = useState(true);
  const [toggleSearch, setToggleSearch] = useState(false);
  const setSearchNickName = useSetRecoilState(searchNickNameState);

  useEffect(() => {
    setSearchNickName('');
    queryClient.removeQueries(['userList']);

    const backButtonHandler = () => {
      if (toggleSearch) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setToggleSearch(false);
        return true;
      }
    };

    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
    };
  }, [toggleSearch, setToggleSearch, setSearchNickName]);

  return (
    <View style={styles.wrap}>
      <SocialTitle
        isFollow={isFollow}
        setIsFollow={setIsFollow}
        toggleSearch={toggleSearch}
        setToggleSearch={setToggleSearch}
      />
      <SocialList isFollow={isFollow} toggleSearch={toggleSearch} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingHorizontal: 15,
  },
});

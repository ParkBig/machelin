import MyInfo from 'components/topTabScreen/myInfoScreen/myInfo/MyInfo';
import Social from 'components/topTabScreen/myInfoScreen/social/Social';
import { Colors } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { whichClickedInMyInfoSocialState } from 'store/toggleState';

export default function MyInfoScreen() {
  const { reMyInfo } = useMyInfoQuery();
  const scrollViewRef = useRef<ScrollView>(null);
  const [refreshing, setRefreshing] = useState(false);
  const whichClickedInMyInfoSocial = useRecoilValue(whichClickedInMyInfoSocialState);
  const resetWhichClickedInMyInfoSocialState = useResetRecoilState(whichClickedInMyInfoSocialState);

  const onRefreshHandler = () => {
    setRefreshing(true);
    reMyInfo();
    resetWhichClickedInMyInfoSocialState();
    setRefreshing(false);
  };

  useEffect(() => {
    if (whichClickedInMyInfoSocial) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [whichClickedInMyInfoSocial]);
  
  return (
    <ScrollView
      ref={scrollViewRef}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshHandler} />}
      showsVerticalScrollIndicator={false}
      style={styles.wrap}
    >
      <MyInfo />
      <Social />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: Colors.mainWhite1,
  },
});

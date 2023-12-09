import { ScrollView, StyleSheet } from 'react-native';
import { StackScreenPropsAbout } from 'types/screen/screenType';
import { useEffect } from 'react';
import { Colors } from 'const/global-styles';
import { useResetRecoilState } from 'recoil';
import { clickedExploreUserInfoListTypeState } from 'store/userInfoState';
import UsersList from 'components/stackScreen/ExploreUserInfoScreen/usersList/UsersList';
import ExploreUsersInfo from 'components/stackScreen/ExploreUserInfoScreen/exploreUsersInfo/ExploreUsersInfo';
import ExploreContentsSelector from 'components/stackScreen/ExploreUserInfoScreen/exploreContentsSelector/ExploreContentsSelector';
import useExploreUserQuery from 'query/hooks/exploreUsers/useExploreUserQuery';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';

export default function ExploreUserInfoScreen({ navigation, route }: StackScreenPropsAbout<'ExploreUserInfoScreen'>) {
  const resetClickedExploreUserInfoListType = useResetRecoilState(clickedExploreUserInfoListTypeState);
  const { myInfoIsLoading } = useMyInfoQuery();
  const { exploreUserInfoIsLoading } = useExploreUserQuery(route.params.userId);

  useEffect(() => {
    resetClickedExploreUserInfoListType();
  }, [navigation]);

  return (
    <>
      <ScrollView style={styles.wrap}>
        <ExploreUsersInfo />
        <ExploreContentsSelector />
        <UsersList />
      </ScrollView>
      {(myInfoIsLoading || exploreUserInfoIsLoading) && <LoadingOverlay style={styles.loadingOverlay} />}
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Colors.mainWhite1,
  },
  loadingOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGrayOpacity1,
    position: 'absolute',
    zIndex: 100,
  },
});

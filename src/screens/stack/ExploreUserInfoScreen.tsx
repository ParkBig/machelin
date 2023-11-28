import { ScrollView, StyleSheet } from 'react-native';
import { StackScreenPropsAbout } from 'types/screen/screenType';
import { useEffect } from 'react';
import { Colors } from 'const/global-styles';
import { useResetRecoilState } from 'recoil';
import { clickedExploreUserInfoListTypeState } from 'store/userInfoState';
import UsersList from 'components/ExploreUserInfoScreen/usersList/UsersList';
import LoadingOverlay from 'components/common/LoadingOverlay';
import ExploreUsersInfo from 'components/ExploreUserInfoScreen/exploreUsersInfo/ExploreUsersInfo';
import ExploreContentsSelector from 'components/ExploreUserInfoScreen/exploreContentsSelector/ExploreContentsSelector';
import useExploreUserQuery from 'query/hooks/exploreUsers/useExploreUserQuery';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';

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
      {(myInfoIsLoading || exploreUserInfoIsLoading) && <LoadingOverlay />}
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Colors.mainWhite1,
  },
});

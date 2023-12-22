import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet } from 'react-native';
import { StackScreenPropsAbout } from 'types/screenType';
import { useEffect, useState } from 'react';
import { Colors } from 'const/global-styles';
import { useResetRecoilState } from 'recoil';
import UsersList from 'components/stackScreen/ExploreUserInfoScreen/usersList/UsersList';
import ExploreUsersInfo from 'components/stackScreen/ExploreUserInfoScreen/exploreUsersInfo/ExploreUsersInfo';
import ExploreContentsSelector from 'components/stackScreen/ExploreUserInfoScreen/exploreContentsSelector/ExploreContentsSelector';
import useExploreUserQuery from 'query/hooks/exploreUsers/useExploreUserQuery';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import useExploreUsersPostsQuery from 'query/hooks/exploreUsers/useExploreUsersPostsQuery';
import { ScreenHeight } from 'const/dimenstions';
import { clickedExploreUserInfoListTypeState } from 'store/toggleState';

export default function ExploreUserInfoScreen({ navigation, route }: StackScreenPropsAbout<'ExploreUserInfoScreen'>) {
  const resetClickedExploreUserInfoListType = useResetRecoilState(clickedExploreUserInfoListTypeState);
  const { fetchNextPagePosts } = useExploreUsersPostsQuery(route.params.userId);
  const { exploreUserInfoIsLoading } = useExploreUserQuery(route.params.userId);
  const [contentsHeight, setContentHeight] = useState(0);

  const onScrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (event.nativeEvent.contentOffset.y > contentsHeight - ScreenHeight - 100) {
      fetchNextPagePosts();
    }
  };

  useEffect(() => {
    resetClickedExploreUserInfoListType();
  }, [navigation]);

  return (
    <>
      <ScrollView
        style={styles.wrap}
        onScrollEndDrag={onScrollHandler}
        onContentSizeChange={(w: number, h: number) => {
          setContentHeight(h);
        }}
      >
        <ExploreUsersInfo />
        <ExploreContentsSelector />
        <UsersList />
      </ScrollView>
      {exploreUserInfoIsLoading && <LoadingOverlay style={styles.loadingOverlay} />}
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

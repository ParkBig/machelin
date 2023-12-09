import MyInfos from 'components/bottomTabScreen/myScreen/myInfo/MyInfos';
import MyList from 'components/bottomTabScreen/myScreen/myList/MyList';
import { Colors } from 'const/global-styles';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import ContentsSelector from 'components/bottomTabScreen/myScreen/contentsSeclector/ContentsSelector';
import { RefreshControl } from 'react-native-gesture-handler';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { useRecoilValue } from 'recoil';
import { clickedMyInfoListTypeState } from 'store/userInfoState';
import useUsersBookmarksQuery from 'query/hooks/users/useUsersBookmarksQuery';
import useUsersPostsQuery from 'query/hooks/users/useUsersPostsQuery';
import useUsersFollowersQuery from 'query/hooks/users/useUsersFollowersQuery';
import useUsersFollowsQuery from 'query/hooks/users/useUsersFollowsQuery';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';

export default function MyScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { myInfo, myInfoIsLoading, reMyInfo } = useMyInfoQuery();
  const clickedMyInfoListType = useRecoilValue(clickedMyInfoListTypeState);
  const { reBookmarks } = useUsersBookmarksQuery(myInfo?.authUser?.id);
  const { rePosts } = useUsersPostsQuery(myInfo?.authUser?.id);
  const { reFollowers } = useUsersFollowersQuery(myInfo?.authUser?.id);
  const { reFollows } = useUsersFollowsQuery(myInfo?.authUser?.id);

  const onRefreshHandler = () => {
    setRefreshing(true);
    reMyInfo();
    if (clickedMyInfoListType === 'posts') {
      rePosts();
    } else if (clickedMyInfoListType === 'bookMark') {
      reBookmarks();
    } else if (clickedMyInfoListType === 'follow') {
      reFollows();
      reFollowers();
    }
    setRefreshing(false);
  };

  return (
    <>
      <ScrollView
        nestedScrollEnabled={false}
        style={styles.wrap}
        scrollEnabled={!myInfoIsLoading}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshHandler} />}
      >
        <MyInfos />
        <ContentsSelector />
        <MyList />
      </ScrollView>
      {myInfoIsLoading && <LoadingOverlay style={styles.loadingOverlay} />}
    </>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    paddingRight: 10,
  },
  wrap: {
    flex: 1,
    backgroundColor: Colors.mainWhite1,
  },
  line: {
    width: '100%',
    height: 6,
    backgroundColor: Colors.mainGreen2,
    borderRadius: 30,
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

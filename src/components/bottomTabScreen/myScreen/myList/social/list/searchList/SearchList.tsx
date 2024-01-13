import { FlatList, StyleSheet, View } from 'react-native';
import useUserSearchQuery from 'query/hooks/users/useUserSearchQuery';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import AvailableAfterLogin from 'components/common/modal/AvailableAfterLogin';
import NoSearchList from './NoSearchList';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import BriefUserInfo from '../BriefUserInfo';

export default function SearchList() {
  const { myInfo } = useMyInfoQuery();
  const { userList, userListIsLoading } = useUserSearchQuery();

  return (
    <View>
      {myInfo?.authUser ? (
        userList?.users ? userList.users.length !== 0 ? (
          <FlatList
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 5 }}
            keyExtractor={item => `${item.id}`}
            data={userList?.users}
            renderItem={({ item }) => <BriefUserInfo key={item.id} userInfo={item} />}
          />
        ) : (
          <NoSearchList msg='검색어에 해당하는 유저가 없습니다' />
        ) : (
          <NoSearchList msg='검색하여 유저를 찾아보아요' />
        )
      ) : (
        <AvailableAfterLogin />
      )}
      {userListIsLoading && <LoadingOverlay style={styles.loadingOverlay} />}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingOverlay: {
    width: '100%',
    height: '100%',
    paddingTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
  },
});

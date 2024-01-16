import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import useUserSearchQuery from 'query/hooks/users/useUserSearchQuery';
import { FlatList, StyleSheet, View } from 'react-native';
import BriefUserInfo from '../common/BriefUserInfo';
import NoSearchList from '../common/NoSearchList';

export default function SearchList() {
  const { userList, userListIsLoading } = useUserSearchQuery();

  return (
    <View style={styles.wrap}>
      {userList?.users ? (
        userList.users.length !== 0 ? (
          <FlatList
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 5 }}
            data={userList?.users}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => <BriefUserInfo key={item.id} userInfo={item} />}
          />
        ) : (
          <NoSearchList msg="검색어에 해당하는 유저가 없습니다" />
        )
      ) : (
        <NoSearchList msg="검색하여 유저를 찾아보아요" />
      )}
      {userListIsLoading && <LoadingOverlay style={styles.loadingOverlay} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    minHeight: 300,
  },
  loadingOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});

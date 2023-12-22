import { View } from 'react-native';
import BriefUserInfo from './BriefUserInfo';
import NoSocial from './NoSocial';
import useUsersFollowsQuery from 'query/hooks/users/useUsersFollowsQuery';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { FlatList } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import AvailableAfterLogin from 'components/common/modal/AvailableAfterLogin';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';

export default function FollowList() {
  const { myInfo } = useMyInfoQuery();
  const { follows, followsIsLoading, isReFollows } = useUsersFollowsQuery(myInfo?.authUser?.id);
  const followsExist = follows?.follows && follows.follows.length !== 0 ? true : false;

  return (
    <View>
      {myInfo?.authUser ? (
        followsExist ? (
          <FlatList
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 5 }}
            data={follows?.follows}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => <BriefUserInfo key={item.id} userInfo={item} />}
          />
        ) : (
          <NoSocial type="follow" />
        )
      ) : (
        <AvailableAfterLogin />
      )}
      {(followsIsLoading || isReFollows) && <LoadingOverlay style={styles.loadingOverlay} />}
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

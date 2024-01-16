import Line from 'components/common/layout/Line';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import { Colors } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import useUsersStampsQuery from 'query/hooks/users/useUsersStampsQuery';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Stamp from './Stamp';

export default function Stamps() {
  const { myInfo } = useMyInfoQuery();
  const { stamps, stampIsLoading } = useUsersStampsQuery();
  const stampsIsExist = stamps?.stamps && stamps.stamps.length !== 0 ? true : false;

  return (
    <View style={styles.wrap}>
      {myInfo?.authUser ? (
        stampIsLoading ? (
          <LoadingOverlay style={styles.loadingOverlay} />
        ) : stampsIsExist ? (
          <FlatList
            style={styles.flatList}
            showsVerticalScrollIndicator={false}
            data={stamps?.stamps}
            keyExtractor={item => `${item.id}`}
            ItemSeparatorComponent={() => <Line style={styles.line} />}
            renderItem={({ item }) => <Stamp stamp={item} />}
          />
        ) : (
          <View style={styles.none}>
            <Text>스탬프를 남긴 곳이 없어요</Text>
          </View>
        )
      ) : (
        <View style={styles.none}>
          <Text>로그인 후 기록해 보아요</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    maxHeight: 272,
    backgroundColor: Colors.mainWhite1,
    borderTopWidth: 3,
    borderRadius: 5,
    borderTopColor: Colors.mainGreen2,
  },
  loadingOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    paddingHorizontal: 10,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.lightGray,
  },
  none: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

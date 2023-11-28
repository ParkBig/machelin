import MyInfos from 'components/myScreen/myInfo/MyInfos';
import MyList from 'components/myScreen/myList/MyList';
import { Colors } from 'const/global-styles';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import LoadingOverlay from 'components/common/LoadingOverlay';
import ContentsSelector from 'components/myScreen/contentsSeclector/ContentsSelector';
import { RefreshControl } from 'react-native-gesture-handler';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';

export default function MyScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { myInfoIsLoading, reMyInfo } = useMyInfoQuery();

  const onRefreshHandler = () => {
    setRefreshing(true);
    reMyInfo();
    setRefreshing(false);
  };

  return (
    <>
      <ScrollView
        style={styles.wrap}
        scrollEnabled={!myInfoIsLoading}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshHandler} />}
      >
        <MyInfos />
        <ContentsSelector />
        <MyList />
      </ScrollView>
      {myInfoIsLoading && <LoadingOverlay />}
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
});

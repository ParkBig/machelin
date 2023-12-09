import Line from 'components/common/layout/Line';
import { Colors, Size } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { StyleSheet, Text, View } from 'react-native';

export default function AdditionalInfos() {
  const { myInfo } = useMyInfoQuery();

  if (!myInfo?.authUser) return null;

  return (
    <View style={styles.wrap}>
      <View style={styles.info}>
        <View style={styles.title}>
          <Text style={styles.text}>활동구역</Text>
          <Line style={styles.line} />
        </View>
        <View style={styles.content}>
          {!myInfo.authUser.activityZone ? (
            <Text style={styles.noneText}>활동구역이 없어요...</Text>
          ) : (
            <Text>{myInfo.authUser.activityZone}</Text>
          )}
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.title}>
          <Text style={styles.text}>선호음식</Text>
          <Line style={styles.line} />
        </View>
        <View style={styles.medalsEarned}>
          {myInfo.authUser.preferFoods.length === 0 ? (
            <Text style={styles.noneText}>선호음식이 없어요...</Text>
          ) : (
            myInfo.authUser.preferFoods.map((preferFood, i) => <Text key={preferFood + i}>{preferFood}</Text>)
          )}
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.title}>
          <Text style={styles.text}>최애식당</Text>
          <Line style={styles.line} />
        </View>
        <View style={styles.content}>
          {!myInfo.authUser.preferRestaurant ? (
            <Text style={styles.noneText}>최애식당이 없어요...</Text>
          ) : (
            <Text>{myInfo.authUser.preferRestaurant}</Text>
          )}
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.title}>
          <Text style={styles.text}>획득메달</Text>
          <Line style={styles.line} />
        </View>
        <View style={styles.content}>
          {myInfo.authUser.medalsEarned.length === 0 ? (
            <Text style={styles.noneText}>획득한메달이 없어요...</Text>
          ) : (
            myInfo.authUser.medalsEarned.map((medalEarned, i) => <Text key={medalEarned + i}>{medalEarned}</Text>)
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingHorizontal: 10,
  },
  info: {
    width: '100%',
    minHeight: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 1,
    height: '50%',
    marginHorizontal: 10,
    backgroundColor: Colors.mainGreen2,
  },
  content: {
    flex: 1,
  },
  medalsEarned: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingVertical: 5,
    gap: 10,
  },
  text: {
    fontSize: Size.normalMiddle,
  },
  noneText: {
    fontSize: Size.normalMiddle,
    color: Colors.gray,
  },
});

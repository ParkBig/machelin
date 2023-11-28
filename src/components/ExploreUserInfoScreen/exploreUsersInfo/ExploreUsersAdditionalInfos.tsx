import { useRoute } from '@react-navigation/native';
import Line from 'components/common/Line';
import { Colors, Size } from 'const/global-styles';
import useExploreUserQuery from 'query/hooks/exploreUsers/useExploreUserQuery';
import { StyleSheet, Text, View } from 'react-native';
import { UseRouter } from 'types/screen/screenType';

export default function ExploreUsersAdditionalInfos() {
  const { params } = useRoute<UseRouter<'ExploreUserInfoScreen'>>();
  const { exploreUser } = useExploreUserQuery(params.userId);

  return (
    <View style={styles.wrap}>
      <View style={styles.info}>
        <View style={styles.title}>
          <Text style={styles.text}>활동구역</Text>
          <Line style={styles.line} />
        </View>
        <View style={styles.content}>
          {!exploreUser?.exploreUser.activityZone ? (
            <Text style={styles.noneText}>활동구역이 없어요...</Text>
          ) : (
            <Text>{exploreUser?.exploreUser.activityZone}</Text>
          )}
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.title}>
          <Text style={styles.text}>선호음식</Text>
          <Line style={styles.line} />
        </View>
        <View style={styles.medalsEarned}>
          {exploreUser?.exploreUser.preferFoods.length === 0 ? (
            <Text style={styles.noneText}>선호음식이 없어요...</Text>
          ) : (
            exploreUser?.exploreUser.preferFoods.map((preferFood, i) => <Text key={preferFood + i}>{preferFood}</Text>)
          )}
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.title}>
          <Text style={styles.text}>최애식당</Text>
          <Line style={styles.line} />
        </View>
        <View style={styles.content}>
          {!exploreUser?.exploreUser.preferRestaurant ? (
            <Text style={styles.noneText}>최애식당이 없어요...</Text>
          ) : (
            <Text>{exploreUser?.exploreUser.preferRestaurant}</Text>
          )}
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.title}>
          <Text style={styles.text}>획득메달</Text>
          <Line style={styles.line} />
        </View>
        <View style={styles.content}>
          {exploreUser?.exploreUser.medalsEarned.length === 0 ? (
            <Text style={styles.noneText}>획득한메달이 없어요...</Text>
          ) : (
            exploreUser?.exploreUser.medalsEarned.map((medalEarned, i) => (
              <Text key={medalEarned + i}>{medalEarned}</Text>
            ))
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

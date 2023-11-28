import Button from 'components/common/Button';
import Line from 'components/common/Line';
import { Colors, Size } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { StyleSheet, Text, View } from 'react-native';

export default function MedalsEarned() {
  const { myInfo } = useMyInfoQuery();

  return (
    <View style={styles.wrap}>
      <View style={styles.title}>
        <Text style={styles.titleText}>획득메달</Text>
        <Line style={styles.line} />
      </View>
      <Button style={styles.medalsEarnedWrap}>
        <View style={styles.medalsEarned}>
          {myInfo?.authUser.medalsEarned.length === 0 ? (
            <Text style={styles.noneText}>획득한메달이 없어요...</Text>
          ) : (
            myInfo?.authUser.medalsEarned.map((medalEarned, i) => <Text key={medalEarned + i}>{medalEarned}</Text>)
          )}
        </View>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    minHeight: 60,
    width: '100%',
    paddingHorizontal: 10,
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
  titleText: {
    fontWeight: 'bold',
  },
  line: {
    width: 2,
    height: '50%',
    marginHorizontal: 10,
    backgroundColor: Colors.mainGreen2,
  },
  medalsEarnedWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    gap: 10,
  },
  medalsEarned: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  noneText: {
    fontSize: Size.normalMiddle,
    color: Colors.gray,
  },
});

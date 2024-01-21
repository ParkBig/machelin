import Line from 'components/common/layout/Line';
import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/layout/Button';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screenType';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';

export default function ActivityZone() {
  const { navigate } = useNavigation<UseNavigation<'MyInfoScreen'>>();
  const { myInfo } = useMyInfoQuery();

  const navigateToChangeMyActivityZoneHandler = () => {
    navigate('ChangeMyActivityZoneScreen');
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.title}>
        <Text style={styles.titleText}>활동구역</Text>
        <Line style={styles.line} />
      </View>
      <Button style={styles.activityZone} onPress={navigateToChangeMyActivityZoneHandler}>
        {!myInfo?.authUser?.activityZone ? (
          <Text style={styles.noneText}>활동구역이 없어요...</Text>
        ) : (
          <Text>{myInfo.authUser.activityZone}</Text>
        )}
        <Ionicons name="chevron-forward-outline" size={20} />
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
  activityZone: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    flexWrap: 'wrap',
    gap: 5,
  },
  noneText: {
    fontSize: Size.normalMiddle,
    color: Colors.gray,
  },
});

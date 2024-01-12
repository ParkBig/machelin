import Button from 'components/common/layout/Button';
import Line from 'components/common/layout/Line';
import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screenType';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';

export default function PreferFoods() {
  const { navigate } = useNavigation<UseNavigation<'ChangeMyPreferFoodsScreen'>>();
  const { myInfo } = useMyInfoQuery();

  const preferFoods = myInfo?.authUser.preferFoods.length ? myInfo?.authUser.preferFoods.join(', ') : null;

  const navigateToChangeMyPreferFoodsHandler = () => {
    navigate('ChangeMyPreferFoodsScreen');
  };

  const preferFoods = myInfo?.authUser.preferFoods.length ? myInfo?.authUser.preferFoods.join(', ') : null;

  return (
    <View style={styles.wrap}>
      <View style={styles.title}>
        <Text style={styles.titleText}>선호음식</Text>
        <Line style={styles.line} />
      </View>
      <Button style={styles.preferFoodsWrap} onPress={navigateToChangeMyPreferFoodsHandler}>
        <View style={styles.preferFoods}>
          {preferFoods ? <Text>{preferFoods}</Text> : <Text style={styles.noneText}>선호음식이 없어요...</Text>}
        </View>
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
  preferFoodsWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    gap: 10,
  },
  preferFoods: {
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

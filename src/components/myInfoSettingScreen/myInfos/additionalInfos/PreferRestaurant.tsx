import Line from 'components/common/Line';
import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screen/screenType';
import Button from 'components/common/Button';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';

export default function PreferRestaurant() {
  const { navigate } = useNavigation<UseNavigation<'MyInfoSettingScreen'>>();
  const { myInfo } = useMyInfoQuery();

  const navigateToChangeMyPreferRestaurantHandler = () => {
    navigate('ChangeMyPreferRestaurantScreen');
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.title}>
        <Text style={styles.titleText}>최애식당</Text>
        <Line style={styles.line} />
      </View>
      <Button style={styles.preferRestaurant} onPress={navigateToChangeMyPreferRestaurantHandler}>
        {!myInfo?.authUser.preferRestaurant ? (
          <Text style={styles.noneText}>최애식당이 없어요...</Text>
        ) : (
          <Text>{myInfo?.authUser.preferRestaurant}</Text>
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
  preferRestaurant: {
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

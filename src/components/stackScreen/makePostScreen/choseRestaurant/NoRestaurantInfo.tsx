import Button from 'components/common/layout/Button';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Size } from 'const/global-styles';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screen/screenType';

export default function NoRestaurantInfo() {
  const { navigate } = useNavigation<UseNavigation<'MakePostScreen'>>();

  const gotoTagRestaurantHandler = () => {
    navigate('FindRestaurantInfoForMakePostScreen');
  };

  return (
    <>
      <View style={styles.textWrap}>
        <Text style={styles.titleText}>식당정보, </Text>
        <Text>태그 할까요?</Text>
      </View>
      <Button style={styles.button} onPress={gotoTagRestaurantHandler}>
        <Text style={styles.buttonText}>태그하기</Text>
        <Ionicons name="chevron-forward" size={25} color={Colors.darkGray} />
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  textWrap: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleText: {
    fontSize: Size.normalBig,
  },
  button: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: Colors.darkGray,
    fontSize: Size.normalMiddle,
  },
});

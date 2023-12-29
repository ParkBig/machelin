import Button from 'components/common/layout/Button';
import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screenType';

export default function GoToTagRestaurantInfo() {
  const { navigate } = useNavigation<UseNavigation<'MakeStampScreen'>>();

  const gotoTagRestaurantHandler = () => {
    navigate('FindRestaurantInfoScreen', {
      forWhich: 'stamp',
    });
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.textWrap}>
        <Text style={styles.titleText}>장소, </Text>
        <Text>태그 할까요?</Text>
      </View>
      <Button style={styles.button} onPress={gotoTagRestaurantHandler}>
        <Text style={styles.buttonText}>태그하기</Text>
        <Ionicons name="chevron-forward" size={25} color={Colors.darkGray} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
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

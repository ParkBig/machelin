import Button from 'components/common/layout/Button';
import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { GooglePlace } from 'types/types';
import { Ionicons } from '@expo/vector-icons';
import { useSetRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screenType';
import { makeStampState } from 'store/makeStampState';

interface Props {
  restaurantInfo: GooglePlace;
}

export default function BriefRestaurantInfoForStamp({ restaurantInfo }: Props) {
  const { goBack } = useNavigation<UseNavigation<'MakeStampScreen'>>();
  const setMakeStampValues = useSetRecoilState(makeStampState);

  const onPressHandler = () => {
    const restaurantInfoParams = {
      restaurantId: restaurantInfo.place_id,
      restaurantName: restaurantInfo.name,
      address: restaurantInfo.formatted_address ? restaurantInfo.formatted_address : restaurantInfo.vicinity,
    };

    setMakeStampValues(prev => ({ ...prev, restaurantInfo: restaurantInfoParams }));
    goBack();
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.info}>
        <View style={styles.name}>
          <Text style={styles.nameText}>{restaurantInfo.name}</Text>
        </View>
        <View style={styles.address}>
          <Text style={styles.addressText}>{restaurantInfo.formatted_address}</Text>
        </View>
      </View>
      <Button style={styles.button} onPress={onPressHandler}>
        <Ionicons name="paw" size={30} color={Colors.mainGreen2} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    minHeight: 80,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  info: {
    flex: 8,
    justifyContent: 'center',
    gap: 10,
  },
  name: {
    flex: 1,
    justifyContent: 'center',
  },
  address: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: Colors.superLightGray,
  },
  nameText: {
    fontSize: Size.normalMiddle,
    fontWeight: 'bold',
  },
  addressText: {
    color: Colors.gray,
  },
  tagText: {
    color: Colors.mainGreen2,
    fontWeight: 'bold',
  },
});

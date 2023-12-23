import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { GooglePlace } from 'types/types';
import { UseNavigation } from 'types/screenType';

interface Props {
  restaurantInfo: GooglePlace;
}

export default function BriefRestaurantInfoForTag({ restaurantInfo }: Props) {
  const { navigate } = useNavigation<UseNavigation<'FindRestaurantInfoScreen'>>();

  const onPressHandler = () => {
    navigate('MakePostScreen', {
      restaurantInfo: restaurantInfo,
    });
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
        <Text style={styles.tagText}>태그</Text>
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

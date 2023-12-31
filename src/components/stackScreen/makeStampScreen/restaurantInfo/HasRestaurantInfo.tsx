import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { makeStampState } from 'store/makeStampState';
import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/layout/Button';

export default function HasRestaurantInfo() {
  const [{ restaurantInfo }, setMakeStampState] = useRecoilState(makeStampState);

  const deleteRestaurantInfoHandler = () => {
    setMakeStampState(prev => ({ ...prev, restaurantInfo: null }));
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.info}>
        <View style={styles.name}>
          <Text style={styles.nameText}>{restaurantInfo?.restaurantName}</Text>
        </View>
        <View style={styles.address}>
          <Text style={styles.addressText}>{restaurantInfo?.address}</Text>
        </View>
      </View>
      <Button style={styles.button} onPress={deleteRestaurantInfoHandler}>
        <Ionicons name="close" size={30} color={Colors.mainGreen2} />
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
    flex: 1,
    justifyContent: 'center',
    gap: 10,
  },
  name: {
    width: '100%',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  address: {
    width: '100%',
    justifyContent: 'center',
  },
  button: {
    width: 60,
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
});

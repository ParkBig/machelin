import Button from 'components/common/layout/Button';
import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UseNavigation, UseRouter } from 'types/screenType';

export default function TaggedRestaurantInfo() {
  const { params } = useRoute<UseRouter<'StampDetailScreen'>>();
  const { navigate } = useNavigation<UseNavigation<'StampDetailScreen'>>();

  const gotoRestaurantDetailHandler = () => {
    if (!params.stamp.restaurantName || !params.stamp.restaurantId) {
      return;
    }

    navigate('RestaurantDetailScreen', {
      restaurantName: params.stamp.restaurantName,
      restaurantId: params.stamp.restaurantId,
    });
  };

  return (
    <View style={styles.wrap}>
      {params.stamp.restaurantId && (
        <>
          <View style={styles.info}>
            <View style={styles.name}>
              <Text style={styles.nameText}>{params.stamp.restaurantName}</Text>
            </View>
            <View style={styles.address}>
              <Text style={styles.addressText}>{params.stamp.address}</Text>
            </View>
          </View>
          <Button style={styles.button} onPress={gotoRestaurantDetailHandler}>
            <Ionicons name="chevron-forward" size={30} color={Colors.darkGray} />
          </Button>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    minHeight: 80,
    flexDirection: 'row',
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
  },
  nameText: {
    fontSize: Size.normalMiddle,
    fontWeight: 'bold',
  },
  addressText: {
    color: Colors.gray,
  },
});

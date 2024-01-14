import { Linking, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Size } from 'const/global-styles';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { UseRouter } from 'types/screenType';
import useRestaurantDetailQuery from 'query/hooks/restaurants/useRestaurantDetailQuery';
import Button from 'components/common/layout/Button';

export default function RestaurantInfos() {
  const { params } = useRoute<UseRouter<'RestaurantDetailScreen'>>();
  const { restaurantDetail } = useRestaurantDetailQuery(params.restaurantId);
  const [isOpenTimeInfo, setIsOpenTimeInfo] = useState(false);
  const dayOfWeek = new Date().getDay();

  const toggleTimeInfo = () => {
    setIsOpenTimeInfo(prev => !prev);
  };

  const test = async () => {
    if (!restaurantDetail?.restaurantDetail) {
      return;
    }

    const supported = await Linking.canOpenURL(
      `https://www.google.com/search?q=${restaurantDetail?.restaurantDetail?.name}`
    );

    if (supported) {
      await Linking.openURL(`https://www.google.com/search?q=${restaurantDetail?.restaurantDetail?.name}`);
    }
  };

  return (
    <View style={styles.infos}>
      {restaurantDetail?.restaurantDetail?.formatted_address && (
        <View style={styles.info}>
          <Ionicons name="restaurant" size={30} color={Colors.mainGreen2} />
          <View style={styles.infoContent}>
            <Text style={styles.name}>{restaurantDetail?.restaurantDetail?.name}</Text>
          </View>
        </View>
      )}
      {restaurantDetail?.restaurantDetail?.formatted_address && (
        <View style={styles.info}>
          <Ionicons name="location" size={30} color={Colors.mainGreen2} />
          <View style={styles.infoContent}>
            <Text>{restaurantDetail?.restaurantDetail?.formatted_address}</Text>
          </View>
        </View>
      )}
      {restaurantDetail?.restaurantDetail?.formatted_phone_number && (
        <View style={styles.info}>
          <Ionicons name="call" size={30} color={Colors.mainGreen2} />
          <View style={styles.infoContent}>
            <Text>{restaurantDetail?.restaurantDetail?.formatted_phone_number}</Text>
          </View>
        </View>
      )}
      {restaurantDetail?.restaurantDetail?.opening_hours && (
        <View style={styles.info}>
          <Ionicons name="time" size={30} color={Colors.mainGreen2} />
          <Button style={styles.timeInfo} onPress={toggleTimeInfo}>
            <Text>
              {restaurantDetail?.restaurantDetail?.opening_hours?.weekday_text[dayOfWeek - 1 < 0 ? 6 : dayOfWeek - 1]}
            </Text>
            <Ionicons name={isOpenTimeInfo ? 'chevron-up' : 'chevron-down'} size={30} color={Colors.mainGreen2} />
          </Button>
        </View>
      )}
      {isOpenTimeInfo && (
        <View style={styles.detailTimeInfo}>
          <View>
            {restaurantDetail?.restaurantDetail?.opening_hours?.open_now ? (
              <Text style={styles.openText}>영업중입니다</Text>
            ) : (
              <Text style={styles.closeText}>영업종료</Text>
            )}
          </View>
          <View>
            {restaurantDetail?.restaurantDetail?.opening_hours?.weekday_text.map((time, index) => (
              <View key={index}>
                <Text>{time}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
      <View style={styles.info}>
        <Ionicons name="logo-google" size={30} color={Colors.mainGreen2} />
        <Button style={styles.infoContent} onPress={test}>
          <Text>구글 검색해 보기</Text>
          <Ionicons name="chevron-forward" size={30} color={Colors.mainGreen2} />
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infos: {
    width: '100%',
    paddingVertical: 25,
    paddingHorizontal: 15,
    gap: 10,
  },
  info: {
    width: '100%',
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  name: {
    fontWeight: 'bold',
    fontSize: Size.normalBig,
  },
  timeInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailTimeInfo: {
    paddingLeft: 35,
    paddingBottom: 10,
    gap: 5,
  },
  openText: {
    color: Colors.mainGreen3,
  },
  closeText: {
    color: Colors.googleBackground,
  },
});

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'const/global-styles';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { UseRouter } from 'types/screen/screenType';
import useRestaurantDetailQuery from 'query/hooks/restaurants/useRestaurantDetailQuery';

export default function RestaurantInfos() {
  const { params } = useRoute<UseRouter<'RestaurantDetailScreen'>>();
  const { restaurantDetail } = useRestaurantDetailQuery(params.restaurantId);
  const [isOpenTimeInfo, setIsOpenTimeInfo] = useState(false);
  const dayOfWeek = new Date().getDay();

  const toggleTimeInfo = () => {
    setIsOpenTimeInfo(prev => !prev);
  };

  return (
    <View style={styles.infos}>
      {restaurantDetail?.restaurantDetail?.formatted_phone_number && (
        <View style={styles.info}>
          <Ionicons name="call" size={25} color={Colors.mainGreen2} />
          <Text>{restaurantDetail?.restaurantDetail?.formatted_phone_number}</Text>
        </View>
      )}
      {restaurantDetail?.restaurantDetail?.vicinity && (
        <View style={styles.info}>
          <Ionicons name="location" size={25} color={Colors.mainGreen2} />
          <Text>{restaurantDetail?.restaurantDetail?.vicinity}</Text>
        </View>
      )}
      {restaurantDetail?.restaurantDetail?.opening_hours && (
        <View style={styles.info}>
          <Ionicons name="time" size={25} color={Colors.mainGreen2} />
          <View style={styles.timeInfo}>
            <Text>
              {restaurantDetail?.restaurantDetail?.opening_hours?.weekday_text[dayOfWeek - 1 < 0 ? 6 : dayOfWeek - 1]}
            </Text>
            <Pressable onPress={toggleTimeInfo}>
              <Ionicons name={isOpenTimeInfo ? 'chevron-up' : 'chevron-down'} size={25} color={Colors.mainGreen2} />
            </Pressable>
          </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  infos: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  info: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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

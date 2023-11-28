import { LayoutAnimation, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OpeningHoursPeriod } from 'types/data/restaureant';
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
      <View style={styles.info}>
        <Ionicons name="call-outline" size={25} />
        <Text>{restaurantDetail?.detailRestaurant?.formatted_phone_number}</Text>
      </View>
      <View style={styles.info}>
        <Ionicons name="location-outline" size={25} />
        <Text>{restaurantDetail?.detailRestaurant?.vicinity}</Text>
      </View>
      <View style={styles.info}>
        <Ionicons name="time-outline" size={25} />
        <View style={styles.timeInfo}>
          <Text>{restaurantDetail?.detailRestaurant?.opening_hours.weekday_text[dayOfWeek]}</Text>
          <Pressable onPress={toggleTimeInfo}>
            <Ionicons name="add-outline" size={25} />
          </Pressable>
        </View>
      </View>
      {isOpenTimeInfo && (
        <View style={styles.detailTimeInfo}>
          <View>
            {restaurantDetail?.detailRestaurant?.opening_hours.open_now ? (
              <Text>현재 오픈중입니다</Text>
            ) : (
              <Text>현재 오픈중이 아닙니다</Text>
            )}
          </View>
          <View>
            {restaurantDetail?.detailRestaurant?.opening_hours.weekday_text.map((time, index) => (
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 2,
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
});

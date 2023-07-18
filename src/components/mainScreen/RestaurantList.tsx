import { View, StyleSheet, Pressable, LayoutAnimation, ScrollView, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { mockNearbyRestaurantList } from 'data/mockdata';
import ScrollList from './ScrollList';
import BriefRestaurantInfo from './BriefRestaurantInfo';

export default function RestaurantList() {
  const mockData = mockNearbyRestaurantList;
  const [isOpen, setIsOpen] = useState(false);

  const toggleListHandler = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(prev => !prev);
  };

  return (
    <View style={[styles.wrap, { height: isOpen ? '80%' : '15%', opacity: isOpen ? 1 : 0.75 }]}>
      <Pressable style={styles.openBtn} onPress={toggleListHandler}>
        <Ionicons name={isOpen ? 'chevron-down-outline' : 'chevron-up-outline'} size={20} />
      </Pressable>
      {isOpen ? (
        <ScrollList restaurants={mockData} />
      ) : (
        <View style={styles.firstRestaurant}>
          <BriefRestaurantInfo restaurant={mockData[0]} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '95%',
    position: 'absolute',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
    opacity: 0.9,
  },
  openBtn: {
    height: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  firstRestaurant: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  restaurantList: {
    width: '100%',
    paddingHorizontal: 10,
  },
  restaurant: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
});

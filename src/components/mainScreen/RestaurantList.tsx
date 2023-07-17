import { View, StyleSheet, Pressable, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function RestaurantList() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleListHandler = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(prev => !prev);
  };

  const boxHeight = isOpen ? '80%' : '15%';

  return (
    <View style={[styles.wrap, { height: boxHeight }]}>
      <Pressable style={styles.openBtn} onPress={toggleListHandler}>
        <Ionicons name={isOpen ? 'chevron-down-outline' : 'chevron-up-outline'} size={20} />
      </Pressable>
      <View style={styles.restaurantList}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    // height: "15%",
    width: "95%",
    position: 'absolute',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',

    backgroundColor: 'tomato', // 지우자
  },
  openBtn: {
    height: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  restaurantList: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
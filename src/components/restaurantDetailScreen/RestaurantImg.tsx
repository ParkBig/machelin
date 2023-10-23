import { Colors } from 'const/global-styles';
import { ScreenWidth } from 'const/dimenstions';
import { StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { Photo } from 'types/data/restaureant';

interface Props {
  photos?: Photo[];
}

export default function RestaurantImg({ photos }: Props) {
  return (
    <View style={styles.wrap}>
      <Swiper>
        {photos?.map(contents => (
          <View style={styles.img} key={contents.photo_reference}>
            <Text>oo</Text>
          </View>
        ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: (ScreenWidth * 3) / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tomato',
  },
});

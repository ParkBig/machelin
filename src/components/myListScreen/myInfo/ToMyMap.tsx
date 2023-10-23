import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screen/screenType';
import Button from 'components/common/Button';

export default function ToMyMap() {
  const { navigate } = useNavigation<UseNavigation<'MyListScreen'>>();

  const gothMyMapHandler = () => {
    // 로그인이 아니라면 막아야함.
    navigate('MyMapScreen');
  };

  return (
    <View style={styles.myMap}>
      <Button style={styles.pressable} onPress={gothMyMapHandler}>
        <Ionicons name="map-outline" size={35} />
        <Text>나의지도</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  myMap: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

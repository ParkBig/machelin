import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import SearchPicker from './SearchPicker';
import { Colors } from 'const/global-styles';
import Button from 'components/common/layout/Button';
import { useSetRecoilState } from 'recoil';
import { regionalRestaurantSearchInputState } from 'store/searchState';

export default function AreaPicker() {
  const setRegionalRestaurantSearchInput = useSetRecoilState(regionalRestaurantSearchInputState);

  const onPressHandler = () => {
    setRegionalRestaurantSearchInput(prev => ({ ...prev, location: { city: '전체', district: '전체' } }));
  };

  return (
    <View style={styles.wrap}>
      <Button onPress={onPressHandler}>
        <Ionicons style={styles.ionicons} name="location" size={40} color={Colors.mainWhite3} />
      </Button>
      <SearchPicker which="city" />
      <SearchPicker which="district" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 50,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomLeftRadius: 10,
    borderBottomColor: Colors.mainGreen2,
    overflow: 'hidden',
  },
  ionicons: {
    width: 50,
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.mainGreen2,
  },
});

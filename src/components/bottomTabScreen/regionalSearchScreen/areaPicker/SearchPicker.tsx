import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRecoilState } from 'recoil';
import { regionalRestaurantSearchInputState } from 'store/searchState';
import { administrativeDistrict, administrativeDistrictName } from 'const/administrativeDistrict';
import { useEffect } from 'react';

interface Props {
  which: 'city' | 'district';
}

export default function SearchPicker({ which }: Props) {
  const [
    {
      location: { city, district },
    },
    setRegionalRestaurantSearchInput,
  ] = useRecoilState(regionalRestaurantSearchInputState);

  const whichValue = which === 'city' ? 'city' : 'district';
  const selectedValue = which === 'city' ? city : district;
  const values = which === 'city' ? administrativeDistrictName : administrativeDistrict[city];

  const valueChangeHandler = (itemValue: any) => {
    setRegionalRestaurantSearchInput(prev => {
      const location = prev.location;
      location[whichValue] = itemValue;
      return { ...prev, location, isTyping: false };
    });
  };

  useEffect(() => {
    setRegionalRestaurantSearchInput(prev => {
      const location = prev.location;
      if (location.city === '내위치') {
        location.district = '내위치';
      } else {
        location.district = '전체';
      }
      return { ...prev, location };
    });
  }, [city, setRegionalRestaurantSearchInput]);

  return (
    <View style={styles.wrap}>
      <Picker selectedValue={selectedValue} onValueChange={valueChangeHandler}>
        {values.map(value => (
          <Picker.Item label={value} value={value} key={value} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
  },
});

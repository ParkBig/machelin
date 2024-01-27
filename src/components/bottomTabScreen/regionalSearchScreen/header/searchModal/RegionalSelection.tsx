import Button from 'components/common/layout/Button';
import Line from 'components/common/layout/Line';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import RegionalModal from './regionalModal/RegionalModal';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Location, regionalRestaurantSearchInputState } from 'store/searchState';
import { Colors } from 'const/global-styles';

interface ToggleRegionalModal {
  toggle: boolean;
  which: 'city' | 'gu' | null;
}

export default function RegionalSelection() {
  const [
    {
      location: { city, district },
    },
    setRegionalRestaurantSearchInput,
  ] = useRecoilState(regionalRestaurantSearchInputState);
  const [toggleRegionalModal, setToggleRegionalModal] = useState<ToggleRegionalModal>({ toggle: false, which: null });

  const toggleRegionalHandler = (which: 'city' | 'gu' | null) => {
    setToggleRegionalModal(prev => ({ toggle: !prev.toggle, which }));
  };

  useEffect(() => {
    setRegionalRestaurantSearchInput(prev => {
      const location = prev.location;
      if (location.city === '내위치') {
        location.district = '내위치';
        const newLocation: Location = { ...location, district: '내위치' };
        return { ...prev, location: newLocation };
      } else {
        location.district = '전체';
        const newLocation: Location = { ...location, district: '전체' };
        return { ...prev, location: newLocation };
      }
    });
  }, [city, setRegionalRestaurantSearchInput]);

  return (
    <View style={styles.wrap}>
      <View style={styles.ionicons}>
        <Ionicons name="location" size={35} color={Colors.mainGreen2} />
      </View>
      <Line style={styles.pickerLine} />
      <Button style={styles.pickerButton} onPress={toggleRegionalHandler.bind(null, 'city')}>
        <Text>{city}</Text>
      </Button>
      <Line style={styles.pickerLine} />
      <Button style={styles.pickerButton} onPress={toggleRegionalHandler.bind(null, 'gu')}>
        <Text>{district}</Text>
      </Button>
      {toggleRegionalModal.toggle && (
        <RegionalModal
          toggleModal={toggleRegionalModal.toggle}
          toggleModalHandler={toggleRegionalHandler.bind(null, null)}
          which={toggleRegionalModal.which}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.mainGreen2,
    borderRadius: 10,
  },
  ionicons: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerButton: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerLine: {
    height: 30,
    width: 1.5,
    backgroundColor: Colors.mainGreen2,
  },
});

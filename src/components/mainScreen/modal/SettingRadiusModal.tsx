import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { toggleRadiusSettingState } from 'store/mapScreenState';
import { searchRadiusState } from 'store/locationState';
import { useState } from 'react';
import Slider from '@react-native-community/slider';
import { LocationSearchRadius } from 'types/store/locationType';

export default function SettingRadiusModal() {
  const [radiusValue, setRadiusValue] = useRecoilState(searchRadiusState);
  const [isRadiusSettingOpen, setIsRadiusSettingOpen] = useRecoilState(toggleRadiusSettingState);
  const [sliderValue, setSliderValue] = useState<LocationSearchRadius>(3000);

  const sliderValueChangeHandler = (value: number) => {
    setSliderValue(value as LocationSearchRadius);
  };

  const closeModalHandler = () => {
    // 리코일상태중 거리 상태 변경, 이것이 데이터 가져오는 selector의존성 연결해야함
    if (radiusValue !== sliderValue) {
      setRadiusValue(sliderValue);
    }
    setIsRadiusSettingOpen(false);
  };

  return (
    <Modal visible={isRadiusSettingOpen} onRequestClose={closeModalHandler} animationType="slide" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.text}>검색범위 설정</Text>
          <View style={styles.sliderWrap}>
            <Text style={styles.valueText}>{sliderValue / 1000}Km</Text>
            <Slider
              step={1000}
              maximumValue={5000}
              minimumValue={1000}
              style={styles.slider}
              value={sliderValue}
              onValueChange={sliderValueChangeHandler}
            />
          </View>
          <Pressable onPress={closeModalHandler}>
            <Text>확인</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    fontSize: 20,
  },
  sliderWrap: {
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    gap: 15,
  },
  valueText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  slider: {
    width: '100%',
  },
});

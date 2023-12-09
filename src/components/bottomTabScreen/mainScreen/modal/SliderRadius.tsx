import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Slider from '@react-native-community/slider';

export default function SliderRadius() {
  const [sliderValue, setSliderValue] = useState(3);

  const sliderValueChangeHandler = (value: number) => {
    setSliderValue(value)
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>{sliderValue}Km</Text>
      <Slider 
        step={1}
        maximumValue={5}
        minimumValue={1}
        style={styles.slider}
        value={sliderValue}
        onValueChange={sliderValueChangeHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    gap: 15
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  slider: {
    width: '100%',
  },
})

import { StyleSheet, Text, View } from 'react-native';
import MobileInput from './MobileInput';
import VerificationInput from './VerificationInput';
import { useState } from 'react';

export default function Verify() {
  const [isClickedSendVerify, setIsClickedSendVerify] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <View style={styles.wrap}>
      <MobileInput
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        isClickedSendVerify={isClickedSendVerify}
        setIsClickedSendVerify={setIsClickedSendVerify}
      />
      <VerificationInput isClickedSendVerify={isClickedSendVerify} phoneNumber={phoneNumber} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 5.5,
    width: '100%',
  },
});

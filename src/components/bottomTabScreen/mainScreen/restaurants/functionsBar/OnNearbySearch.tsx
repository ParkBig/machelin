import { StyleSheet } from 'react-native';
import FunctionButtons from './functionButtons/FunctionButtons';
import InstanceInfo from './instanceInfo/InstanceInfo';

export default function OnNearbySearch() {
  return (
    <>
      <InstanceInfo />
      <FunctionButtons />
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    flexDirection: 'row',
  },
});

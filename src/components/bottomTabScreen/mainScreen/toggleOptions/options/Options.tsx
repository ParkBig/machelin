import { StyleSheet } from 'react-native';
import { Colors, Shadow } from 'const/global-styles';
import Keywords from './Keywords';

export default function Options() {
  return (
    <>
      <Keywords />
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    height: 50,
    width: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainGreen2,
    ...Shadow,
  },
});

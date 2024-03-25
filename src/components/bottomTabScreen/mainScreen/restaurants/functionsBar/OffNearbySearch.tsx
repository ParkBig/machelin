import { StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ToMyLocation from './functionButtons/ToMyLocation';
import { Colors, Shadow } from 'const/global-styles';
import Button from 'components/common/layout/Button';
import { useSetRecoilState } from 'recoil';
import { toggleNearbySearchState } from 'store/toggleState';

export default function OffNearbySearch() {
  const setToggleNearbySearch = useSetRecoilState(toggleNearbySearchState);

  const onNearbySearchHandler = () => {
    setToggleNearbySearch(true);
  };

  return (
    <>
      <Button style={styles.button} onPress={onNearbySearchHandler}>
        <Text style={styles.text}>내 주변 식당 찾기</Text>
        <Ionicons name="paper-plane" color={Colors.mainWhite1} size={20} />
      </Button>
      <ToMyLocation />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.mainGreen2,
    gap: 10,
    ...Shadow,
  },
  text: {
    fontWeight: 'bold',
    color: Colors.mainWhite1,
  },
});

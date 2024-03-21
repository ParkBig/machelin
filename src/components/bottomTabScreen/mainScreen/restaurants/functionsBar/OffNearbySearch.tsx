import { StyleSheet, Text, View } from 'react-native';
import ToMyLocation from './functionButtons/ToMyLocation';
import { Colors } from 'const/global-styles';
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
      <Button style={styles.wrap} onPress={onNearbySearchHandler}>
        <Text>내 주변 식당 검색</Text>
      </Button>
      <ToMyLocation />
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.mainGreen1
  },

});

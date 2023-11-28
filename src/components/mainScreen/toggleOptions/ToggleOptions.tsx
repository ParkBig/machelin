import { LayoutAnimation, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadow } from 'const/global-styles';
import { useRecoilState } from 'recoil';
import Button from 'components/common/Button';
import { mainScreenTogglesState } from 'store/toggleState';
import Options from './options/Options';

export default function ToggleOptions() {
  const [{ toggleOptions }, setMainScreenToggles] = useRecoilState(mainScreenTogglesState);

  const toggleOptionsHandler = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMainScreenToggles(prev => ({ ...prev, toggleOptions: !prev.toggleOptions }));
  };

  return (
    <View style={[styles.option, toggleOptions && styles.open]}>
      {toggleOptions && <Options />}
      <Button onPress={toggleOptionsHandler} style={styles.icon}>
        <Ionicons name={toggleOptions ? 'grid' : 'grid-outline'} size={30} color={Colors.mainWhite3} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    height: 50,
    flexDirection: 'row',
    position: 'absolute',
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 70 : 70,
    right: 10,
    zIndex: 2,
  },
  open: {
    right: 10,
    gap: 10,
  },
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

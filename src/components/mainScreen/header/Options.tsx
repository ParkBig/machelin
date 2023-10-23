import { LayoutAnimation, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadow } from 'const/global-styles';
import { useRecoilState } from 'recoil';
import { toggleHeaderOptionState } from 'store/toggleState';
import Option from './Option';
import Button from 'components/common/Button';

export default function Options() {
  const [toggleHeaderOption, setToggleHeaderOption] = useRecoilState(toggleHeaderOptionState);

  const toggleHeaderOptionHandler = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setToggleHeaderOption(prev => !prev);
  };

  return (
    <View style={[styles.option, toggleHeaderOption && styles.open]}>
      <Button onPress={toggleHeaderOptionHandler} style={styles.icon}>
        <Ionicons name={toggleHeaderOption ? 'grid' : 'grid-outline'} size={25} color="white" />
      </Button>
      {toggleHeaderOption && <Option />}
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    height: 40,
    width: 40,
    flexDirection: 'row',
  },
  open: {
    width: 90,
    gap: 10,
  },
  icon: {
    height: 40,
    width: 40,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainGreen3,
    ...Shadow,
  },
});

import Button from 'components/common/Button';
import { Shadow } from 'const/global-styles';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface Props {
  children: React.ReactNode;
  style: ViewStyle;
  onPress: () => void;
}

export default function LoginPlatform({ children, style, onPress }: Props) {
  return (
    <View style={styles.wrap}>
      <Button style={{ ...styles.button, ...style }} onPress={onPress}>
        {children}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    ...Shadow,
  },
});

import Button from 'components/common/layout/Button';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Size } from 'const/global-styles';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screenType';
import { useSetRecoilState } from 'recoil';
import { focusedRestaurantState } from 'store/locationState';
import { IStamp } from 'types/types';

interface Props {
  stamp: IStamp;
}

export default function Stamp({ stamp }: Props) {
  const { navigate } = useNavigation<UseNavigation<'MyMapScreen'>>();
  const setFocusedRestaurant = useSetRecoilState(focusedRestaurantState);

  const onPressHandler = () => {
    setFocusedRestaurant({
      isFocused: true,
      id: `${stamp.id}`,
      latitude: +stamp.lat,
      longitude: +stamp.lng,
    });
  };

  const navigateHandler = () => {
    navigate('StampDetailScreen', {
      stamp,
    });
  };

  return (
    <Button style={styles.wrap} onPress={onPressHandler}>
      <View style={styles.contents}>
        <Text style={styles.titleText}>{stamp.title}</Text>
        {stamp.content && (
          <Text numberOfLines={2} ellipsizeMode="tail">
            {stamp.content}
          </Text>
        )}
      </View>
      <Button style={styles.button} onPress={navigateHandler}>
        <Ionicons name="chevron-forward" size={30} color={Colors.darkGray} />
      </Button>
    </Button>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contents: {
    flex: 1,
    gap: 5,
  },
  buttons: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  button: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: Size.normalMiddle,
  },
});

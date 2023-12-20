import Button from 'components/common/layout/Button';
import { StyleSheet, Text, View } from 'react-native';
import { IStamp } from 'types/store/myInfoType';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Size } from 'const/global-styles';
import Line from 'components/common/layout/Line';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screen/screenType';
import { useMutation } from 'react-query';
import { deleteStampQuery } from 'query/stamps';
import useUsersStampsQuery from 'query/hooks/users/useUsersStampsQuery';
import { useState } from 'react';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { useSetRecoilState } from 'recoil';
import { focusedRestaurantState } from 'store/locationState';
import YesOrNoModal from 'components/common/modal/YesOrNoModal';

interface Props {
  stamp: IStamp;
}

export default function Stamp({ stamp }: Props) {
  const { navigate } = useNavigation<UseNavigation<'MyMapScreen'>>();
  const { reStamps } = useUsersStampsQuery();
  const setFocusedRestaurant = useSetRecoilState(focusedRestaurantState);
  const [yesOrNoModal, setYesOrNoModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });
  const { mutate } = useMutation(deleteStampQuery, {
    onSuccess: res => {
      if (res.ok) {
        reStamps();
      } else {
        setToggleAlertModal({ toggle: true, alertMsg: res.msg });
      }
    },
  });

  const onPressHandler = () => {
    setFocusedRestaurant({
      isFocused: true,
      id: `${stamp.id}`,
      latitude: +stamp.lat,
      longitude: +stamp.lng,
    });
  };

  const navigateHandler = () => {
    navigate('RestaurantDetailScreen', {
      restaurantName: stamp.restaurantName,
      restaurantId: stamp.restaurantId,
    });
  };

  const deleteHandler = () => {
    setYesOrNoModal({ toggle: true, alertMsg: '도장을 지울 건가요?' });
  };

  return (
    <Button style={styles.wrap} onPress={onPressHandler}>
      <View style={styles.contents}>
        <Text style={styles.titleText}>{stamp.restaurantName}</Text>
        <Text>{stamp.address}</Text>
      </View>
      <Line style={styles.line} />
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={deleteHandler}>
          <Ionicons name="trash" size={30} color={Colors.googleBackground} />
        </Button>
        <Button style={styles.button} onPress={navigateHandler}>
          <Ionicons name="chevron-forward" size={30} />
        </Button>
      </View>
      <YesOrNoModal
        toggleModal={yesOrNoModal.toggle}
        setToggleAlertModal={setYesOrNoModal}
        alertMsg={yesOrNoModal.alertMsg}
        mutate={mutate}
        argument={stamp.id}
      />
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
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
  line: {
    height: '50%',
    width: 2,
    backgroundColor: Colors.mainGreen2,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: Size.normalMiddle,
  },
});

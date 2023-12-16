import { Colors, Size } from 'const/global-styles';
import useUsersSubLocalityQuery from 'query/hooks/users/useUsersSubLocalityQuery';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import trimMySubLocality from 'util/ trimMySubLocality';
import Button from 'components/common/layout/Button';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screen/screenType';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { useState } from 'react';

export default function Header() {
  const { navigate } = useNavigation<UseNavigation<'NeighborhoodPostsScreen'>>();
  const { myInfo } = useMyInfoQuery();
  const { mySubLocality } = useUsersSubLocalityQuery();
  const { city, district } = trimMySubLocality(mySubLocality?.subLocality);
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const goToMakePostHandler = async () => {
    if (!myInfo?.authUser) {
      setToggleAlertModal({ toggle: true, alertMsg: '로그인 후 이용가능합니다' });
      return;
    }

    navigate('MakePostScreen', {
      restaurantInfo: null,
    });
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.location}>
        <Ionicons name="location" size={30} color={Colors.mainWhite3} />
        <Text style={styles.text}>
          {city} {district}
        </Text>
      </View>
      <Button style={styles.button} onPress={goToMakePostHandler}>
        <Ionicons style={styles.ionicons} name="add" size={30} color={Colors.mainWhite3} />
      </Button>
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 10,
    backgroundColor: Colors.mainGreen2,
  },
  location: {
    flexDirection: 'row',
    gap: 5,
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colors.mainWhite3,
  },
  ionicons: {
    height: '100%',
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  text: {
    color: Colors.mainWhite3,
    fontSize: Size.bigSmall,
    fontWeight: 'bold',
  },
});

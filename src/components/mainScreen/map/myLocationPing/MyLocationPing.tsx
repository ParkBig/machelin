import ConfirmAlertModal, { ToggleState } from 'components/common/ConfirmAlertModal';
import { DEFAULT_IMAGE } from 'const/default';
import { Colors, Shadow } from 'const/global-styles';
import { PermissionStatus, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Callout, Marker } from 'react-native-maps';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { mapLocationState, myLocationState } from 'store/locationState';

export default function MyLocationPing() {
  const { myInfo } = useMyInfoQuery();
  const myLocation = useRecoilValue(myLocationState);
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  return (
    <>
      {myLocation.isGetLocation && (
        <Marker
          coordinate={{ latitude: myLocation.latitude, longitude: myLocation.longitude }}
          pinColor="default"
          title="내위치"
        >
          <View style={styles.wrap}>
            <Image
              source={myInfo?.authUser?.pfp ? { uri: myInfo?.authUser?.pfp } : require('assets/png/user.png')}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </Marker>
      )}
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 40,
    width: 40,
    borderWidth: 2,
    borderColor: Colors.mainGreen3,
    borderRadius: 20,
    overflow: 'hidden',
    ...Shadow,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

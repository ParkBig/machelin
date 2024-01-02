import { Colors, Shadow } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { useRecoilValue } from 'recoil';
import { myLocationState } from 'store/locationState';

export default function MyLocationPing() {
  const { myInfo } = useMyInfoQuery();
  const myLocation = useRecoilValue(myLocationState);
  const [isTrack, setIsTrack] = useState(false);

  useEffect(() => {
    setIsTrack(true);

    const trackOut = setTimeout(() => {
      setIsTrack(false);
    }, 600);

    return () => clearInterval(trackOut);
  }, [myLocation]);

  return (
    <>
      {myLocation.isGetLocation && (
        <Marker
          tracksViewChanges={isTrack}
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

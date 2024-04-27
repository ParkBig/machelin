import { Colors } from 'const/global-styles';
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

  const imageSource = myInfo?.authUser?.pfp ? { uri: myInfo?.authUser?.pfp } : require('assets/png/user.png');

  useEffect(() => {
    setIsTrack(true);

    const trackOut = setTimeout(() => {
      setIsTrack(false);
    }, 500);

    return () => clearInterval(trackOut);
  }, [myLocation, myInfo?.authUser])

  return (
    <>
      {myLocation.isGetLocation && (
        <Marker
          style={styles.wrap}
          tracksViewChanges={isTrack}
          coordinate={{ latitude: myLocation.latitude, longitude: myLocation.longitude }}
          title={myInfo?.authUser?.nickname ? myInfo.authUser.nickname : '내위치'}
        >
          <View style={styles.imageWrap}>
            <Image source={imageSource} style={styles.image} resizeMode="cover" />
          </View>
        </Marker>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrap: {
    height: 45,
    width: 45,
    borderWidth: 1,
    borderColor: Colors.mainGreen2,
    borderRadius: 22.5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

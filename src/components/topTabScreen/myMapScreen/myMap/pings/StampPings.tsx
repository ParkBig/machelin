import { memo, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { IStamp } from 'types/types';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'const/global-styles';
import useUsersStampsQuery from 'query/hooks/users/useUsersStampsQuery';
import { useRecoilValue } from 'recoil';
import { clickedMyMapListTypeState } from 'store/toggleState';

interface Props {
  stamp: IStamp;
  isTrack: boolean;
}

const MemoizedMarker = memo(({ stamp, isTrack }: Props) => {
  return (
    <Marker
      tracksViewChanges={isTrack}
      coordinate={{ latitude: +stamp.lat, longitude: +stamp.lng }}
      title={stamp.title}
    >
      <View style={styles.wrap}>
        <Ionicons name="paw" size={25} color={Colors.mainWhite3} />
      </View>
    </Marker>
  );
});

const styles = StyleSheet.create({
  wrap: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainGreen2,
  },
});

export default function StampPings() {
  const { stamps } = useUsersStampsQuery();
  const [isTrack, setIsTrack] = useState(false);
  const clickedMyMapListType = useRecoilValue(clickedMyMapListTypeState);

  useEffect(() => {
    setIsTrack(true);

    const trackOut = setTimeout(() => {
      setIsTrack(false);
    }, 500);

    return () => clearInterval(trackOut);
  }, [clickedMyMapListType]);

  return (
    <>
      {stamps?.stamps?.map((stamp, index) => (
        <MemoizedMarker key={`${stamp.id}_${index}`} stamp={stamp} isTrack={isTrack} />
      ))}
    </>
  );
}

import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { IStamp } from 'types/store/myInfoType';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'const/global-styles';
import useUsersStampsQuery from 'query/hooks/users/useUsersStampsQuery';

interface Props {
  stamp: IStamp;
}

const MemoizedMarker = memo(({ stamp }: Props) => {
  return (
    <Marker coordinate={{ latitude: +stamp.lat, longitude: +stamp.lng }} title={stamp.restaurantName}>
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

  return <>{stamps?.stamps?.map((stamp, index) => <MemoizedMarker key={`${stamp.id}_${index}`} stamp={stamp} />)}</>;
}

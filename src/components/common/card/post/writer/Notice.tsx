import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Size } from 'const/global-styles';
import trimMySubLocality from 'util/ trimMySubLocality';

interface Props {
  postType: 'ALL_NOTICE' | 'LOCAL_NOTICE';
  ownerSubLocality: string;
}

export default function Notice({ postType, ownerSubLocality }: Props) {
  const { city, district } = trimMySubLocality(ownerSubLocality);

  return (
    <View style={styles.notice}>
      {postType === 'ALL_NOTICE' ? (
        <>
          <Ionicons name="restaurant" size={20} color={Colors.mainGreen2} />
          <Text style={styles.noticeText}>전체 공지</Text>
          <Ionicons name="restaurant" size={20} color={Colors.mainGreen2} />
        </>
      ) : (
        <>
          <Ionicons name="restaurant" size={20} color={Colors.mainGreen2} />
          <Text style={styles.noticeText}>
            {city} {district}
          </Text>
          <Text style={styles.noticeText}>공지</Text>
          <Ionicons name="restaurant" size={20} color={Colors.mainGreen2} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  notice: {
    width: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  noticeText: {
    fontSize: Size.bigSmall,
    fontWeight: 'bold',
    color: Colors.mainGreen2,
  },
});

import { StyleSheet, View } from 'react-native';
import PreferFood from './PreferFood';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';

export default function PreferFoods() {
  const { myInfo } = useMyInfoQuery();
  
  return (
    <View style={styles.wrap}>
      {myInfo?.authUser.preferFoods.map((preferFood, i) => <PreferFood key={preferFood + i} preferFood={preferFood} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
});

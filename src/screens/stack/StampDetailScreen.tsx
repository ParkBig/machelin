import TaggedRestaurantInfo from 'components/stackScreen/stampDetailScreen/TaggedRestaurantInfo';
import TitleNContent from 'components/stackScreen/stampDetailScreen/TitleNContent';
import PostingImages from 'components/stackScreen/stampDetailScreen/postingImages/PostingImages';
import { Colors } from 'const/global-styles';
import { ScrollView, StyleSheet } from 'react-native';

export default function StampDetailScreen() {
  return (
    <ScrollView style={styles.wrap} showsVerticalScrollIndicator={false}>
      <TitleNContent />
      <PostingImages />
      <TaggedRestaurantInfo />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.mainWhite1,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
});

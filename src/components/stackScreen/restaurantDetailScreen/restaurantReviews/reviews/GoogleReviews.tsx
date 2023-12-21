import { Colors } from 'const/global-styles';
import { FlatList, StyleSheet } from 'react-native';
import Line from 'components/common/layout/Line';
import GoogleReview from 'components/common/card/GoogleReview';
import { Review } from 'types/types';

interface Props {
  reviews?: Review[];
}

export default function GoogleReviews({ reviews }: Props) {
  const reviewsExist = reviews;

  return (
    <>
      {reviewsExist && (
        <FlatList
          scrollEnabled={false}
          style={styles.reviews}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => String(index)}
          data={reviews}
          renderItem={({ item }) => <GoogleReview review={item} />}
          ListHeaderComponent={() => <Line style={styles.headerLine} />}
          ItemSeparatorComponent={() => <Line style={styles.line} />}
          ListFooterComponent={() => <Line style={styles.line} />}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  reviews: {
    width: '100%',
  },
  headerLine: {
    width: '100%',
    height: 3,
    backgroundColor: Colors.googleBackground,
  },
  line: {
    width: '100%',
    height: 30,
    backgroundColor: Colors.lightGrayOpacity1,
  },
});

import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { Review } from 'types/types';

interface Props {
  review: Review;
}

export default function GoogleReview({ review }: Props) {
  const star = new Array(review.rating).fill(0);

  return (
    <View style={styles.wrap}>
      <View style={styles.title}>
        <View style={styles.ionicons}>
          <Ionicons name="logo-google" size={30} color={Colors.googleBackground} />
        </View>
        <View style={styles.name}>
          <Text>{review.author_name}</Text>
          <Text style={styles.text}>(구글유저)</Text>
        </View>
      </View>
      <View style={styles.rating}>
        {star.map((_, index) => (
          <Ionicons key={index} name="star" size={25} color={Colors.kakaoBackground} />
        ))}
        <View style={styles.timeDescription}>
          <Text>{review.relative_time_description}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  title: {
    width: '100%',
    flexDirection: 'row',
  },
  ionicons: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: Colors.googleBackground,
  },
  name: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    flexWrap: 'wrap',
  },
  rating: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  timeDescription: {
    paddingLeft: 15,
  },
  content: {
    width: '100%',
  },
  text: {
    color: Colors.gray,
  },
});

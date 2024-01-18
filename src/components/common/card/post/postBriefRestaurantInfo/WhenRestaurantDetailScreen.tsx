import { StyleSheet, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadow } from "const/global-styles";

interface Props {
  rating: number;
}

export default function WhenRestaurantDetailScreen({ rating }: Props) {
  const star = new Array(rating).fill(0);

  return (
    <View style={styles.wrap}>
      {star.map((_, index) => (
        <Ionicons key={index} name="star" size={25} color={Colors.mainGreen2} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
});


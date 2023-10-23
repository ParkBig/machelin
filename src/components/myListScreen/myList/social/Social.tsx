import Button from 'components/common/Button';
import Line from 'components/common/Line';
import { Colors, Size } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/useMyInfoQuery';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Social() {
  const { myInfo } = useMyInfoQuery();
  const [isFollow, setIsFollow] = useState(true);

  const toggleFollowHandler = (state: boolean) => {
    setIsFollow(state);
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.title}>
        <View style={styles.follow}>
          <Button style={styles.button} onPress={toggleFollowHandler.bind(null, true)}>
            <Text style={isFollow && styles.focusedText}>팔로우</Text>
          </Button>
          <Line style={styles.line} />
          <Button style={styles.button} onPress={toggleFollowHandler.bind(null, false)}>
            <Text style={!isFollow && styles.focusedText}>팔로워</Text>
          </Button>
        </View>
        <Button>
          <Ionicons name="search-outline" size={25} />
        </Button>
      </View>
      {/* <View style={styles.content}>{bookmarks?.length ? <HasBookmark bookmarks={bookmarks} /> : <NoBookmark />}</View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingHorizontal: 15,
  },
  title: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  follow: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  line: {
    height: '40%',
    width: 2,
    backgroundColor: Colors.mainGreen2,
  },
  content: {
    width: '100%',
  },
  focusedText: {
    fontSize: Size.bigSmall,
  },
});

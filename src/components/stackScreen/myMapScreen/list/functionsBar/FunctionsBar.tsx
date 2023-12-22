import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/layout/Button';
import { Colors, Size } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import useUsersPostForMyMapQuery from 'query/hooks/posts/useUsersPostForMyMapQuery';
import useUsersBookmarksQuery from 'query/hooks/users/useUsersBookmarksQuery';
import ToMyLocation from 'components/bottomTabScreen/mainScreen/restaurants/functionsBar/functionButtons/ToMyLocation';
import { WhichOneClickedState } from '../List';
import useUsersStampsQuery from 'query/hooks/users/useUsersStampsQuery';

interface Props {
  whichOneClicked: WhichOneClickedState;
  setWhichOneClicked: React.Dispatch<React.SetStateAction<WhichOneClickedState>>;
}

export default function FunctionsBar({ whichOneClicked, setWhichOneClicked }: Props) {
  const { myInfo } = useMyInfoQuery();
  const { stamps } = useUsersStampsQuery();
  const { posts } = useUsersPostForMyMapQuery(myInfo?.authUser?.id);
  const { bookmarks } = useUsersBookmarksQuery(myInfo?.authUser?.id);

  const stampsLength = stamps?.stamps.length ? stamps.stamps.length : 0;
  const bookmarksLength = bookmarks?.bookmarks?.length ? bookmarks?.bookmarks?.length : 0;
  const postsLength = posts?.posts?.length ? posts?.posts.length : 0;

  const changeWhichOneClickedStateHandler = (clicked: WhichOneClickedState) => {
    if (whichOneClicked) {
      if (whichOneClicked === clicked) {
        setWhichOneClicked(null);
      } else {
        setWhichOneClicked(clicked);
      }
    } else {
      setWhichOneClicked(clicked);
    }
  };

  return (
    <View style={styles.wrap}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Button style={styles.button} onPress={changeWhichOneClickedStateHandler.bind(null, 'stamps')}>
          <Ionicons
            style={styles.ionicons}
            name={whichOneClicked === 'stamps' ? 'paw' : 'paw-outline'}
            size={25}
            color={Colors.mainWhite3}
          />
          {myInfo?.authUser && <Text style={styles.text}>{stampsLength}</Text>}
        </Button>
        <Button style={styles.button} onPress={changeWhichOneClickedStateHandler.bind(null, 'bookmarks')}>
          <Ionicons
            style={styles.ionicons}
            name={whichOneClicked === 'bookmarks' ? 'bookmarks' : 'bookmarks-outline'}
            size={25}
            color={Colors.mainWhite3}
          />
          {myInfo?.authUser && <Text style={styles.text}>{bookmarksLength}</Text>}
        </Button>
        <Button style={styles.button} onPress={changeWhichOneClickedStateHandler.bind(null, 'posts')}>
          <Ionicons
            style={styles.ionicons}
            name={whichOneClicked === 'posts' ? 'reader' : 'reader-outline'}
            size={25}
            color={Colors.mainWhite3}
          />
          {myInfo?.authUser && <Text style={styles.text}>{postsLength}</Text>}
        </Button>
      </View>
      <ToMyLocation />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 60,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  button: {
    width: 60,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.mainGreen2,
  },
  ionicons: {
    width: 25,
    height: 25,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  text: {
    fontSize: Size.smallBig,
    color: Colors.mainWhite3,
    fontWeight: 'bold',
  },
});

import { StyleSheet, View } from 'react-native';
import { Colors } from 'const/global-styles';
import FollowList from './FollowList';
import FollowerList from './FollowerList';
import SearchList from './SearchList';

interface Props {
  isFollow: boolean;
  toggleSearch: boolean;
}

export default function SocialList({ isFollow, toggleSearch }: Props) {
  return (
    <View style={styles.wrap}>
      {toggleSearch ? <SearchList /> : isFollow ? <FollowList /> : <FollowerList />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: Colors.mainGreen1,
  },
});

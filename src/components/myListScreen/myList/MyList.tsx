import { View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { clickedTypeState } from 'store/myInfoState';
import MyBookmarkList from './myBookmarks/MyBookmarkList';
import MyPostList from './myPosts/MyPostList';
import Social from './social/Social';

export default function MyList() {
  const clickedType = useRecoilValue(clickedTypeState);

  const viewType = clickedType === 'bookMark' ? <MyBookmarkList /> : clickedType === 'posts' ? <MyPostList /> : <Social />;

  return <View>{viewType}</View>;
}

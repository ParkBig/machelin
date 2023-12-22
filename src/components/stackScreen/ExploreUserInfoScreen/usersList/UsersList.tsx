import { View } from 'react-native';
import { useRecoilValue } from 'recoil';
import UsersBookmarks from './bookmark/UsersBookmarks';
import UsersPosts from './posts/UsersPosts';
import UsersSocial from './social/UsersSocial';
import { clickedExploreUserInfoListTypeState } from 'store/toggleState';

export default function UsersList() {
  const clickedType = useRecoilValue(clickedExploreUserInfoListTypeState);
  const viewType =
    clickedType === 'bookMark' ? <UsersBookmarks /> : clickedType === 'posts' ? <UsersPosts /> : <UsersSocial />;

  return <View>{viewType}</View>;
}

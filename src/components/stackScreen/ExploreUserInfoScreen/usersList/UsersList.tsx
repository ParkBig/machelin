import { View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { clickedExploreUserInfoListTypeState } from 'store/userInfoState';
import UsersBookmarks from './bookmark/UsersBookmarks';
import UsersPosts from './posts/UsersPosts';
import UsersSocial from './social/UsersSocial';

export default function UsersList() {
  const clickedType = useRecoilValue(clickedExploreUserInfoListTypeState);
  const viewType =
    clickedType === 'bookMark' ? <UsersBookmarks /> : clickedType === 'posts' ? <UsersPosts /> : <UsersSocial />;

  return <View>{viewType}</View>;
}

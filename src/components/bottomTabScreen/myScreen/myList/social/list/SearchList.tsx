import { View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { searchNickNameState } from 'store/searchState';
import BriefUserInfo from './BriefUserInfo';
import { useEffect } from 'react';
import useUserSearchQuery from 'query/hooks/users/useUserSearchQuery';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';

export default function SearchList() {
  const searchNickName = useRecoilValue(searchNickNameState);
  const { userList, reUserList } = useUserSearchQuery(searchNickName);
  const { myInfo } = useMyInfoQuery();

  useEffect(() => {
    reUserList()
  }, [searchNickName])

  return (
    <View>
      {userList?.users.map(user => user.id !== myInfo?.authUser?.id && <BriefUserInfo key={user.id} userInfo={user} />)}
    </View>
  );
}

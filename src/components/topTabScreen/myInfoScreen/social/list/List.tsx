import { useRecoilValue } from 'recoil';
import { whichClickedInMyInfoSocialState } from 'store/toggleState';
import FollowList from './follow/FollowList';
import FollowerList from './follower/FollowerList';
import SearchList from './search/SearchList';

export default function List() {
  const whichClickedInMyInfoSocial = useRecoilValue(whichClickedInMyInfoSocialState);

  const whichClicked =
    whichClickedInMyInfoSocial === 'follow'
      ? 'follow'
      : whichClickedInMyInfoSocial === 'follower'
        ? 'follower'
        : whichClickedInMyInfoSocial === 'search'
          ? 'search'
          : null;

  return (
    <>
      {whichClicked === 'follow' ? (
        <FollowList />
      ) : whichClicked === 'follower' ? (
        <FollowerList />
      ) : whichClicked === 'search' ? (
        <SearchList />
      ) : null}
    </>
  );
}

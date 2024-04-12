import AllPosts from 'components/bottomTabScreen/neighborhoodPostsScreen/allPosts/AllPosts';
import Header from 'components/bottomTabScreen/neighborhoodPostsScreen/header/Header';
import NeighborhoodPosts from 'components/bottomTabScreen/neighborhoodPostsScreen/neighborhoodPosts/NeighborhoodPosts';
import { useRecoilValue } from 'recoil';
import { whichSelectedPostsState } from 'store/toggleState';

export default function NeighborhoodPostsScreen() {
  const whichSelectedPosts = useRecoilValue(whichSelectedPostsState);

  const renderPosts = whichSelectedPosts === 'allPosts' ? <AllPosts /> : <NeighborhoodPosts />

  return (
    <>
      <Header />
      {renderPosts}
    </>
  );
}

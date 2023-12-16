import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Bookmarks from './bookmarks/Bookmarks';
import PostsHasRestaurant from './postsHasRestaurant/PostsHasRestaurant';
import FunctionsBar from './functionsBar/FunctionsBar';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';

export type WhichOneClickedState = 'bookmarks' | 'posts' | null;

export default function List() {
  const { myInfo } = useMyInfoQuery();
  const [whichOneClicked, setWhichOneClicked] = useState<WhichOneClickedState>(null);
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  useEffect(() => {
    if (!myInfo?.authUser) {
      setToggleAlertModal({ toggle: true, alertMsg: '로그인 후 기록해보아요' });
    }
  }, [myInfo]);

  return (
    <View style={styles.wrap}>
      {myInfo?.authUser && <FunctionsBar whichOneClicked={whichOneClicked} setWhichOneClicked={setWhichOneClicked} />}
      {whichOneClicked ? whichOneClicked === 'bookmarks' ? <Bookmarks /> : <PostsHasRestaurant /> : null}
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
  },
});

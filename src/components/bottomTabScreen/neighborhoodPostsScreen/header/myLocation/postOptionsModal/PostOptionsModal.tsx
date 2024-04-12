import { Colors, Shadow } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { useState } from 'react';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screenType';
import Button from 'components/common/layout/Button';
import { useRecoilState } from 'recoil';
import { WhichSelectedPostsState, whichSelectedPostsState } from 'store/toggleState';

interface Props {
  toggleModal: boolean;
  toggleModalHandler: () => void;
  myLocationString: string;
}

export default function PostOptionsModal({ toggleModal, toggleModalHandler, myLocationString }: Props) {
  const { navigate } = useNavigation<UseNavigation<'NeighborhoodPostsScreen'>>();
  const { myInfo } = useMyInfoQuery();
  const [whichPosts, setWhichPosts] = useRecoilState(whichSelectedPostsState);
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const setWhichPostsHandler = (which: WhichSelectedPostsState) => {
    setWhichPosts(which);

    toggleModalHandler();
  };

  const goToMakePostHandler = async () => {
    if (!myInfo?.authUser) {
      setToggleAlertModal({ toggle: true, alertMsg: '로그인 후 이용가능합니다' });
      return;
    }

    toggleModalHandler();

    navigate('MakePostScreen', {
      restaurantInfo: null,
      prevScreen: 'NeighborhoodPostsScreen',
    });
  };

  return (
    <Modal
      style={styles.modal}
      isVisible={toggleModal}
      onBackdropPress={toggleModalHandler}
      onSwipeComplete={toggleModalHandler}
      onBackButtonPress={toggleModalHandler}
      swipeDirection={['down']}
      useNativeDriverForBackdrop
    >
      <View style={styles.wrap}>
        <View style={styles.locate}>
          <Ionicons name="location" size={30} color={Colors.mainGreen2} />
          <View style={styles.location}>
            <Text style={styles.locationText}>{myLocationString}</Text>
          </View>
        </View>
        <View style={styles.postType}>
          <View style={styles.postTypeButtons}>
            <Button style={styles.postTypeButton} onPress={setWhichPostsHandler.bind(null, 'neighborPosts')}>
              <Ionicons
                name={whichPosts === 'neighborPosts' ? 'boat' : 'boat-outline'}
                size={35}
                color={Colors.mainWhite3}
              />
              <Text style={styles.text}>동네소식</Text>
            </Button>
            <Button style={styles.postTypeButton} onPress={setWhichPostsHandler.bind(null, 'allPosts')}>
              <Ionicons
                name={whichPosts === 'allPosts' ? 'accessibility' : 'accessibility-outline'}
                size={35}
                color={Colors.mainWhite3}
              />
              <Text style={styles.text}>전체소식</Text>
            </Button>
          </View>
        </View>
        <Button style={styles.makePostButton} onPress={goToMakePostHandler}>
          <Text style={styles.text}>게시글작성하기</Text>
        </Button>
      </View>
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap: {
    width: '80%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainWhite1,
    borderRadius: 5,
    gap: 15,
    ...Shadow,
  },
  locate: {
    width: '100%',
    minHeight: 50,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.mainGreen2,
    borderRadius: 5,
    gap: 10,
  },
  location: {
    flex: 1,
    justifyContent: 'center',
  },
  locationText: {
    fontWeight: 'bold',
  },
  postType: {
    width: '100%',
  },
  postTypeButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  postTypeButton: {
    flex: 1,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Colors.mainBlue5,
    gap: 5,
    ...Shadow,
  },
  makePostButton: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Colors.mainGreen2,
    ...Shadow,
  },
  text: {
    color: Colors.mainWhite3,
    fontWeight: 'bold',
  },
});

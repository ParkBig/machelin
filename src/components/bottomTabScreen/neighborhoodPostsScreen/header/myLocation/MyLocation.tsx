import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/layout/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { Colors, Size } from 'const/global-styles';
import useUsersSubLocalityQuery from 'query/hooks/users/useUsersSubLocalityQuery';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { myLocationState } from 'store/locationState';
import getMyLocationHandler from 'util/getMyLocationHandler';
import PostOptionsModal from './postOptionsModal/PostOptionsModal';
import { whichSelectedPostsState } from 'store/toggleState';

export default function MyLocation() {
  const { mySubLocality } = useUsersSubLocalityQuery();
  const whichSelectedPosts = useRecoilValue(whichSelectedPostsState);
  const setMyLocation = useSetRecoilState(myLocationState);
  const [myLocationString, setMyLocationString] = useState('');
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });
  const [toggleLocateOptionsModal, setToggleLocateOptionsModal] = useState(false);

  const toggleLocateOptionsModalHandler = () => {
    setToggleLocateOptionsModal(prev => !prev);
  };

  useEffect(() => {
    getMyLocationHandler(setMyLocation, setToggleAlertModal);

    if (mySubLocality && mySubLocality.ok) {
      if (mySubLocality.isKorea) {
        setMyLocationString(mySubLocality.localityArr.slice(1).join(' '));
      } else {
        setMyLocationString(mySubLocality.localityArr[0]);
      }
    } else {
      setMyLocationString('위치를 찾는 중...');
    }
  }, [mySubLocality]);

  return (
    <>
      <Button style={styles.wrap} onPress={toggleLocateOptionsModalHandler}>
        <View style={styles.locate}>
          <Ionicons name="location" size={30} color={Colors.mainWhite3} />
          <View style={styles.location}>
            <Text style={styles.text}>{whichSelectedPosts === 'allPosts' ? "전체소식" : myLocationString}</Text>
          </View>
        </View>
        <View style={styles.ionicons}>
          <Ionicons name="menu" size={30} color={Colors.mainWhite3} />
        </View>
      </Button>
      <PostOptionsModal
        toggleModal={toggleLocateOptionsModal}
        toggleModalHandler={toggleLocateOptionsModalHandler}
        myLocationString={myLocationString}
      />
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'row',
  },
  locate: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  location: {
    flex: 1,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    color: Colors.mainWhite3,
    fontSize: Size.normalBig,
    fontWeight: 'bold',
  },
  ionicons: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colors.mainWhite3,
  },
});

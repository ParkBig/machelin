import Button from 'components/common/layout/Button';
import { Colors } from 'const/global-styles';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import SearchPicker from '../areaPicker/SearchPicker';
import SearchBar from '../searchBar/SearchBar';
import { useEffect } from 'react';
import useUsersSubLocalityQuery from 'query/hooks/users/useUsersSubLocalityQuery';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { regionalRestaurantSearchInputState, regionalSearchState } from 'store/searchState';

interface Props {
  toggleModal: boolean;
  toggleModalHandler: () => void;
}

export default function RegionalSearchModal({ toggleModal, toggleModalHandler }: Props) {
  const { mySubLocality } = useUsersSubLocalityQuery();
  const [
    {
      isTyping,
      location: { city, district },
      searchText,
    },
    setRegionalRestaurantSearchInput,
  ] = useRecoilState(regionalRestaurantSearchInputState);
  const setKeyword = useSetRecoilState(regionalSearchState);

  const closeModalHandler = () => {
    setRegionalRestaurantSearchInput(prev => ({ ...prev, isTyping: false }));

    toggleModalHandler();
  };

  useEffect(() => {
    if (city === '내위치') {
      if (mySubLocality && mySubLocality.ok) {
        setKeyword(mySubLocality.localityArr.slice(1).join(' ') + ' ' + searchText);
      } else {
        setKeyword(searchText);
      }
    } else if (city === '전체') {
      setKeyword(searchText);
    } else {
      if (district === '전체' || district === '내위치') {
        setKeyword('대한민국' + ' ' + city + ' ' + searchText);
      } else {
        setKeyword('대한민국' + ' ' + city + ' ' + district + ' ' + searchText);
      }
    }
  }, [mySubLocality, city, district, isTyping, setKeyword]);

  return (
    <Modal
      style={styles.modal}
      isVisible={toggleModal}
      onSwipeComplete={closeModalHandler}
      onBackButtonPress={closeModalHandler}
      onBackdropPress={closeModalHandler}
      swipeDirection={['down']}
      useNativeDriverForBackdrop
    >
      <View style={styles.wrap}>
        <View style={styles.content}>
          <View style={styles.pickers}>
            <View style={styles.ionicons}>
              <Ionicons name="location" size={35} color={Colors.mainGreen2} />
            </View>
            <SearchPicker which="city" />
            <SearchPicker which="district" />
          </View>
          <SearchBar />
          <View>
            <Text style={styles.tipText}>tip. 전체-전체 설정 후 지역 + 키워드 해외검색 가능</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <Button style={styles.button} onPress={closeModalHandler}>
            <Text style={styles.buttonText}>완료</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  wrap: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: Colors.mainWhite1,
    gap: 20,
  },
  content: {
    width: '100%',
    gap: 20,
  },
  pickers: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.mainGreen2,
    borderRadius: 10,
  },
  ionicons: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainGreen2,
  },
  buttonText: {
    fontWeight: 'bold',
    color: Colors.mainWhite3,
  },
  tipText: {
    color: Colors.darkGray
  }
});

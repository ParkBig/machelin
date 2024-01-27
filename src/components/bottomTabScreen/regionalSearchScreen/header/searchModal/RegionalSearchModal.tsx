import Button from 'components/common/layout/Button';
import { Colors } from 'const/global-styles';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { useEffect } from 'react';
import useUsersSubLocalityQuery from 'query/hooks/users/useUsersSubLocalityQuery';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { regionalRestaurantSearchInputState, regionalSearchState } from 'store/searchState';
import SearchBar from '../../searchBar/SearchBar';
import RegionalSelection from './RegionalSelection';

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
          <RegionalSelection />
          <SearchBar />
        </View>
        <View>
          <Text style={styles.tipText}>tip. 전체-전체 설정 후 지역 + 키워드 해외검색 가능</Text>
        </View>
        <Button style={styles.doneButton} onPress={closeModalHandler}>
          <Text style={styles.doneButtonText}>완료</Text>
        </Button>
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
  doneButton: {
    height: 60,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainGreen2,
    marginBottom: Platform.OS === 'ios' ? 10 : 0,
    gap: 10,
  },
  doneButtonText: {
    fontWeight: 'bold',
    color: Colors.mainWhite3,
  },
  tipText: {
    color: Colors.darkGray,
  },
});

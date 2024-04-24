import Button from 'components/common/layout/Button';
import Line from 'components/common/layout/Line';
import { administrativeDistrict, administrativeDistrictName } from 'const/administrativeDistrict';
import { Colors } from 'const/global-styles';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { useRecoilState } from 'recoil';
import { regionalRestaurantSearchInputState } from 'store/searchState';

interface Props {
  toggleModal: boolean;
  toggleModalHandler: () => void;
  which?: 'city' | 'gu' | null;
}

export default function RegionalModal({ toggleModal, toggleModalHandler, which }: Props) {
  const [
    {
      location: { city },
    },
    setRegionalRestaurantSearchInput,
  ] = useRecoilState(regionalRestaurantSearchInputState);

  const closeModalHandler = () => {
    toggleModalHandler();
  };

  const whichValue = which === 'city' ? 'city' : 'district';
  const values = which === 'city' ? administrativeDistrictName : administrativeDistrict[city];

  const changeRegionalHandler = (itemValue: any) => {
    setRegionalRestaurantSearchInput(prev => {
      if (whichValue === 'city') {
        if (itemValue === '내위치') {
          const newLocation = { ...prev.location, city: itemValue, district: itemValue };
          return { ...prev, location: newLocation, isTyping: false };
        } else {
          const newLocation = { ...prev.location, city: itemValue, district: '전체' };
          return { ...prev, location: newLocation, isTyping: false };
        }
      } else {
        const newLocation = { ...prev.location, district: itemValue };
        return { ...prev, location: newLocation, isTyping: false };
      }
    });
    toggleModalHandler();
  };

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
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => String(index)}
          data={values}
          ItemSeparatorComponent={() => <Line style={styles.line} />}
          renderItem={({ item }) => (
            <Button style={styles.renderItem} onPress={changeRegionalHandler.bind(null, item)}>
              <Text>{item}</Text>
            </Button>
          )}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  wrap: {
    maxHeight: 300,
    width: '80%',
    borderRadius: 10,
    backgroundColor: Colors.mainWhite1,
  },
  renderItem: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.lightGrayOpacity1,
  },
});

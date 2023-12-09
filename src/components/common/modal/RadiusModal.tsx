import { Colors, Shadow, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import { useRecoilState } from 'recoil';
import { searchRadiusState } from 'store/locationState';
import { LocationSearchRadius } from 'types/store/locationType';
import Button from 'components/common/layout/Button';

interface Props {
  toggleModal: boolean;
  toggleModalHandler: () => void;
}

export default function RadiusModal({ toggleModal, toggleModalHandler }: Props) {
  const [searchRadius, setSearchRadius] = useRecoilState(searchRadiusState);

  const onValueChangeHandler = (value: LocationSearchRadius) => {
    toggleModalHandler();
    setSearchRadius(value);
  };

  return (
    <Modal
      style={styles.modal}
      backdropColor="transparent"
      isVisible={toggleModal}
      onSwipeComplete={toggleModalHandler}
      onBackdropPress={toggleModalHandler}
      onBackButtonPress={toggleModalHandler}
      swipeDirection={['down']}
      useNativeDriverForBackdrop
    >
      <View style={styles.wrap}>
        <View style={styles.title}>
          <Text style={styles.text}>거리설정</Text>
        </View>
        <View style={styles.picker}>
          <Picker selectedValue={searchRadius} onValueChange={onValueChangeHandler}>
            <Picker.Item label={'500m'} value={'500'} />
            <Picker.Item label={'1000m - 기본설정'} value={'1000'} />
            <Picker.Item label={'1500m'} value={'1500'} />
            <Picker.Item label={'2000m'} value={'2000'} />
            <Picker.Item label={'3000m'} value={'3000'} />
          </Picker>
        </View>
        <Button style={styles.button} onPress={toggleModalHandler}>
          <Text style={styles.text}>취소</Text>
        </Button>
      </View>
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
    width: '70%',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.mainWhite1,
    ...Shadow,
  },
  title: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  picker: {
    width: '100%',
    marginVertical: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.mainGreen2,
  },
  button: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: Size.normalBig,
  },
});

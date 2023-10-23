import Button from 'components/common/Button';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Size } from 'const/global-styles';
import { searchKeyword } from 'data/searchKeyword';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';

interface Props {
  toggleModal: boolean;
  openKeywordsHandler: () => void;
}

export default function KeywordsModal({ toggleModal, openKeywordsHandler }: Props) {
  return (
    <Modal
      style={styles.modal}
      backdropColor="transparent"
      isVisible={toggleModal}
      onSwipeComplete={openKeywordsHandler}
      onBackdropPress={openKeywordsHandler}
      onBackButtonPress={openKeywordsHandler}
      swipeDirection={['down']}
      useNativeDriverForBackdrop
    >
      <View style={styles.wrap}>
        <View style={styles.title}>
          <View style={styles.icons}>
            <Ionicons name="flash" size={25} color={Colors.mainGreen3} />
            <Text style={styles.titleText}>키워드</Text>
          </View>
          <Button onPress={openKeywordsHandler} style={styles.done}>
            <Text style={styles.titleText}>완료</Text>
          </Button>
        </View>
        <FlatList
          style={styles.keywords}
          numColumns={5}
          data={searchKeyword}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.keyword}>
              <View style={styles.image}></View>
              <View style={styles.name}><Text>{item.name}</Text></View>
            </View>
          )}
        />
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
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderTopWidth: 4,
    borderTopColor: Colors.mainGreen3,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: Colors.mainBlue1,
    gap: 10,
  },
  title: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Colors.mainGreen2,
    borderBottomWidth: 2,
  },
  icons: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  done: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneText: {
    color: Colors.mainWhite1,
    fontSize: Size.normalBig,
    fontWeight: 'bold',
  },
  keywords: {
    maxHeight: 296,
  },
  keyword: {
    flex: 1,
    margin: 2,
    height: 70,
    justifyContent: 'center',
    backgroundColor: 'tomato',
  },
  image: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    height: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: Colors.mainGreen3,
    fontSize: Size.normalBig,
    fontWeight: 'bold',
  },
});

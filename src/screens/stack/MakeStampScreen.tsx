import Line from 'components/common/layout/Line';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import BriefRestaurantInfoForStamp from 'components/stackScreen/makeStampScreen/BriefRestaurantInfoForStamp';
import { Colors, Size } from 'const/global-styles';
import { restaurantsTextSearchQuery } from 'query/restaurants';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useMutation } from 'react-query';
import { GooglePlace } from 'types/data/restaureant';

export default function MakeStampScreen() {
  const [textInputValue, setTextInputValue] = useState('');
  const [searchResult, setSearchResult] = useState<GooglePlace[]>([]);
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const { mutate } = useMutation(restaurantsTextSearchQuery, {
    onSuccess: res => {
      if (res.ok) {
        setSearchResult(res.restaurants);
      } else {
        setToggleAlertModal({ toggle: true, alertMsg: res.msg });
      }
    },
  });

  const onChangeTextHandler = (text: string) => {
    setTextInputValue(text);
  };

  const onEndEditingHandler = () => {
    if (textInputValue) {
      mutate(textInputValue);
    }
  };

  return (
    <View style={styles.wrap}>
      <TextInput
        style={styles.textInput}
        placeholder="식당이름"
        value={textInputValue}
        onChangeText={onChangeTextHandler}
        onEndEditing={onEndEditingHandler}
      />
      <View style={styles.explain}>
        <Text style={styles.explainText}>도장 찍기는 현재 위치만 찍을 수 있어요.</Text>
        <Text style={styles.explainText}>그래서 직접 다녀왔다는 인증이 가능해요!</Text>
      </View>
      <FlatList
        style={[styles.searchResult, searchResult.length !== 0 && styles.hasResult]}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.place_id}
        ItemSeparatorComponent={() => <Line style={styles.line} />}
        data={searchResult}
        renderItem={({ item }) => <BriefRestaurantInfoForStamp restaurantInfo={item} />}
      />
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
    flex: 1,
    backgroundColor: Colors.mainWhite1,
    paddingHorizontal: 15,
    paddingTop: 20,
    gap: 20,
  },
  textInput: {
    width: '100%',
    height: 60,
    borderBottomWidth: 2,
    borderBottomColor: Colors.mainGreen2,
    fontSize: Size.normalBig,
  },
  explain: {
    width: '100%',
    gap: 5,
  },
  searchResult: {
    flex: 1,
  },
  hasResult: {
    borderTopWidth: 1,
    borderTopColor: Colors.superLightGray,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.superLightGray,
  },
  explainText: {
    color: Colors.darkGray,
  },
});

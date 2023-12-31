import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import Line from 'components/common/layout/Line';
import BriefRestaurantInfoForTag from 'components/stackScreen/findRestaurantInfoForMakePostScreen/BriefRestaurantInfoForTag';
import { Colors } from 'const/global-styles';
import { restaurantsTextSearchQuery } from 'query/restaurants';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useMutation } from 'react-query';
import { GooglePlace } from 'types/types';
import { StackScreenPropsAbout } from 'types/screenType';
import BriefRestaurantInfoForStamp from 'components/stackScreen/makeStampScreen/BriefRestaurantInfoForStamp';

export default function FindRestaurantInfoScreen({ route }: StackScreenPropsAbout<'FindRestaurantInfoScreen'>) {
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
      mutate({ keyword: textInputValue, isRestaurant: false });
    }
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.search}>
        <TextInput
          style={styles.textInput}
          placeholder={route.params.forWhich === 'makePost' ? '식당 or 지역 식당 검색' : '장소 or 지역 장소 검색'}
          value={textInputValue}
          onChangeText={onChangeTextHandler}
          onEndEditing={onEndEditingHandler}
        />
        <Text style={styles.example}>
          {route.params.forWhich === 'makePost'
            ? 'ex) 식당이름 or 서울 강남 식당이름'
            : 'ex) 장소이름 or 서울 강남 장소이름'}
        </Text>
        <Text style={styles.example}>Tip. 지역이름을 붙이면 찾기 쉬워요</Text>
      </View>
      <FlatList
        style={[styles.searchResult, searchResult.length !== 0 && styles.hasResult]}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.place_id}
        ItemSeparatorComponent={() => <Line style={styles.line} />}
        data={searchResult}
        renderItem={({ item }) =>
          route.params.forWhich === 'makePost' ? (
            <BriefRestaurantInfoForTag restaurantInfo={item} />
          ) : (
            <BriefRestaurantInfoForStamp restaurantInfo={item} />
          )
        }
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
    paddingTop: 20,
    paddingHorizontal: 15,
    backgroundColor: Colors.mainWhite1,
    gap: 20,
  },
  search: {
    width: '100%',
    gap: 10,
  },
  textInput: {
    width: '100%',
    height: 60,
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    borderColor: Colors.mainGreen2,
  },
  example: {
    color: Colors.gray,
    paddingHorizontal: 10,
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
});

export type SearchKeywordId =
  | 'Korean'
  | 'Japanese'
  | 'Western'
  | 'Chinese'
  | 'Chicken'
  | 'Burger'
  | 'Pizza'
  | 'Pork-Cutlet'
  | 'Snack-Bar'
  | 'Cafe'
  | 'Soup'
  | 'Sushi'
  | 'Meat'
  | 'Salad'
  | 'Lunch-Box'
  | 'Porridge'
  | 'Pub'
  | 'Asian'
  | 'empty1'
  | 'empty2';
export type SearchKeywordName =
  | '한식'
  | '일식'
  | '양식'
  | '중식'
  | '치킨'
  | '버거'
  | '피자'
  | '돈까스'
  | '분식'
  | '카페'
  | '국물'
  | '초밥'
  | '고기'
  | '샐러드'
  | '도시락'
  | '죽'
  | '선술집'
  | '아시안'
  | '';

interface SearchKeyword {
  id: SearchKeywordId;
  name: SearchKeywordName;
}

export const searchKeyword: SearchKeyword[] = [
  {
    id: 'Korean',
    name: '한식',
  },
  {
    id: 'Japanese',
    name: '일식',
  },
  {
    id: 'Western',
    name: '양식',
  },
  {
    id: 'Chinese',
    name: '중식',
  },
  {
    id: 'Asian',
    name: '아시안',
  },
  {
    id: 'Chicken',
    name: '치킨',
  },
  {
    id: 'Burger',
    name: '버거',
  },
  {
    id: 'Pizza',
    name: '피자',
  },
  {
    id: 'Pork-Cutlet',
    name: '돈까스',
  },
  {
    id: 'Snack-Bar',
    name: '분식',
  },
  {
    id: 'Cafe',
    name: '카페',
  },
  {
    id: 'Soup',
    name: '국물',
  },
  {
    id: 'Sushi',
    name: '초밥',
  },
  {
    id: 'Meat',
    name: '고기',
  },
  {
    id: 'Salad',
    name: '샐러드',
  },
  {
    id: 'Lunch-Box',
    name: '도시락',
  },
  {
    id: 'Porridge',
    name: '죽',
  },
  {
    id: 'Pub',
    name: '선술집',
  },
  {
    id: 'empty1',
    name: '',
  },
  {
    id: 'empty2',
    name: '',
  },
];

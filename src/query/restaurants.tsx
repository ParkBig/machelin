import { GOOGLE_KEY } from '@env';
import axios from 'axios';
import { Restaurant, responseRestaurant } from 'types/data/restaureant';
import { axiosIns } from './axiosInstance';

export const getNearbyRestaurants = async (lat: number, lng: number) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` +
        `location=${lat},${lng}&radius=4000&keyword=식당&key=${GOOGLE_KEY}&language=ko`
    );
    const responseRestaurantList = response.data.results;
    const restaurantList: Restaurant[] = await Promise.all(
      responseRestaurantList.map(async (props: responseRestaurant) => ({
        ...props,
        photo: props.photos ? await getRestaurantPhotos(props.photos[0].photo_reference) : null,
      }))
    );

    console.log(restaurantList);
    return restaurantList;
  } catch (error) {
    return [];
  }
};

export const getDetailRestaurantInfo = async (placeId: string) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_KEY}&language=ko`
    );

    const test = response.data.result;
  } catch (error) {
    console.log(error);
  }
};

export const getRestaurantPhotos = async (photoReference: string) => {
  try {
    const photoResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=${GOOGLE_KEY}`
    );
    const restaurantImgUrl = photoResponse.request.responseURL;

    return restaurantImgUrl;
  } catch (error) {
    console.log(error);
  }
};

/////////////////////

const nearByMe = `https://openapi.naver.com/v1/search/local.json?query=음식점&display=10&start=1&sort=random&x=127.0276&y=37.4979&radius=1000`;
const detailInfo = 'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v3/gc';
const c = 'https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode';

export const naver = async (lat?: number, lng?: number) => {
  try {
    /** 내위치 기반 주변 식당 리스트 */
    // const responseA = await axios.get(nearByMe, {
    //   params: {
    //     display: 10,
    //     sort: 'random',
    //   },
    // headers: {
    //   'X-Naver-Client-Id': '3nyq1PJcf_Sob02yDA2V',
    //   'X-Naver-Client-Secret': 'hwAZLsSqji',
    // },
    // });
    // 잘됨
    const responseC = await axios({
      method: 'get',
      url: c,
      params: {
        query: '서울특별시 중구 북창동 11-7 1층',
      },
      headers: {
        'X-NCP-APIGW-API-KEY-ID': '9fpsdc5tq7',
        'X-NCP-APIGW-API-KEY': 'WFG3vX3tVjvYNBmbBz7W8i1c3u7O2qmpXh2ySRJy',
      },
    });
    console.log(responseC.data, 'h');
  } catch (error) {
    console.log(error);
  }
};

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

export const restaurantsQuery = async (lat: number, lng: number, radius: string, keyword: string = '식당') => {
  const { data } = await axiosIns.get('/restaurants/nearbyRestaurants', {
    params: {
      lat,
      lng,
      radius,
      keyword,
    },
  });
  return data;
};

export const restaurantDetailQuery = async (placeId: string) => {
  const { data } = await axiosIns.get('/restaurants/detailRestaurant', {
    params: {
      placeId,
    },
  });
  return data;
};

export const testRestaurantQuery = async (test: string) => {
  const { data } = await axiosIns.get('/restaurants/test', {
    params: {
      test,
    },
  });
  return data;
};

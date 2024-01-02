import axios from 'axios';
import { takeToken } from 'util/tokenDB';
import Constants from 'expo-constants';

export const axiosRestaurants = axios.create({
  baseURL: `${Constants.manifest?.extra?.EXPO_DEV_SERVER_URL}/restaurants`,
});

axiosRestaurants.interceptors.request.use(async config => {
  const token = await takeToken();
  if (token) {
    config.headers['token'] = token;
  }

  return config;
});

interface RestaurantsTextSearchQueryInput {
  keyword: string;
  isRestaurant: boolean;
  nextPageParams?: string;
}

export const nearbyRestaurantsSearchQuery = async (
  lat: number,
  lng: number,
  radius: string,
  keyword: string,
  nextPageParams?: string
) => {
  const { data } = await axiosRestaurants.get('/nearbyRestaurantsSearch', {
    params: {
      lat,
      lng,
      radius,
      keyword,
      nextPageParams: nextPageParams ? nextPageParams : null,
    },
  });

  return data;
};

export const restaurantsTextSearchQuery = async ({ keyword, isRestaurant, nextPageParams }: RestaurantsTextSearchQueryInput) => {
  const { data } = await axiosRestaurants.get('/restaurantsTextSearch', {
    params: {
      keyword,
      isRestaurant,
      nextPageParams: nextPageParams ? nextPageParams : null,
    },
  });

  return data;
};

export const restaurantDetailQuery = async (restaurantId: string) => {
  const { data } = await axiosRestaurants.get('/restaurantDetail', {
    params: {
      restaurantId,
    },
  });

  return data;
};

export const restaurantPostsQuery = async (restaurantId: string, page: number = 1) => {
  const { data } = await axiosRestaurants.get('/restaurantPosts', {
    params: {
      restaurantId,
      page,
    },
  });

  return data;
};

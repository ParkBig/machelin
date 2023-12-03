import axios from 'axios';
import { takeToken } from 'util/tokenDB';

const axiosRestaurants = axios.create({
  baseURL: `${process.env.DEV_SERVER_URL}/restaurants`,
});

axiosRestaurants.interceptors.request.use(async config => {
  const token = await takeToken();
  if (token) {
    config.headers['token'] = token;
  }
  return config;
});

export const restaurantsQuery = async (
  lat: number,
  lng: number,
  radius: string,
  keyword: string,
  nextPageParams?: string
) => {
  const { data } = await axiosRestaurants.get('/nearbyRestaurants', {
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

export const restaurantDetailQuery = async (restaurantId: string) => {
  const { data } = await axiosRestaurants.get('/restaurantDetail', {
    params: {
      restaurantId,
    },
  });
  return data;
};

export const restaurantPostsQuery = async (restaurantId: string) => {
  const { data } = await axiosRestaurants.get('/restaurantPosts', {
    params: {
      restaurantId,
    },
  });
  return data;
};

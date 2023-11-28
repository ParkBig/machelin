import axios from 'axios';
import { takeToken } from 'util/tokenDB';

const axiosRestaurants = axios.create({
  baseURL: `${process.env.DEV_SERVER_URL}`,
});

axiosRestaurants.interceptors.request.use(async config => {
  const token = await takeToken();
  if (token) {
    config.headers['token'] = token;
  }
  return config;
});


export const restaurantsQuery = async (lat: number, lng: number, radius: string, keyword: string) => {
  const { data } = await axiosRestaurants.get('/restaurants/nearbyRestaurants', {
    params: {
      lat,
      lng,
      radius,
      keyword,
    },
  });
  return data;
};

export const restaurantDetailQuery = async (restaurantId: string) => {
  const { data } = await axiosRestaurants.get('/restaurants/detailRestaurant', {
    params: {
      restaurantId,
    },
  });
  return data;
};

import { createAxiosInstance } from './api';

export const axiosRestaurants = createAxiosInstance('restaurants');

interface RestaurantsTextSearchQueryInput {
  keyword: string;
  isRestaurant: string;
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

export const restaurantsTextSearchQuery = async ({
  keyword,
  isRestaurant,
  nextPageParams,
}: RestaurantsTextSearchQueryInput) => {
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

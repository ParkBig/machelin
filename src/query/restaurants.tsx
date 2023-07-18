import { GOOGLE_KEY } from '@env';
import axios from 'axios';
import { Restaurant, responseRestaurant } from 'types/data/restaureant';

export const getNearbyRestaurants = async (lat: number, lng: number) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` +
        `location=${lat},${lng}&radius=4000&keyword=식당&key=${GOOGLE_KEY}`
    );
    const responseRestaurantList = response.data.results;
    const restaurantList: Restaurant[] = await Promise.all(
      responseRestaurantList.map(async (props: responseRestaurant) => ({
        ...props,
        photo: props.photos ? await getRestaurantPhotos(props.photos[0].photo_reference) : null,
      }))
    );

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

    const test = response.data.result.photos;
    console.log(test);
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

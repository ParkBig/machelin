import axios from 'axios';
import Constants from 'expo-constants';
import { takeToken } from 'util/tokenDB';

export const axiosBookmarks = axios.create({
  baseURL: `${Constants.manifest?.extra?.EXPO_DEV_SERVER_URL}/bookmark`,
});

axiosBookmarks.interceptors.request.use(async config => {
  const token = await takeToken();
  if (token) {
    config.headers['token'] = token;
  }
  return config;
});

interface ToggleBookmarkInput {
  restaurantId: string;
  lat: number;
  lng: number;
  restaurantName: string;
  images: string[];
  address: string;
  rating: number;
  totalRatings: number;
}

export const usersBookmarksQuery = async (userId?: number) => {
  if (!userId) {
    return { ok: false, bookmarks: null };
  }

  const { data } = await axiosBookmarks.get('/usersBookmarks', {
    params: {
      userId,
    },
  });
  return data;
};

export const toggleBookmarkQuery = async (toggleBookmarkInput: ToggleBookmarkInput) => {
  const { data } = await axiosBookmarks.post('/toggleBookmark', toggleBookmarkInput);
  return data;
};

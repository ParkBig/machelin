import axios from 'axios';
import { takeToken } from 'util/tokenDB';

interface ToggleBookmarkInput {
  restaurantId: string;
  lat: string;
  lng: string;
  restaurantName: string;
  images: string[];
  address: string;
  rating: string;
  totalRatings: string;
}

const axiosBookmarks = axios.create({
  baseURL: `${process.env.DEV_SERVER_URL}/bookmark`,
});

axiosBookmarks.interceptors.request.use(async config => {
  const token = await takeToken();
  if (token) {
    config.headers['token'] = token;
  }
  return config;
});

export const getBookmarksQuery = async () => {};

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

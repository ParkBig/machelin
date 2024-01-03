import { createAxiosInstance } from './api';

export const axiosBookmarks = createAxiosInstance('bookmark');

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

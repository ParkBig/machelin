import { useInfiniteQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { regionalRestaurantSearchInputState, regionalSearchState } from 'store/searchState';
import { GooglePlace } from 'types/types';
import useUsersSubLocalityQuery from '../users/useUsersSubLocalityQuery';
import { axiosRestaurants } from 'query/api/restaurants';
import { useEffect } from 'react';

interface Data {
  ok: boolean;
  msg: string;
  restaurants: GooglePlace[];
  next_page_token: string;
}

export default function useRegionalRestaurantSearchQuery() {
  const { mySubLocality } = useUsersSubLocalityQuery();
  const { isTyping, searchText } = useRecoilValue(regionalRestaurantSearchInputState);
  const [keyword, setKeyword] = useRecoilState(regionalSearchState);

  useEffect(() => {
    if (mySubLocality) {
      setKeyword(mySubLocality.localityArr.slice(1).join(' '));
    }
  }, [mySubLocality, setKeyword]);

  const {
    data: restaurants,
    isLoading: restaurantsIsLoading,
    refetch: reRestaurants,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Data, unknown, GooglePlace>(
    ['nearbyRestaurantsSearch', keyword],
    async ({ pageParam = null }) => {
      const { data } = await axiosRestaurants.get('/restaurantsTextSearch', {
        params: {
          keyword,
          isRestaurant: searchText ? 'false' : 'true',
          nextPageParams: pageParam ? pageParam : null,
        },
      });

      return data;
    },
    {
      enabled: keyword ? (isTyping ? false : true) : false,
      select: data => ({ pages: data.pages.flatMap(page => page.restaurants), pageParams: data.pageParams }),
      getNextPageParam: lastPage => {
        return lastPage.next_page_token || null;
      },
    }
  );

  const fetchNextPageRestaurants = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return { restaurants, restaurantsIsLoading, reRestaurants, fetchNextPageRestaurants, isFetchingNextPage };
}

import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchJobListings = async ({ pageParam = null }) => {
  const params = new URLSearchParams();
  params.set('limit', '2');

  if (pageParam) {
    params.set('lastJobId', pageParam);
  }

  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job-listing?${params.toString()}`);
  return data;
};

export const useJobListings = () => {
  return useInfiniteQuery({
    queryKey: ['jobListings'],
    queryFn: fetchJobListings,
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore || lastPage.jobListings.length === 0) {
        return undefined;
      }
      return lastPage.jobListings.at(-1)?._id;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

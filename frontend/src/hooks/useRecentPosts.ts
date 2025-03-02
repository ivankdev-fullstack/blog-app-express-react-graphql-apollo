import {
  GET_RECENT_POSTS,
  GetRecentPostsQueryResponse,
} from "@/graphql/queries/get-recent-posts";
import { useQuery } from "@apollo/client";

interface UseRecentPostsResponse {
  data: GetRecentPostsQueryResponse | undefined;
  loading: boolean;
  error: any;
}

export const useRecentPosts = (): UseRecentPostsResponse => {
  const { data, loading, error } =
    useQuery<GetRecentPostsQueryResponse>(GET_RECENT_POSTS);

  return {
    data,
    loading,
    error,
  };
};

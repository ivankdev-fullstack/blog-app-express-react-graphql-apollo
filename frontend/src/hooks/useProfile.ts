import {
  GET_PROFILE,
  GetProfileQueryResponse,
} from "@/graphql/queries/get-profile";
import { useQuery } from "@apollo/client";

interface Props {
  userId: number;
}

interface UsePostActionsResponse {
  data: GetProfileQueryResponse | undefined;
  loading: boolean;
  error: any;
}

export const useProfile = ({ userId }: Props): UsePostActionsResponse => {
  const { data, error, loading } = useQuery<GetProfileQueryResponse>(
    GET_PROFILE,
    {
      variables: { userId },
    },
  );

  return {
    data,
    loading,
    error,
  };
};

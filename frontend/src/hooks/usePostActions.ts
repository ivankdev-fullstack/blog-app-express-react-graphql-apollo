import { PUBLISH_POST, UNPUBLISH_POST } from "@/graphql/mutations/post-actions";
import { GET_PROFILE } from "@/graphql/queries/get-profile";
import { GET_RECENT_POSTS } from "@/graphql/queries/get-recent-posts";
import { useMutation } from "@apollo/client";

interface Props {
  postId: string;
  userId: string;
}

interface UsePostActionsResponse {
  publishPost: () => void;
  unpublishPost: () => void;
  isPublishing: boolean;
  isUnpublishing: boolean;
}

export const usePostActions = ({
  postId,
  userId,
}: Props): UsePostActionsResponse => {
  const [publishPost, { loading: isPublishing }] = useMutation(PUBLISH_POST, {
    variables: { postId },
    refetchQueries: [
      { query: GET_PROFILE, variables: { userId } },
      { query: GET_RECENT_POSTS },
    ],
  });

  const [unpublishPost, { loading: isUnpublishing }] = useMutation(
    UNPUBLISH_POST,
    {
      variables: { postId },
      refetchQueries: [
        { query: GET_PROFILE, variables: { userId } },
        { query: GET_RECENT_POSTS },
      ],
    },
  );

  return {
    publishPost,
    unpublishPost,
    isPublishing,
    isUnpublishing,
  };
};

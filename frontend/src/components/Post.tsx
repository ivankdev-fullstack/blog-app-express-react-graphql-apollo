import { usePostActions } from "@/hooks/usePostActions";
import { formatDate } from "@/utils/formatDate";
import { IPost, IUser } from "../types/types";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Props {
  postData: IPost;
  user: IUser;
  isMyProfile?: boolean;
}

export default function Post({ postData, user, isMyProfile = false }: Props) {
  const { id, title, content, published, createdAt } = postData;
  const { publishPost, unpublishPost, isPublishing, isUnpublishing } =
    usePostActions({
      postId: id,
      userId: user.id,
    });

  const formatedDate = formatDate(Number(createdAt));

  const renderPostActions = () => {
    return (
      <div className="shrink-0 space-x-4">
        {!published && (
          <Button
            size="sm"
            onClick={() => publishPost()}
            disabled={isPublishing}
          >
            {isPublishing ? "Publishing..." : "Publish"}
          </Button>
        )}
        {published && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => unpublishPost()}
            disabled={isUnpublishing}
          >
            {isUnpublishing ? "Unpublishing..." : "Unpublish"}
          </Button>
        )}
      </div>
    );
  };

  return (
    <Card className="w-[600px] pb-4">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <span className="mr-5 overflow-hidden text-xl text-nowrap">
              {title}
            </span>
            {isMyProfile && renderPostActions()}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <p className="max-h-[350px] min-h-[50px] overflow-hidden">
            {content}
          </p>
          <div className="flex w-full items-end justify-between text-sm text-neutral-600 italic">
            <span>{formatedDate}</span>
            <span>by {user.username}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

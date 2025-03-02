import { formatDate } from "@/utils/formatDate";
import { IPost, IUser } from "../types/types";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

// const PUBLISH_POST = gql`
//   mutation PublishPost($postId: ID!) {
//     postPublish(postId: $postId) {
//       post {
//         title
//       }
//     }
//   }
// `;

// const UNPUBLISH_POST = gql`
//   mutation unpublishPost($postId: ID!) {
//     postUnpublish(postId: $postId) {
//       post {
//         title
//       }
//     }
//   }
// `;

interface Props {
  postData: IPost;
  user: IUser;
  isMyProfile?: boolean;
}

export default function Post({ postData, user, isMyProfile = false }: Props) {
  const { title, content, published, createdAt } = postData;
  // const [publishPost] = useMutation(PUBLISH_POST);
  // const [unpublishPost] = useMutation(UNPUBLISH_POST);
  console.log(user);

  const formatedDate = formatDate(Number(createdAt));

  const renderPostActions = () => {
    return (
      <div className="shrink-0 space-x-4">
        {published && <Button size="sm">Publish</Button>}
        {!published && (
          <Button size="sm" variant="outline">
            Unpublish
          </Button>
        )}
        <Popover>
          <PopoverTrigger asChild>
            <Button size="sm" variant="outline">
              Actions
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[100px] p-2">
            <div className="flex flex-col gap-2">
              <Button size="sm" variant="outline">
                Delete
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  };

  return (
    <Card className="w-[600px] min-w-[400px] pb-4">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <span className="mr-5 overflow-hidden text-nowrap">{title}</span>
            {isMyProfile && renderPostActions()}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-end">
          <p className="max-h-[150px] min-h-[60px] w-full overflow-hidden">
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

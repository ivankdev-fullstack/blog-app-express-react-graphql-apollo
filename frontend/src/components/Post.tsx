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
  isMyProfile: boolean;
}

export default function Post({ postData, user, isMyProfile }: Props) {
  const { title, content, published, createdAt } = postData;
  // const [publishPost] = useMutation(PUBLISH_POST);
  // const [unpublishPost] = useMutation(UNPUBLISH_POST);

  const formatedDate = new Date(createdAt)
    .toString()
    .split(" ")
    .splice(0, 3)
    .join(" ");

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
              <Button size="sm">Delete</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  };

  return (
    <div>
      {/* {isMyProfile && published === false && (
        <p
          className="Post__publish"
          onClick={() => {
            publishPost({
              variables: {
                postId: id,
              },
            });
          // }}
        >
          publish
        </p>
      )}
      {isMyProfile && published === true && (
        <p
          className="Post__publish"
          onClick={() => {
            unpublishPost({
              variables: {
                postId: id,
              },
            });
          // }}
        >
          unpublish
        </p>
      )} */}
      <Card className="w-[600px] min-w-[400px]">
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
            <span className="text-neutral-600 italic">
              {formatedDate} by {user.name}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

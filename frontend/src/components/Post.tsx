import { IPost } from "../types/types";

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

interface PostProps {
  postData: IPost;
  username: string;
  isMyProfile: boolean;
}

export default function Post({ postData, username, isMyProfile }: PostProps) {
  const { title, content, published, createdAt } = postData;
  // const [publishPost] = useMutation(PUBLISH_POST);
  // const [unpublishPost] = useMutation(UNPUBLISH_POST);

  const formatedDate = new Date(Number(createdAt));

  return (
    <div
      className="Post"
      style={published === false ? { backgroundColor: "hotpink" } : {}}
    >
      {isMyProfile && published === false && (
        <p
          className="Post__publish"
          // onClick={() => {
          //   publishPost({
          //     variables: {
          //       postId: id,
          //     },
          //   });
          // }}
        >
          publish
        </p>
      )}
      {isMyProfile && published === true && (
        <p
          className="Post__publish"
          // onClick={() => {
          //   unpublishPost({
          //     variables: {
          //       postId: id,
          //     },
          //   });
          // }}
        >
          unpublish
        </p>
      )}
      <div className="Post__header-container">
        <h2>{title}</h2>
        <h4>
          Created At {`${formatedDate}`.split(" ").splice(0, 3).join(" ")} by{" "}
          {username}
        </h4>
      </div>
      <p>{content}</p>
    </div>
  );
}

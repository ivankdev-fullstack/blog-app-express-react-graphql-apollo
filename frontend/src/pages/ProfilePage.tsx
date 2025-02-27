// const GET_PROFILE = gql`
//   query GetProfile($userId: ID!) {
//     profile(userId: $userId) {
//       bio
//       isMyProfile
//       user {
//         name
//         posts {
//           id
//           title
//           content
//           createdAt
//           published
//         }
//       }
//     }
//   }
// `;

import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const { id } = useParams();

  // const { data, error, loading } = useQuery(GET_PROFILE, {
  //   variables: {
  //     userId: id,
  //   },
  // });

  // if (error) return <div>error page</div>;
  // if (loading) return <div>Spinner...</div>;

  // const { profile } = data;
  const profile: any = {};

  return (
    <>
      <Navbar user={profile} />

      {/* <div>
        {profile.user.posts.map((post: IPost) => {
          return (
            <Post
              postData={post}
              username={profile.user.name}
              isMyProfile={profile.isMyProfile}
            />
          );
        })}
      </div> */}
    </>
  );
};

export default ProfilePage;

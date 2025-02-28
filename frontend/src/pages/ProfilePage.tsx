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

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import { posts, users } from "@/data";
import { IPost } from "@/types/types";
import { useParams } from "react-router-dom";

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
      {/* <Navbar /> */}

      <div className="mt-8 mb-22 flex flex-col items-center justify-center gap-5">
        <div className="mb-2 text-xl font-bold">
          {profile?.user?.name} posts
        </div>
        {/* User posts */}
        {posts.map((post: IPost) => {
          return (
            <Post
              key={post.id}
              postData={post}
              user={users[0]}
              isMyProfile={true}
            />
          );
        })}
      </div>

      <Footer />
    </>
  );
};

export default ProfilePage;

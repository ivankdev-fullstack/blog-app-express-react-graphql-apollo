import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import {
  GET_PROFILE,
  GetProfileQueryResponse,
} from "@/graphql/queries/get-profile";
import { IPost } from "@/types/types";
import { useQuery } from "@apollo/client";
import { Navigate, useParams } from "react-router-dom";

const ProfilePage = () => {
  const { id } = useParams();
  const { data, error, loading } = useQuery<GetProfileQueryResponse>(
    GET_PROFILE,
    {
      variables: {
        userId: id,
      },
    },
  );

  if (!data?.profile?.user) return <Navigate to="/" />;
  if (error) return <div>error page</div>;
  if (loading) return <div>Spinner...</div>;

  return (
    <>
      <Navbar />

      <div className="mt-8 mb-22 flex flex-col items-center justify-center gap-5">
        <div className="mb-2 text-xl font-bold">
          {data.profile.user.name} posts
        </div>
        {data.profile.user.posts.map((post: IPost) => {
          return (
            <Post
              key={post.id}
              postData={post}
              user={post.user}
              isMyProfile={data.profile.isMyProfile}
            />
          );
        })}
        {/* TODO: if no posts */}
      </div>

      <Footer />
    </>
  );
};

export default ProfilePage;

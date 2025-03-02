import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import Wrapper from "@/components/Wrapper";
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

  if (!loading && !data?.profile?.user) return <Navigate to="/" />;
  if (loading) return <div>Spinner...</div>;
  if (error) return <div>error page</div>;

  return (
    <Wrapper>
      <Navbar />

      <div className="mt-8 mb-22 flex flex-grow flex-col items-center gap-5">
        <div className="mb-2 text-xl font-bold">
          {data?.profile?.user?.username} posts
        </div>
        {data?.profile.user.posts.map((post: IPost) => {
          return (
            <Post
              key={post.id}
              postData={post}
              user={data.profile.user}
              isMyProfile={data?.profile.isMyProfile}
            />
          );
        })}
        {/* TODO: if no posts */}
      </div>

      <Footer />
    </Wrapper>
  );
};

export default ProfilePage;

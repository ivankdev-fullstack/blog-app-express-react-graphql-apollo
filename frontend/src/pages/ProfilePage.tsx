import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import Wrapper from "@/components/Wrapper";
import { useProfile } from "@/hooks/useProfile";
import { IPost } from "@/types/types";
import { Navigate, useParams } from "react-router-dom";

const ProfilePage = () => {
  const { id } = useParams();
  const { data, error, loading } = useProfile({ userId: id! });

  if (!loading && !data?.profile?.user) return <Navigate to="/" />;
  if (loading) return <div>Spinner...</div>;
  if (error) return <div>error page</div>;

  return (
    <Wrapper>
      <Navbar />

      <div className="mt-8 mb-22 flex flex-grow flex-col items-center gap-5">
        <div className="mb-2 text-xl font-bold">
          {data?.profile?.user.posts.length
            ? `${data?.profile?.user?.username} posts`
            : "No posts"}
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
      </div>

      <Footer />
    </Wrapper>
  );
};

export default ProfilePage;

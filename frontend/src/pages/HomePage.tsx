import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import Wrapper from "@/components/Wrapper";
import { useRecentPosts } from "@/hooks/useRecentPosts";
import { IPost } from "@/types/types";

const HomePage = () => {
  const { data, loading, error } = useRecentPosts();

  if (error) return <div>error page</div>;
  if (loading) return <div>Spinner...</div>;

  return (
    <Wrapper>
      <Navbar />

      <div className="mx-auto mt-8 mb-22 flex max-w-[1280px] flex-grow flex-col items-center gap-5">
        <div className="mb-2 text-xl font-bold">
          {data?.posts.length ? "Recent posts" : "No posts"}
        </div>
        <div className="flex flex-wrap justify-center gap-5">
          {data?.posts.map((post: IPost) => {
            return <Post key={post.id} postData={post} user={post.user} />;
          })}
        </div>
      </div>

      <Footer />
    </Wrapper>
  );
};

// GQL query to fetch posts

export default HomePage;

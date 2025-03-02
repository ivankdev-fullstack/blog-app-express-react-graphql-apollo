import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import Wrapper from "@/components/Wrapper";
import {
  GET_RECENT_POSTS,
  GetRecentPostsQueryResponse,
} from "@/graphql/queries/get-recent-posts";
import { IPost } from "@/types/types";
import { useQuery } from "@apollo/client";

const HomePage = () => {
  const { data, loading, error } =
    useQuery<GetRecentPostsQueryResponse>(GET_RECENT_POSTS);

  if (error) return <div>error page</div>;
  if (loading) return <div>Spinner...</div>;

  return (
    <Wrapper>
      <Navbar />

      <div className="mx-auto mt-8 mb-22 flex max-w-[1280px] flex-grow flex-col items-center gap-5">
        <div className="mb-2 text-xl font-bold">Recent posts</div>
        <div className="flex flex-wrap justify-center gap-5">
          {data?.posts.map((post: IPost) => {
            return <Post key={post.id} postData={post} user={post.user} />;
          })}
          {/* TODO: if no posts */}
        </div>
      </div>

      <Footer />
    </Wrapper>
  );
};

// GQL query to fetch posts

export default HomePage;

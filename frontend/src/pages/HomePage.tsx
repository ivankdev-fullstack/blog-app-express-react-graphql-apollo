import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import { posts, users } from "@/data";
import { IPost } from "@/types/types";

const HomePage = () => {
  const profile: any = {};

  return (
    <>
      <Navbar user={profile} />

      <div className="mx-auto mt-8 mb-22 flex max-w-[1280px] flex-col items-center justify-center gap-5">
        <div className="mb-2 text-xl font-bold">Recent posts</div>
        <div className="flex flex-wrap justify-center gap-5">
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
      </div>

      <Footer />
    </>
  );
};

// GQL query to fetch posts

export default HomePage;

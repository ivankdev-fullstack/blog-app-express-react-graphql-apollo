import { Link } from "react-router-dom";
import { IUser } from "../types/types";
import NewPostModal from "./NewPostModal";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";

interface Props {
  user?: IUser;
}

const Navbar = ({ user }: Props) => {
  return (
    <div className="flex items-center justify-between border-b-1 px-20 py-3">
      <Link to="/" className="text-xl font-bold">
        BlogApp
      </Link>
      <div>
        {user ? (
          <div className="flex items-center gap-8">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="rounded-sm" variant="outline">
                  New Post
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle className="mb-5">Create new post</DialogTitle>
                <NewPostModal />
              </DialogContent>
            </Dialog>

            <div className="text-sm">
              Hello,{" "}
              <Link to={`/profile/${user.id}`} className="underline">
                username
              </Link>
            </div>
          </div>
        ) : (
          <Button size="sm" className="rounded-sm" variant="outline">
            <Link to="/signin">Sign in</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

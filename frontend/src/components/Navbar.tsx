import { Link } from "react-router-dom";
import { IUser } from "../types/types";
import NewPostModal from "./NewPostModal";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

interface Props {
  user?: IUser;
}

const Navbar = ({ user }: Props) => {
  return (
    <div className="flex items-center justify-between border-b-1 px-20 py-3">
      <div className="text-xl font-bold">BlogApp</div>
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
                <NewPostModal />
              </DialogContent>
            </Dialog>

            <div className="text-sm">
              Hello, <span className="underline">username</span>
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

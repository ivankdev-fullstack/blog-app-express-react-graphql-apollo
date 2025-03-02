export interface IPost {
  id: string;
  title: string;
  content: string;
  published: boolean;
  user: IUser;
  createdAt: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  posts: IPost[];
}

export interface IProfile {
  id: string;
  bio: string;
  isMyProfile: boolean;
  user: IUser;
}

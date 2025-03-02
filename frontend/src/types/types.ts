export interface IPost {
  id: number;
  title: string;
  content: string;
  published: boolean;
  user: IUser;
  createdAt: string;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  posts: IPost[];
}

export interface IProfile {
  id: number;
  bio: string;
  isMyProfile: boolean;
  user: IUser;
}

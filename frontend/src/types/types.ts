export interface IPost {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  // user: IUser
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  // posts: IPost[]
}

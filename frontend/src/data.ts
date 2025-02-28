import { IPost, IUser } from "./types/types";

const users: IUser[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
  },
];

const posts: IPost[] = [
  {
    id: "101",
    title: "jdsfhjkdsflkdshj fhdsjfh jdlsdf  React fdsfsdfsfdsfsHooks",
    content: "React Hooks have changed the way we write components...",
    published: true,
    createdAt: "2024-02-28T10:00:00Z",
  },
  {
    id: "102",
    title: "Understanding TypeScript",
    content: "TypeScript is a strongly typed superset of JavaScript...",
    published: true,
    createdAt: "2024-02-27T09:30:00Z",
  },
  {
    id: "103",
    title: "Next.js vs. React",
    content: "Next.js provides SSR capabilities...",
    published: false,
    createdAt: "2024-02-26T08:45:00Z",
  },
  {
    id: "104",
    title: "Styling in Tailwind CSS",
    content: "Tailwind CSS makes styling components easier...",
    published: true,
    createdAt: "2024-02-25T11:15:00Z",
  },
  {
    id: "105",
    title: "Building a GraphQL API",
    content: "GraphQL simplifies API queries...",
    published: true,
    createdAt: "2024-02-24T12:00:00Z",
  },
  {
    id: "106",
    title: "State Management with Redux",
    content: "Redux helps manage global state...",
    published: false,
    createdAt: "2024-02-23T07:20:00Z",
  },
  {
    id: "107",
    title: "React Performance Optimization",
    content: "Optimizing React apps for better performance...",
    published: true,
    createdAt: "2024-02-22T14:30:00Z",
  },
  {
    id: "108",
    title: "Using Framer Motion for Animations",
    content: "Framer Motion provides an easy way to add animations...",
    published: true,
    createdAt: "2024-02-21T16:10:00Z",
  },
  {
    id: "109",
    title: "Deploying React Apps",
    content: "Steps to deploy a React app to production...",
    published: false,
    createdAt: "2024-02-20T18:45:00Z",
  },
  {
    id: "110",
    title: "Testing React Components",
    content: "Jest and React Testing Library help test components...",
    published: true,
    createdAt: "2024-02-19T21:00:00Z",
  },
];

export { posts, users };

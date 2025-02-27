// const CREATE_POST = gql`
//   mutation CreatePost($title: String!, $content: String!) {
//     postCreate(post: { title: $title, content: $content }) {
//       userErrors {
//         message
//       }
//       post {
//         title
//         createdAt
//         content
//         user {
//           name
//         }
//       }
//     }
//   }
// `;

import { useForm } from "react-hook-form";
import { Form, Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const NewPostModal = () => {
  const form = useForm();

  // const [addPost, { data, loading }] = useMutation(CREATE_POST);

  const onSubmit = () => {
    //   addPost({
    //     variables: {
    //       title,
    //       content,
    //     },
    //   });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter password"
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-sm">
          <span className="text-neutral-600">Or</span>
          <Link
            to="/signup"
            className="mx-1 text-sky-600 hover:text-sky-700 hover:underline"
          >
            create a new account.
          </Link>
        </div>

        <div className="flex w-full justify-center">
          <Button type="submit" className="w-[120px]">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewPostModal;

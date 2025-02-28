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

import { FormProvider, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

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
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} required />
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
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  className="max-h-[300px] min-h-[150px]"
                  placeholder="Write something to share..."
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full justify-end">
          <Button type="submit" className="w-[120px]">
            Post
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default NewPostModal;

import {
  CREATE_POST,
  CreatePostMutationResponse,
} from "@/graphql/mutations/create-post";
import { GET_PROFILE } from "@/graphql/queries/get-profile";
import { GET_RECENT_POSTS } from "@/graphql/queries/get-recent-posts";
import { useMutation } from "@apollo/client";
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

interface Props {
  userId?: number;
  onClose: () => void;
}

const NewPostModal = ({ userId, onClose }: Props) => {
  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const [addPost, { loading }] = useMutation<CreatePostMutationResponse>(
    CREATE_POST,
    {
      refetchQueries: [
        { query: GET_PROFILE, variables: { userId } },
        { query: GET_RECENT_POSTS },
      ],
    },
  );

  const onSubmit = async (formData: any) => {
    if (!loading) {
      await addPost({
        variables: {
          ...formData,
        },
      });
      onClose();
    }
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
          name="content"
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
          <Button type="submit" className="w-[120px]" disabled={loading}>
            {loading ? "Posting..." : "Post"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default NewPostModal;

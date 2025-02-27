// const SIGNIN = gql`
//   mutation Signup($email: String!, $password: String!) {
//     signin(credentials: { email: $email, password: $password }) {
//       userErrors {
//         message
//       }
//       token
//     }
//   }
// `;

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";

const SigninPage = () => {
  const form = useForm();

  // const [signup, { data, loading }] = useMutation(SIGNUP);

  const onSubmit = (data: any) => {
    console.log(data);

    //   signup({
    //     variables: {
    //       email,
    //       password,
    //     },
    //   });
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Sign in to get access to manage your blog posts.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default SigninPage;

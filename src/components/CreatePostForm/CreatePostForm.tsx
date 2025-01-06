import { component$, type QRL } from "@builder.io/qwik";
import {
  useForm,
  type SubmitHandler,
  minLength,
  maxLength,
  required,
} from "@modular-forms/qwik";
import { Button } from "../ui/button";
import { Input } from "../ui/Input";
import type { CreatePostInput, User } from "~/types/post";

export interface CreatePostFormProps {
  onSubmit$: QRL<SubmitHandler<CreatePostInput>>;
}

type PostForm = {
  title: string;
  body: string;
  user: User;
};

export const CreatePostForm = component$<CreatePostFormProps>((props) => {
  const { onSubmit$ } = props;

  const [_, { Form, Field }] = useForm<PostForm>({
    loader: {
      value: {
        title: "",
        body: "",
        user: {
          username: "",
        },
      },
    },
  });

  return (
    <Form onSubmit$={onSubmit$} class="space-y-4">
      <Field
        name="title"
        validate={[
          required<string>("Title is required"),
          minLength(3, "Title must be at least 3 characters long"),
          maxLength(100, "Title must be at most 100 characters long"),
        ]}
      >
        {(field, props) => (
          <>
            <label class="mb-2 block text-sm font-medium">Title</label>
            <Input
              {...props}
              type="text"
              value={field.value}
              placeholder="Enter the title of your post"
            />
          </>
        )}
      </Field>
      <Field
        name="body"
        validate={[
          required<string>("Content is required"),
          minLength(5, "Content must be at least 10 characters long"),
          maxLength(5000, "Content must be at most 5000 characters long"),
        ]}
      >
        {(field, props) => (
          <>
            <label class="mb-2 block text-sm font-medium">Content</label>
            <textarea
              {...props}
              class="flex min-h-[150px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={field.value}
              placeholder="Write your post here..."
            />
          </>
        )}
      </Field>
      <Field name="user.username">
        {(field, props) => (
          <Input
            {...props}
            type="text"
            value={field.value}
            placeholder="Enter your username"
          />
        )}
      </Field>
      <Button type="submit">Create Post</Button>
    </Form>
  );
});

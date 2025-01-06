import { component$, useContext, $ } from "@builder.io/qwik";
import { routeAction$, useNavigate } from "@builder.io/qwik-city";
import { CreatePostForm } from "~/components/CreatePostForm/CreatePostForm";
import type { CreatePostInput } from "~/types/post";
import { PostsContext } from "~/lib/store/posts.context";
import type { JSONObject } from "@builder.io/qwik-city";

type ActionReturn = {
  success: boolean;
  data?: {
    id: string;
    createdAt: string;
    title: string;
    body: string;
    user: {
      username: string;
    };
  };
  error?: string;
};

export const useCreatePost = routeAction$((form: JSONObject) => {
  const data = form as CreatePostInput;

  try {
    const newPost = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: newPost,
    } satisfies ActionReturn;
  } catch (error) {
    return {
      success: false,
      error: "Failed to create post",
    } satisfies ActionReturn;
  }
});

export default component$(() => {
  const nav = useNavigate();
  const createPost = useCreatePost();
  const store = useContext(PostsContext);

  return (
    <section class="mx-auto max-w-2xl">
      <h1 class="mb-8 text-4xl font-bold dark:text-muted-foreground">
        Create a New Post
      </h1>
      <CreatePostForm
        onSubmit$={$((values: CreatePostInput) => {
          createPost
            .submit(values)
            .then((result) => {
              if (result.value.success && result.value.data) {
                store.localPosts = [result.value.data, ...store.localPosts];
                nav("/", true);
              } else {
                console.error("Error creating post:", result.value);
              }
            })
            .catch((error) => {
              console.error("Submission error:", error);
            });
        })}
      />
    </section>
  );
});

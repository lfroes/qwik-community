import {
  component$,
  useContext,
  useContextProvider,
  $,
} from "@builder.io/qwik";
import { routeAction$, useNavigate } from "@builder.io/qwik-city";
import { CreatePostForm } from "~/components/CreatePostForm/CreatePostForm";
import type { CreatePostInput } from "~/types/post";
import { PostsContext } from "~/lib/store/posts.context";

export const useCreatePost = routeAction$((data: CreatePostInput) => {
  try {
    return {
      success: true,
      data: {
        id: crypto.randomUUID(),
        ...data,
        createdAt: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
});

export default component$(() => {
  const nav = useNavigate();
  const createPost = useCreatePost();
  const store = useContext(PostsContext);

  return (
    <section class="mx-auto max-w-2xl">
      <h1 class="mb-8 text-4xl font-bold">Create a New Post</h1>
      <CreatePostForm
        onSubmit$={$((values: any) => {
          console.log(values, "values");
          createPost
            .submit(values)
            .then((result) => {
              if (result.value.success) {
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

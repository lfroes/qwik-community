import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { Post } from "~/types/post";
import { truncateText } from "~/lib/utils";

export interface PostCardProps {
  post: Post;
  searchTerm?: string;
}

export const PostCard = component$<PostCardProps>((props) => {
  const { post, searchTerm } = props;

  const highlightText = (text: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
  };

  return (
    <div class="rounded-lg border bg-card p-4 transition-shadow hover:shadow-lg">
      <Link href={`/posts/${post.id}`}>
        <h2
          class="mb-2 text-xl font-semibold dark:text-muted-foreground"
          dangerouslySetInnerHTML={highlightText(post.title)}
        />
        <p
          class="text-muted-foreground"
          dangerouslySetInnerHTML={truncateText(truncateText(post.body))}
        />
      </Link>
    </div>
  );
});

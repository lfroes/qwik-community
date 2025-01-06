import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Button } from "../ui/button";

export interface CreatePostButtonProps {
  text: string;
}

export const CreatePostButton = component$<CreatePostButtonProps>((props) => {
  const { text } = props;
  return (
    <Link href="/posts/new">
      <Button>{text}</Button>
    </Link>
  );
});

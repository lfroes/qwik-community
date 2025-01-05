import { component$, QwikIntrinsicElements } from "@builder.io/qwik";
import { cn } from "~/lib/utils";

// Maybe change this later on to use PropsOf from Qwik instead of QwikIntrinsicElements
export type InputProps = QwikIntrinsicElements["input"] & {
  class?: string;
};

export const Input = component$<InputProps>((props) => {
  const { class: className, ...rest } = props;

  return (
    <input
      class={cn(
        `
      flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm 
      ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
      placeholder:text-muted-foreground focus:outline-none 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
      disabled:cursor-not-allowed disabled:opacity-50
      `,
        className,
      )}
      {...rest}
    ></input>
  );
});

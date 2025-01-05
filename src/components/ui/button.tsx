import { component$, Slot, PropsOf } from "@builder.io/qwik";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const buttonVariants = cva(
  `inline-flex items-center jusitfy-center rounded-md text-sm
  font-medium transition-colors focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50
  disabled:pointer-events-none ring-offset-background`,
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-red-500 text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = VariantProps<typeof buttonVariants> &
  PropsOf<"button"> & {
    class?: string;
  };

export const Button = component$<ButtonProps>((props) => {
  const { variant, size, class: className, ...rest } = props;

  return (
    <button
      class={cn(buttonVariants({ variant, size, class: className }))}
      {...rest}
    >
      <Slot />
    </button>
  );
});

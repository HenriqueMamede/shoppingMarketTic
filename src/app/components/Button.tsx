import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "text-sm font-bold transition-colors ease-in-out ",
  variants: {
    variant: {
      primary:
        "w-full rounded bg-blue-500 px-4 py-2 hover:bg-blue-700 hover:text-white",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

const Button = ({ variant, className, children, ...props }: ButtonProps) => {
  const buttonClasses = twMerge(buttonVariants({ variant }), className);

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;

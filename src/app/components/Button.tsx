import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "w-full rounded px-4 py-2 text-sm font-bold text-white transition-colors ease-in-out",
  variants: {
    variant: {
      primary: "bg-blue-500 hover:bg-blue-700 hover:text-black",
      secundary: "bg-red-500 text-white hover:bg-red-700",
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

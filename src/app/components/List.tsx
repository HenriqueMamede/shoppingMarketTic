import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { VariantProps, tv } from "tailwind-variants";

const listVariants = tv({
  variants: {
    variant: {
      primary:
        "flex rounded-md px-1 py-4 text-sm capitalize text-gray-700 hover:bg-gray-200",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type ListProps = ComponentProps<"li"> & VariantProps<typeof listVariants>;

const List = ({ className, children, variant, ...props }: ListProps) => {
  const classList = twMerge(listVariants({ variant }), className);

  return (
    <li onClick={props.onClick} className={classList} {...props}>
      {children}
    </li>
  );
};

export default List;

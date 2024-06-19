import { ComponentProps } from "react";
import { tv } from "tailwind-variants";

const inputVariants = tv({
  base: "rounded border-2 border-gray-400 bg-white p-2 placeholder-gray-300 outline-none",
});

type InputProps = ComponentProps<"input">;

const Input = ({
  onChange,
  placeholder = "Search...",
  type = "text",
  ...props
}: InputProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <input
        className={inputVariants.base}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default Input;

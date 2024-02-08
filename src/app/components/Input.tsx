import { ComponentProps } from "react";
import { tv } from "tailwind-variants";

const inputVariants = tv({
  base: "rounded border-2 border-gray-400 bg-white p-2 placeholder-gray-300 outline-none",
});

type InputProps = ComponentProps<"input">;

const Input = ({ onChange }: InputProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <input
        className={inputVariants.base}
        type="text"
        placeholder="Search..."
        onChange={onChange}
      />
    </div>
  );
};

export default Input;

import { tv } from "tailwind-variants";

const inputVariants = tv({
  base: "rounded border-2 border-gray-400 bg-white p-2 placeholder-gray-300 outline-none",
});

const Input = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <input
        className={inputVariants.base}
        type="text"
        placeholder="Search..."
      />
    </div>
  );
};

export default Input;

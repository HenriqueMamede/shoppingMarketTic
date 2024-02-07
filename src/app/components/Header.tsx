import Input from "../components/Input";

const Header = () => {
  return (
    <header className="fixed right-0 top-0 flex w-full bg-white py-3">
      <div className="mx-auto flex w-11/12 items-center justify-between gap-52">
        <div className="flex">
          <a href="/">
            <img
              className="max-w-36"
              src="http://localhost:5173/assets/logo.png"
              alt="Company Logo"
            />
          </a>
        </div>
        <Input />
        <div className="flex items-center justify-between gap-12">
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
          <a href="/login" className="text-blue-500 hover:underline">
            Favoritos
          </a>
          <a href="/login" className="text-blue-500 hover:underline">
            Carrinho
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

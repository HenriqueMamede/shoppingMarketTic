import logo from "./assets/logo.png";

const Header = () => {
  return (
    <header className="fixed right-0 top-0 flex w-full bg-white py-6">
      <div className="mx-auto flex w-11/12 items-center justify-between gap-52">
        <div className="flex">
          <a href="/">
            <img className="max-w-36" src={logo} alt="Company Logo" />
          </a>
        </div>
        <div className="flex w-3/5 items-center">
          <input
            type="text"
            className="w-full rounded-full border border-gray-600 px-4 py-2 text-black focus:outline-none"
            placeholder="Search..."
          />
        </div>
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

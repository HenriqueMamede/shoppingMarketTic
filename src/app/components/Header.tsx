import { ChangeEvent, useRef, useState } from "react";
import { debounce } from "lodash";
import Input from "../components/Input";
import { useQuery } from "react-query";
import { ProductProps } from "../interfaces/Produtc";
import ProductService from "../../services/product.service";
import { useOnClickOutside } from "../hooks/useClickOutside";
import { CiShoppingCart } from "react-icons/ci";

const Header = () => {
  const [searchProduct, setSearchProduct] = useState("");
  const dropdownRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    isLoading: isLoadingProduct,
    data: product,
    // error,
  } = useQuery<ProductProps[], Error>(
    ["query-specific-product", searchProduct],
    async () => {
      return ProductService.findByName(searchProduct);
    },
    {
      enabled: searchProduct.length > 0,
      onSuccess: (res) => {
        setIsOpen(res?.length > 0);
      },
    },
  );

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchProduct(value);
  };

  const debouncedHandleOnChange = debounce(handleOnChange, 500);

  useOnClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

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
        {/*  */}

        <div className="relative w-4/5">
          <Input onChange={debouncedHandleOnChange} />
          <ul
            id="search-results"
            className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white px-2 shadow-lg"
            ref={dropdownRef}
          >
            {isOpen &&
              product?.map((product: ProductProps) => {
                return <li key={product.id}>{product.name}</li>;
              })}
            {isLoadingProduct && <li>Carregando...</li>}
          </ul>
        </div>
        <div className="flex items-center justify-between gap-12">
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
          <a href="/login">
            <CiShoppingCart className="h-12 w-20" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

import { ChangeEvent, useRef, useState } from "react";
import { useQuery } from "react-query";
import { debounce } from "lodash";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { ProductProps } from "../interfaces/Produtc";
import ProductService from "../../services/product.service";
import { useOnClickOutside } from "../hooks/useClickOutside";
import List from "./List";
import { useShoppingList } from "../../context/ShoppingCart";

const Header = () => {
  const [searchProduct, setSearchProduct] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const { totalQtd } = useShoppingList();

  const { isLoading: isLoadingProduct, data: product } = useQuery<
    ProductProps[],
    Error
  >(
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
          <Link to="/" relative="path">
            <img
              className="max-w-36"
              src="http://localhost:5173/assets/logo.png"
              alt="Company Logo"
            />
          </Link>
        </div>
        <div className="relative w-4/5">
          <Input onChange={debouncedHandleOnChange} />
          {isOpen && (
            <ul
              id="search-results"
              className="absolute z-50 mt-4 max-h-60 w-full overflow-auto rounded-md bg-white p-4 shadow-lg"
              ref={dropdownRef}
            >
              {product?.map((product: ProductProps) => {
                return (
                  <List
                    className="items-center justify-between"
                    key={product.id}
                  >
                    {product.name}
                    <div className="flex flex-col items-center gap-2">
                      <img
                        className="h-20 rounded-t-lg object-cover"
                        src={`http://localhost:5173/assets/products/${product.image}.jpg`}
                      />
                      <span>R$ {product.price}</span>
                    </div>
                  </List>
                );
              })}
            </ul>
          )}
          {isLoadingProduct && <List>Carregando...</List>}
        </div>
        <div className="flex items-center justify-between gap-12">
          {/* <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a> */}
          <Link className="flex" to="/shopping-cart" relative="path">
            <CiShoppingCart className="h-12 w-20" />
            {totalQtd > 0 && (
              <div className="relative right-8 flex size-6 justify-center rounded-3xl bg-blue-400">
                <span>{totalQtd}</span>
              </div>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

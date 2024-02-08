import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import Card from "../../components/Card";
import { ProductProps } from "../../interfaces/Produtc";
import ProductService from "../../../services/product.service";
import { useQuery } from "react-query";
import { useState } from "react";

const containerVariants = tv({
  variants: {
    variant: {
      fullCardList: "grid h-5/6 w-11/12 grid-cols-4 gap-4 overflow-x-auto",
      // "mb-36 mt-60 grid h-5/6 w-11/12 grid-cols-4 gap-4 overflow-x-auto",
    },
  },
});

const menuListVariants = tv({
  variants: {
    variant: {
      menuList: "absolute z-10 mt-1 w-48 rounded-md bg-white py-1 shadow-lg",
    },
  },
});

const Home = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isTypeFilter, setIsTypeFilter] = useState("");
  const [products, setProducts] = useState<ProductProps[]>();

  const { isLoading: isLoadingProducts, error } = useQuery<
    ProductProps[],
    Error
  >(
    ["query-products"],
    async () => {
      return ProductService.findAll();
    },
    {
      onSuccess: (res) => {
        setProducts(res);
      },
    },
  );

  const {
    isLoading: isLoadingProductsFilter,
    refetch: productsFilter,
    error: productsFilterError,
  } = useQuery<ProductProps[], Error>(
    "query-products-filter",
    async () => {
      return await ProductService.findSortPrice();
    },
    {
      enabled: false,
      retry: 1,
      onSuccess: (res) => {
        const data = res;
        isTypeFilter === "maior" ? data.reverse() : data;
        setProducts(data);
      },
    },
  );

  const containerClasses = twMerge(
    containerVariants({
      variant: isLoadingProducts || error ? undefined : "fullCardList",
    }),
  );

  const menuListClasses = twMerge(
    menuListVariants(),
    isOpenMenu
      ? "flex items-center flex-col absolute top-60 bg-white rounded-md p-4 shadow-lg shadow-black w-44 mr-44"
      : "hidden",
  );

  const handleClickMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleFilter = (type: string) => {
    void productsFilter();
    setIsTypeFilter(type);
  };

  return (
    <div className="mt-32 flex h-4/5 w-full flex-col items-center justify-center gap-16">
      <div className="flex w-full flex-col items-end">
        <button
          id="dropdownMenu"
          className="mr-44 inline-flex w-24 items-center rounded-md border bg-blue-500 px-3 py-2 text-center text-sm font-medium text-black"
          onClick={handleClickMenu}
        >
          Filtro
          <svg
            className="-mr-1 ml-4 size-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 11.414l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <ul id="dropdownMenuContent" className={menuListClasses}>
          <li
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
            onClick={() => handleFilter("maior")}
          >
            Maior preço
          </li>
          <li
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
            onClick={() => handleFilter("menor")}
          >
            Menor preço
          </li>
        </ul>
      </div>

      <div className={containerClasses}>
        {isLoadingProducts ||
          (isLoadingProductsFilter && (
            <div className="flex items-center">
              <svg
                className="-ml-1 mr-3 size-5 animate-spin text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              <span>Carregando...</span>
            </div>
          ))}
        {!isLoadingProducts &&
          !isLoadingProductsFilter &&
          products?.map((product) => {
            return (
              <div key={product.id}>
                <Card item={product} />
              </div>
            );
          })}
        {error && (
          <>
            <span>{error.message}</span>
          </>
        )}
        {productsFilterError && (
          <>
            <span>{productsFilterError.message}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

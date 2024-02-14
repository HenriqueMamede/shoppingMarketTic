import { useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import Card from "../../components/Card";
import { ProductProps } from "../../interfaces/Produtc";
import ProductService from "../../../services/product.service";
import Button from "../../components/Button";
import List from "../../components/List";

const containerVariants = tv({
  variants: {
    variant: {
      fullCardList: "grid h-5/6 w-11/12 grid-cols-4 gap-4 overflow-x-auto",
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
  const queryClient = useQueryClient();

  const {
    isLoading: isLoadingProducts,
    error,
    data: products,
  } = useQuery<ProductProps[], Error>("query-products", async () => {
    return ProductService.findAll();
  });

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
        queryClient.setQueryData("query-products", () => data);
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
      ? "flex items-center flex-col absolute top-60 bg-white rounded-md p-4 shadow-lg shadow-black w-44"
      : "hidden",
  );

  const handleClickMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleFilter = (type: string) => {
    void productsFilter();
    setIsTypeFilter(type);
  };

  const optionsFilter = [
    {
      name: "Maior preço",
      value: "maior",
      class: "flex justify-center w-full",
    },
    {
      name: "Menor preço",
      value: "menor",
      class: "flex justify-center w-full",
    },
  ];

  return (
    <div className="mt-32 flex h-4/5 w-full flex-col items-center justify-center gap-16">
      <div className="flex w-4/5 flex-col items-end">
        <Button className="w-24" onClick={handleClickMenu}>
          Filtro
        </Button>
        <ul className={menuListClasses}>
          {optionsFilter.map((item) => {
            return (
              <List
                key={item.name}
                className={item.class}
                onClick={() => handleFilter(item.value)}
              >
                {item.name}
              </List>
            );
          })}
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

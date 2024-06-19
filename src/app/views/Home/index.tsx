import { useQuery } from "react-query";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import Card from "../../components/Card";
import { ProductProps } from "../../interfaces/Produtc";
import ProductService from "../../../services/product.service";
import Button from "../../components/Button";
import List from "../../components/List";
import Loader from "../../components/Loader";
import { useOnClickOutside } from "../../hooks/useClickOutside";

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
  const filterListRef = useRef<HTMLUListElement>(null);

  const optionsFilter = [
    {
      name: "Maior preço",
      value: "desc",
      class: "flex justify-center w-full",
    },
    {
      name: "Menor preço",
      value: "asc",
      class: "flex justify-center w-full",
    },
  ];

  const {
    isLoading: isLoadingProducts,
    error,
    data: products,
  } = useQuery<ProductProps[], Error>(
    ["query-products", isTypeFilter],
    async () => {
      return ProductService.findAll(isTypeFilter);
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

  useOnClickOutside(filterListRef, () => {
    setIsOpenMenu(false);
  });

  const handleFilter = (type: string) => {
    setIsTypeFilter(type);
  };

  return (
    <div className="mt-32 flex h-4/5 w-full flex-col items-center justify-center gap-16">
      {isLoadingProducts && <Loader />}

      {!isLoadingProducts && (
        <div className="flex w-4/5 flex-col items-end">
          <Button className="w-24" onClick={handleClickMenu}>
            Filtro
          </Button>
          <ul className={menuListClasses} ref={filterListRef}>
            {optionsFilter.map((item) => {
              return (
                <List
                  key={item.name}
                  className={item.class}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFilter(item.value);
                  }}
                >
                  {item.name}
                </List>
              );
            })}
          </ul>
        </div>
      )}

      <div className={containerClasses}>
        {!isLoadingProducts &&
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
      </div>
    </div>
  );
};

export default Home;

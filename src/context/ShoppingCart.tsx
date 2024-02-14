import { createContext, useContext, useState } from "react";

interface ShoppingListProviderProps {
  children: React.ReactNode;
}

export interface ListItem {
  id: number;
  name: string;
  quantity: number;
  amount: number;
}

export interface ShoppingListContextData {
  items: ListItem[];
  addProduct: (id: number, name: string, price: number) => void;
  onRemove: (id: number) => void;
  onDecrease: (id: number) => void;
  isInList: (id: number) => boolean;
}

const ShoppingListContextDefaultValues = {
  items: [],
  addProduct: () => null,
  onRemove: () => null,
  onDecrease: () => null,
  isInList: () => false,
};

const ShoppingListContext = createContext<ShoppingListContextData>(
  ShoppingListContextDefaultValues,
);

export const ShoppingListProvider = ({
  children,
}: ShoppingListProviderProps) => {
  const [items, setItems] = useState<ListItem[]>([]);

  const addProduct = (id: number, name: string, price: number) => {
    const productAlreadyInCart = items.find((product) => product.id === id);

    if (!productAlreadyInCart) {
      const item: ListItem = {
        id: id,
        name: name,
        amount: price,
        quantity: 1,
      };
      return setItems([...items, item]);
    }

    if (productAlreadyInCart) {
      const updatedCart = items.map((cartItem) =>
        cartItem.id === id
          ? {
              ...cartItem,
              quantity: Number(cartItem.quantity) + 1,
              amount: cartItem.amount + price,
            }
          : cartItem,
      );

      return setItems(updatedCart);
    }
  };

  const onRemove = (id: number) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
  };

  const onDecrease = (id: number) => {
    const productAlreadyInCart = items.find((product) => product.id === id);
    if (productAlreadyInCart?.quantity === 0) {
      onRemove(id);
    }

    if (productAlreadyInCart) {
      const updatedCart = items.map((cartItem) =>
        cartItem.id === id
          ? {
              ...cartItem,
              quantity: Number(cartItem.quantity) - 1,
            }
          : cartItem,
      );

      setItems(updatedCart);
    }
  };

  const isInList = (id: number) => {
    return items.some((item) => item.id === id);
  };

  return (
    <ShoppingListContext.Provider
      value={{ items, addProduct, onDecrease, onRemove, isInList }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => useContext(ShoppingListContext);

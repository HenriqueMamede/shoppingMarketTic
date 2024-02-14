import { useShoppingList } from "../../../context/ShoppingCart";

const ShoppingCart = () => {
  const { items } = useShoppingList();

  return (
    <div className="flex w-11/12 justify-center">
      <div className="flex w-3/6 flex-col gap-8">
        {items.map((item) => {
          return (
            <div key={item.id} className="flex rounded-3xl bg-white p-8">
              <div className="flex flex-col gap-4">
                <span>Nome do Produto: {item.name}</span>
                <span>Quantidade: {item.quantity}</span>
                <span>Valor Total: R$ {item.amount}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShoppingCart;

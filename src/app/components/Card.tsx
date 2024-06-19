import { useShoppingList } from "../../context/ShoppingCart";
import { Product } from "../interfaces/Produtc";
import Button from "./Button";

const Card = ({ item }: Product) => {
  const { addProduct } = useShoppingList();

  return (
    <div key={item.id} className="w-60 rounded-2xl bg-white p-4">
      <div className="flex justify-center">
        <img
          src={`http://localhost:5174/assets/products/${item.image}.jpg`}
          alt={item.name}
          className="h-40 rounded-t-lg object-cover"
        />
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center justify-center">
          <h3 className="text-center capitalize">{item.name}</h3>
        </div>

        <div className="flex items-center justify-center">
          <span>R$ {item.price}</span>
        </div>
        <Button onClick={() => addProduct(item.id, item.name, item.price)}>
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
  );
};

export default Card;

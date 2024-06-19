import { isNull } from "lodash";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShoppingList } from "../../../context/ShoppingCart";
import authService from "../../../services/auth.service";
import Button from "../../components/Button";

const ShoppingCart = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isNull(authService.getLoggedUser())) {
      navigate("/login");
    }
  });

  const { items, totalAmountSum, onDecrease, onRemove, addProduct } =
    useShoppingList();

  return (
    <div className="flex h-full flex-col gap-12">
      <div className="mt-32 flex h-4/5 w-11/12 justify-center overflow-x-auto">
        <div className="flex w-3/6 flex-col gap-8">
          {items.map((item) => {
            return (
              <div
                key={item.id}
                className="flex justify-between rounded-3xl bg-white p-8"
              >
                <div className="flex flex-col gap-4">
                  <p>
                    Nome do Produto:
                    <span className="text-center capitalize">{item.name}</span>
                  </p>
                  <span>Quantidade: {item.quantity}</span>
                  <span>Valor Total: R$ {item.amount.toFixed(2)}</span>
                </div>
                <div className="flex flex-col gap-5">
                  <Button
                    onClick={() =>
                      addProduct(item.id, item.name, item.unitPrice)
                    }
                  >
                    +
                  </Button>
                  <Button onClick={() => onDecrease(item.id, item.unitPrice)}>
                    -
                  </Button>
                  <Button onClick={() => onRemove(item.id)} variant="secundary">
                    Remover
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <span className="ml-16 ">
          <b>Total:</b> R$ {totalAmountSum.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default ShoppingCart;

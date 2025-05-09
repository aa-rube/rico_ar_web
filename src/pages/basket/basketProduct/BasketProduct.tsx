import axios from "axios";
import { useState } from "react";
import "../basketStyles.scss";

export default function BasketProduct({
  product,
  setCart,
  chatId,
}: {
  product: {
    item_id: number;
    name: string;
    price: number | string;
    quantity: number;
    image: string;
  };
  setCart: (cart: any) => void;
  chatId: number;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const url = "https://vkusbot.ru/vkusnaya_argentina/shop/";

  const handleClickIncrement = (e: any) => {
    e.stopPropagation();
    addToCart();
  };

  const handleClickDecrement = (e: any) => {
    e.stopPropagation();
    if (product.quantity > 0) {
      removeFromCart();
    }
  };

  const addToCart = () => {
    // setIsLoading(true);
    // request(MethodType.PUT, 'cart', {
    //     "chat_id": chatId,
    //     "item_id": product.item_id
    // }, result => {
    //     setCart(result)
    //     setIsLoading(false);
    // });
    setIsLoading(true);
    axios
      .put(`${url}cart`, {
        chat_id: chatId,
        item_id: product.item_id,
      })
      .then((result) => {
        setCart(result.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const removeFromCart = () => {
    // setIsLoading(true);
    // request(MethodType.DELETE, `cart/${chatId}/items/${product.item_id}`, {}, result => {
    //     setCart(result)
    //     setIsLoading(false);
    // });

    setIsLoading(true);
    axios
      .delete(`${url}cart/${chatId}/items/${product.item_id}`)
      .then((result) => {
        setCart(result.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const removeProductFromCart = () => {
    // setIsLoading(true);
    // request(MethodType.DELETE, `cart/${chatId}/items/${product.item_id}/group`, {}, result => {
    //     setCart(result)
    //     setIsLoading(false);
    // });

    setIsLoading(true);
    axios
      .delete(`${url}cart/${chatId}/items/${product.item_id}/group`)
      .then((result) => {
        setCart(result.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="basket-product__container">
      <div className="image_container">
        <img src={product.image} width={32} height={32} />
      </div>
      <div className="body">
        <h3>{product.name}</h3>
        <p>{product.price}</p>
        <div
          className={`btn__container ${isLoading && "btn_container_isLoading"}`}
        >
          {isLoading ? (
            <div className="loader"></div>
          ) : (
            <>
              <button
                onClick={handleClickDecrement}
                disabled={product.quantity === 1}
                className={`decrement_button ${
                  product.quantity === 1 && "disabled"
                }`}
              >
                -
              </button>
              <p>{product.quantity}</p>
              <button
                onClick={handleClickIncrement}
                className="increment_button"
              >
                +
              </button>
            </>
          )}
        </div>
      </div>
      <div className="close-icon__container">
        <button onClick={removeProductFromCart}>
          <img src={require("../../../images/icon-back-100.png").default} />
        </button>
      </div>
    </div>
  );
}

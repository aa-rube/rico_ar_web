import { useLayoutEffect, useState } from "react";
import "./productStyles.scss";
import { MethodType, request } from "../../data/data";
import axios from "axios";

export default function EveryProduct({
  product,
  onClick,
  cart,
  setCart,
  chatId,
}: any) {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const url = "localhost:7887/vkusnaya_argentina/shop/";

  const getCartData = () => {
    setCount(
      cart?.cartItems?.find((item: any) => item?.item_id === product?.id)
        ?.quantity ?? 0
    );
    // request(MethodType.POST, 'cart', {
    //   chat_id: chatId
    // }, result => setCount(result.cartItems.find((item: any) => item.item_id === product.id)?.quantity ?? 0))
  };

  const addToCart = () => {
    // request(MethodType.PUT, 'cart', {
    //   "chat_id": chatId,
    //   "item_id": product.id
    // }, result => {
    //   setIsLoading(true);
    //   setCount(result?.cartItems.find((item: any) => item.item_id === product.id)?.quantity ?? 0)
    //   setCart(result)
    //   setIsLoading(false);
    // });

    setIsLoading(true);
    axios
      .put(`${url}cart`, {
        chat_id: chatId,
        item_id: product.id,
      })
      .then((result) => {
        setCount(
          result?.data?.cartItems?.find(
            (item: any) => item?.item_id === product?.id
          )?.quantity ?? 0
        );
        setCart(result.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const removeFromCart = () => {
    // setIsLoading(true);
    // request(MethodType.DELETE, `cart/${chatId}/items/${product.id}`, {}, result => {
    //   setCount(result?.cartItems.find((item: any) => item.item_id === product.id)?.quantity ?? 0)
    //   setCart(result)
    //   setCount((prev: number) => prev - 1);
    //   setIsLoading(false);
    // });

    setIsLoading(true);
    axios
      .delete(`${url}cart/${chatId}/items/${product.id}`)
      .then((result) => {
        setCount(
          result?.data?.cartItems?.find(
            (item: any) => item?.item_id === product?.id
          )?.quantity ?? 0
        );
        setCart(result.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClickIncrement = (e: any) => {
    e.stopPropagation();
    addToCart();
  };

  const handleClickDecrement = (e: any) => {
    e.stopPropagation();
    removeFromCart();
  };

  const handleClickAddToCart = (e: any) => {
    e.stopPropagation();
    addToCart();
  };

  useLayoutEffect(() => {
    getCartData();
  }, [cart]);

  return (
    <div className="items" onClick={() => onClick(product)}>
      <img src={product?.images[0]} width={"100%"} alt="logo" />
      <div className="body">
        <p className="title">{product.name}</p>
        {/*<p>{item.description}</p>*/}
        <p className="price">{product.price}</p>
        <span className="category">{product.category?.id}</span>
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`button__container ${isLoading && "loading_buttons"}`}
      >
        {isLoading ? (
          <div className="loader"></div>
        ) : count <= 0 ? (
          <button className="add-to-busket" onClick={handleClickAddToCart}>
            В корзину
          </button>
        ) : (
          <div className="count_container">
            <button onClick={handleClickDecrement}>-</button>
            <span>{count}</span>
            <button onClick={handleClickIncrement}>+</button>
          </div>
        )}
      </div>
    </div>
  );
}

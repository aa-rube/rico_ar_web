import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isTimeInRange, MethodType, request } from "../../data/data";
import BasketProduct from "./basketProduct/BasketProduct";

export default function Basket({ userData }: any) {
  const chatId = userData?.id;
  const navigate = useNavigate();

  const [cart, setCart] = useState<any>();

  const goToHome = () => {
    //... write code here to continue
    navigate("/home");
  };

  const continueBuying = () => {
    //... write code here to continue
    navigate("/placeOrder");
  };

  const getCartData = () => {
    request(
      MethodType.POST,
      "cart",
      {
        chat_id: chatId,
      },
      (result) => setCart(result)
    );
  };

  useLayoutEffect(() => {
    getCartData();
  }, []);

  return (
    <div className="busket__container">
      <div className="busket__first_child">
        <div className="header">
          <h2>Корзина</h2>
          <button onClick={goToHome}>Продолжить покупки</button>
        </div>
        <div className="busket-items_container">
          {cart?.cartItems.map((e: any) => {
            return (
              <BasketProduct chatId={chatId} product={e} setCart={setCart} />
            );
          })}
        </div>
        <div className="separator"></div>
        <p className="count">В корзине {cart?.total_quantity} товаров</p>
        <h3 className="price">Итого: {cart?.total_price}</h3>
        {isTimeInRange("09:00", "23:00") ? (
          <button onClick={continueBuying} className="to-order__button">
            <span>К оформлению</span>
            <img
              src={require("../../images/right-arrow.svg").default}
              width={15}
              alt=""
            />
          </button>
        ) : (
          <p className="description">
            Заказы принимаются с 09:00 до 23:00
            вечера. Спасибо!
          </p>
        )}
      </div>
      {/* <div className="footer"> */}
      <p className="contact-info">
        <p className="number_title">Контактный телефон</p>
        <p className="number">+5491188888888</p>
      </p>
    </div>
  );
}

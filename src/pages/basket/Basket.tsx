import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isTimeInRange, MethodType, request } from "../../data/data";
import BasketProduct from "./basketProduct/BasketProduct";

export default function Basket({ userData }: any) {
  const chatId = userData?.id;
  const navigate = useNavigate();

  const [cart, setCart] = useState<any>();

  const goToHome = () => {
    navigate("/home");
  };

  const handleSubmitOrder = () => {
    // Отправляем запрос для оформления заказа
    request(MethodType.POST, "order", { chatId: chatId }, (result) => {
      if (result.success) {
        // Если заказ успешно оформлен, закрываем WebApp
        if (window.Telegram?.WebApp) {
          window.Telegram.WebApp.close();
        } else {
          console.error("Telegram WebApp API недоступно");
        }
      } else {
        console.error("Ошибка при оформлении заказа", result);
      }
    });
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
          <button onClick={handleSubmitOrder} className="to-order__button">
            <span>К оформлению</span>
            <img
              src={require("../../images/right-arrow.svg").default}
              width={15}
              alt=""
            />
          </button>
        ) : (
          <p className="description">
            Заказы принимаются с 09:00 до 23:00 вечера. Спасибо!
          </p>
        )}
      </div>
      <p className="contact-info">
        <p className="number_title">Контактный телефон</p>
        <p className="number">+5491188888888</p>
      </p>
    </div>
  );
}

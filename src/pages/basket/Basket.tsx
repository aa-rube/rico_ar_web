import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isTimeInRange, MethodType, request, currency } from "../../data/data";
import BasketProduct from "./basketProduct/BasketProduct";

export default function Basket({ userData }: { userData: any }) {
  /* --- ⚡ fallback для chatId --- */
  const chatId =
      userData?.id ??
      window.Telegram?.WebApp?.initDataUnsafe?.user?.id ??
      null;

  const navigate = useNavigate();
  const [cart, setCart] = useState<any>();
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'CRYPTO'>('CASH');

  const goToHome = () => navigate("/home");
  const continueBuying = () => navigate("/placeOrder");

  const handleSubmitOrder = () => {
    request(MethodType.POST, "order", {
      chatId,
      paymentMethod // Добавляем выбранный метод оплаты в запрос
    }, (result) => {
      if (result.success) {
        window.Telegram?.WebApp?.close?.();
      } else {
        console.error("Ошибка при оформлении заказа:", result.error);
      }
    });
  };

  const getCartData = () => {
    request(
        MethodType.POST,
        "cart",
        { chat_id: chatId },
        (result) => setCart(result)
    );
  };

  useLayoutEffect(() => {
    if (chatId) getCartData();
  }, [chatId]);

  return (
      <div className="busket__container">
        <div className="busket__first_child">
          <div className="header">
            <h2>TOTAL </h2>
            <button onClick={goToHome}>BACK</button>
          </div>

          <div className="busket-items_container">
            {cart?.cartItems.map((e: any) => (
                <BasketProduct
                    key={e.item_id}
                    chatId={chatId}
                    product={e}
                    setCart={setCart}
                />
            ))}
          </div>

          <div className="separator"></div>
          <p className="count">Total Staff: {cart?.total_quantity}</p>
          <h3 className="price">
            Total Amount: {currency} {cart?.total_price}
          </h3>

          {/* Добавленные кнопки выбора метода оплаты */}
          <div className="payment-methods" style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '10px 0',
            gap: '10px'
          }}>
            <button
                onClick={() => setPaymentMethod('CASH')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: paymentMethod === 'CASH' ? '#1f2b2e' : '#1F242C',
                  color: paymentMethod === 'CASH' ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
            >
              CASH
            </button>
            <button
                onClick={() => setPaymentMethod('CRYPTO')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: paymentMethod === 'CRYPTO' ? '#1f2b2e' : '#1F242C',
                  color: paymentMethod === 'CRYPTO' ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
            >
              CRYPTO
            </button>
          </div>

          {isTimeInRange("00:00", "23:59") ? (
              <button onClick={handleSubmitOrder} className="to-order__button">
                <span>BUY</span>
              </button>
          ) : (
              <p className="description">
                Заказы принимаются с 10:00 до 18:00 вечера. Спасибо!
              </p>
          )}
        </div>

        <p className="contact-info">
          <p className="number_title">contact tg: </p>
          <p className="number">@weed_gid</p>
        </p>
      </div>
  );
}
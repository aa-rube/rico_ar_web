// import { useNavigate } from "react-router-dom";
// import BusketButton from "../../components/BusketButton/BusketButton";
// import "./placeOrderStyles.scss";
// import { MethodType, request } from "../../data/data";
//
// export default function PlaceOrder({ userData }: { userData: { id: number } }) {
//   const navigate = useNavigate();
//   const chatId = userData?.id;
//
//   const goBack = () => navigate("/busket");
//
//   const handleSubmitOrder = () => {
//     request(MethodType.POST, "order", { chatId: chatId }, (result) => {
//       //
//     });
//   };
//
//   return (
//     <>
//       <div className="place-order__container">
//         <div className="header">
//           <h2>Оформить заказ</h2>
//           <button onClick={goBack}>Назад в корзину</button>
//         </div>
//         <div className="body">
//           <div>
//             <div className="radio__container">
//               <label htmlFor="option1">
//                 <h3>Оплата</h3>
//                 <input
//                   type="radio"
//                   id="option1"
//                   value="option1"
//                   checked={true}
//                 />
//                 <span>Наличными при получении</span>
//               </label>
//               <p>
//                 Рассчитаться можно с курьером наличными при получении товара
//               </p>
//             </div>
//             <div className="radio__container">
//               <label htmlFor="option2">
//                 <h3>Доставка</h3>
//                 <input
//                   type="radio"
//                   id="option2"
//                   value="option2"
//                   checked={true}
//                 />
//                 <span>Самовывоз</span>
//               </label>
//               <p>Товар вы можете получить по прибытию в наш офис</p>
//             </div>
//           </div>
//           <div className="telephone-address__container">
//             <label htmlFor="">
//               <p>
//                 Номер телефона<span style={{ color: "red" }}>*</span>:
//               </p>
//               <input type="text" required />
//             </label>
//             <label htmlFor="">
//               <p>
//                 Адрес доставки<span style={{ color: "red" }}>*</span>:
//               </p>
//               <textarea></textarea>
//             </label>
//           </div>
//         </div>
//         <div className="separator"></div>
//         <div className="footer">
//           <div className="result__container">
//             <div className="title_container">
//               <p className="title">Итого с доставкой:</p>
//               <div className="spinner"></div>
//             </div>
//             <div className="delivery_container">
//               <p className="delivery__label">Доставка:</p>
//               <div className="spinner"></div>
//             </div>
//           </div>
//           <div className="contact-info__container">
//             <p className="telephone-title">Контактный телефон</p>
//             <p className="telephone-number">+201118287099</p>
//           </div>
//         </div>
//       </div>
//       <BusketButton title={"ОФОРМИТЬ ЗАКАЗ"} onClick={handleSubmitOrder} />
//     </>
//   );
// }

import { useNavigate } from "react-router-dom";
import BusketButton from "../../components/BusketButton/BusketButton";
import "./placeOrderStyles.scss";
import { MethodType, request } from "../../data/data";

export default function PlaceOrder({ userData }: { userData: { id: number } }) {
  const navigate = useNavigate();

  /* --- ⚡ fallback --- */
  const chatId =
    userData?.id ??
    window.Telegram?.WebApp?.initDataUnsafe?.user?.id ??
    null;

  const goBack = () => navigate("/busket");

  const handleSubmitOrder = () => {
    request(MethodType.POST, "order", { chatId }, () => {});
  };

  return (
    <>
      <div className="place-order__container">
        <div className="header">
          <h2>Оформить заказ</h2>
          <button onClick={goBack}>Назад в корзину</button>
        </div>
        <div className="body">
          <div>
            <div className="radio__container">
              <label htmlFor="option1">
                <h3>Оплата</h3>
                <input
                  type="radio"
                  id="option1"
                  value="option1"
                  checked={true}
                />
                <span>Наличными при получении</span>
              </label>
              <p>
                Рассчитаться можно с курьером наличными при получении товара
              </p>
            </div>
            <div className="radio__container">
              <label htmlFor="option2">
                <h3>Доставка</h3>
                <input
                  type="radio"
                  id="option2"
                  value="option2"
                  checked={true}
                />
                <span>Самовывоз</span>
              </label>
              <p>Товар вы можете получить по прибытию в наш офис</p>
            </div>
          </div>
          <div className="telephone-address__container">
            <label htmlFor="">
              <p>
                Номер телефона<span style={{ color: "red" }}>*</span>:
              </p>
              <input type="text" required />
            </label>
            <label htmlFor="">
              <p>
                Адрес доставки<span style={{ color: "red" }}>*</span>:
              </p>
              <textarea></textarea>
            </label>
          </div>
        </div>
        <div className="separator"></div>
        <div className="footer">
          <div className="result__container">
            <div className="title_container">
              <p className="title">Итого с доставкой:</p>
              <div className="spinner"></div>
            </div>
            <div className="delivery_container">
              <p className="delivery__label">Доставка:</p>
              <div className="spinner"></div>
            </div>
          </div>
          <div className="contact-info__container">
            <p className="telephone-title">Контактный телефон</p>
            <p className="telephone-number">+201118287099</p>
          </div>
        </div>
      </div>
      <BusketButton title={"ОФОРМИТЬ ЗАКАЗ"} onClick={handleSubmitOrder} />
    </>
  );
}

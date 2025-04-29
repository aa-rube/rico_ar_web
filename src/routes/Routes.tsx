// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from "react-router-dom";
// import { useMemo } from "react";
//
// import PlaceOrder from "../pages/PlaceOrder/PlaceOrder";
// import Basket from "../pages/basket/Basket";
// import Home from "../pages/home/Home";
// import Reditect from "./Reditect";
//
// export function Routes({ userData }: { userData: any }) {
//   /* --- ⚡ гарантируем id из initDataUnsafe --- */
//   const mergedUserData = useMemo(() => {
//     const tgId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id ?? null;
//     return { id: userData?.id ?? tgId };
//   }, [userData]);
//
//   const routes = createBrowserRouter(
//     createRoutesFromElements(
//       <Route>
//         <Route
//           path="/"
//           element={
//             <Reditect to="/home" children={<Home userData={mergedUserData} />} />
//           }
//         />
//         <Route path="/home" element={<Home userData={mergedUserData} />} />
//         <Route path="/busket" element={<Basket userData={mergedUserData} />} />
//         <Route
//           path="/placeOrder"
//           element={<PlaceOrder userData={mergedUserData} />}
//         />
//       </Route>
//     )
//   );
//
//   return <RouterProvider router={routes} />;
// }


import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useMemo } from "react";

import PlaceOrder from "../pages/PlaceOrder/PlaceOrder";
import Basket from "../pages/basket/Basket";
import Home from "../pages/home/Home";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Reditect from "./Reditect";

export function Routes({ userData }: { userData: any }) {
  // Логируем для отладки, как в старой версии
  console.log(userData, "<<<");

  /* ⚡ Сливаем переданный userData.id с initDataUnsafe */
  const mergedUserData = useMemo(() => {
    const tgId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id ?? null;
    return { id: userData?.id ?? tgId };
  }, [userData]);

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path="/"
          element={
            <Reditect
              to="/home"
              children={<Home userData={mergedUserData} />}
            />
          }
        />

        <Route path="/home" element={<Home userData={mergedUserData} />} />

        {/* Восстановленный маршрут из старой версии */}
        {/* <Route path="/product-details">
          <Route path=":productId" Component={ProductDetails} />
        </Route> */}

        <Route
          path="/busket"
          element={<Basket userData={mergedUserData} />}
        />

        <Route
          path="/placeOrder"
          element={<PlaceOrder userData={mergedUserData} />}
        />
      </Route>
    )
  );

  return <RouterProvider router={routes} />;
}

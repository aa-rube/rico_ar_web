import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import PlaceOrder from "../pages/PlaceOrder/PlaceOrder";
import Basket from "../pages/basket/Basket";
import Home from "../pages/home/Home";
import Reditect from "./Reditect";

export function Routes({ userData }: { userData: any }) {
  console.log(userData, "<<<");

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path="/"
          element={
            <Reditect to="/home" children={<Home userData={userData} />} />
          }
        />
        <Route path="/home" element={<Home userData={userData} />} />
        {/* <Route path="/product-details">
          <Route path=":productId" Component={ProductDetails} />
        </Route> */}
        <Route path="/busket" element={<Basket userData={userData} />} />
        <Route
          path="/placeOrder"
          element={<PlaceOrder userData={userData} />}
        />
      </Route>
    )
  );

  return <RouterProvider router={routes} />;
}

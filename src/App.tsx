import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import DetailPizza from "./pages/DetailPizza";
import MainLayout from "./layouts/MainLayout";


function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route path="" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<DetailPizza/>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

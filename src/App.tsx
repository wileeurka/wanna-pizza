import React from "react";
import "./App.css";
import "./scss/app.scss";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";
import AddPizzaForm from "./pages/AddPizzaForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="add-pizza" element={<AddPizzaForm />} />
      </Route>
    </Routes>
  );
}

export default App;

//npm install react-content-loader
//npm install react-router-dom@6
//npm install react-paginate --save
//npm install @reduxjs/toolkit react-redux
//npm install axios
//npm install lodash.debounce
//npm install qs
//npm install --save typescript @types/node @types/react @types/react-dom @types/jest
//npm i --save-dev @types/lodash.debounce
//npm install mobx mobx-react-lite --legacy-peer-deps
// npm install react-highlight-words --legacy-peer-deps
// npm install --save-dev @types/react-highlight-words --legacy-peer-deps

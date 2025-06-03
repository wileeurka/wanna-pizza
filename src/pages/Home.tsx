import React from "react";
import {  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/storeTypes";
import Categories from "../app/Categories";
import Sort from "../app/Sort";
import Pagination from "../Pagination/Pagination";
import PizzaBlock from "../app/PizzaBlock/PizzaBlock";
import Skeleton from "../app/PizzaBlock/Skeleton.jsx";
import {
  setCategoryId,
  setCurrentPage,
  filtertSelector,
} from "../redux/slices/filterSlice";
import { fetchPizzas, pizzaDataSelector } from "../redux/slices/pizzaSlice";

const Home: React.FC = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const { categoryId, currentPage, sort, searchValue } =
    useSelector(filtertSelector);
  const { items, status } = useSelector(pizzaDataSelector);

  // // Проверяем роль пользователя
  // const { isAdmin } = useSelector((state: any) => state.auth); // Подключаем состояние isAdmin

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const order = sort.sortProperty.includes("-") ? "desc" : "asc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId !== 0 ? `&category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    try {
      dispatch(
        fetchPizzas({
          order,
          sortBy,
          category,
          search,
          currentPage: String(currentPage),
        })
      );
    } catch (error) {
      console.error("Error fetching pizzas:", error);
    }
  };

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = Array.isArray(items)
    ? items.map((obj: any) => (
        <PizzaBlock {...obj} key={obj.id} searchValue={searchValue} />
      ))
    : null;

  const skeleton = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} setCategoryId={onClickCategory} />
        <Sort />
      </div>
      <div className="content__header">
        <h2 className="content__title">All pizzas</h2>
      </div>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>We don't have this pizza</h2>
          <p>Don't get upset! Try to find another one.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeleton : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

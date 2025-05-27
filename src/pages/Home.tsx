import React from "react";
import { useSelector } from "react-redux";


import { Filter, selectFilter, setCategoryId, setSortType } from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzas } from "../redux/slices/pizzasSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import SkeletonHome from "../components/PizzaBlock/SkeletonHome";
import Pagination from "../components/Pagination";
import { useAppDispatch } from "../redux/store";


const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categoryId, sortType, searchValue } = useSelector(selectFilter);
  const {items, status} = useSelector(selectPizzas);

  const skeletons = [...new Array(6)].map((_, index) => <SkeletonHome key={index} />);
  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  const [currentPage, setCurrentPage] = React.useState(1);

  const fetchFunc =  async () => {
    const categoryUrlId = categoryId > 0 ? `category=${categoryId}` : "";
    const sortUrl = `sortBy=${sortType.techName}`;
    const orderUrl = sortUrl.includes("-") ? `order=desc` : `order=asc`;
    const searchUrl = searchValue ? `search=${searchValue}` : "";

    dispatch(fetchPizzas({
        categoryUrlId,
        sortUrl,
        orderUrl,
        searchUrl,
        currentPage,
      }))
  }

  React.useEffect(() => {
    fetchFunc()
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id: number) => dispatch(setCategoryId(id))} />
        <Sort onChangeSort={(id: Filter) => dispatch(setSortType(id))} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        status === 'error' && <div className="content__items--error">
          <h2>Ошибка получения пицц 😕</h2>
          <div className="content__items-text">Мы уже исправляем ошибку</div>
        </div>
      }
      <div className="content__items">
        {status === 'loading'
          ? skeletons
          : pizzas}
      </div>
      <Pagination setCurrentPage={(num: number) => setCurrentPage(num)} />
    </>
  );
}

export default Home;

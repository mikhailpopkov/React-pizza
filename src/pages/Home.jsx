import React from "react";
import { useSelector, useDispatch } from "react-redux";


import { setCategoryId, setSortType } from "../redux/slices/filterSlice";
import { setItems, fetchPizzas } from "../redux/slices/pizzasSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import SkeletonHome from "../components/PizzaBlock/SkeletonHome";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";


function Home() {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sortType);
  const {items, status} = useSelector((state) => state.pizzas);

  const { searchValue } = React.useContext(SearchContext);
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
        <Categories value={categoryId} onClickCategory={(id) => dispatch(setCategoryId(id))} />
        <Sort onChangeSort={(id) => dispatch(setSortType(id))} />
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
          ? [...new Array(6)].map((_, index) => <SkeletonHome key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination setCurrentPage={(num) => setCurrentPage(num)} />
    </>
  );
}

export default Home;

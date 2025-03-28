import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCategoryId, setSortType } from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import SkeletonHome from "../components/PizzaBlock/SkeletonHome";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import axios from "axios";


function Home() {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId)
  const sortType = useSelector((state) => state.filter.sortType)

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setLoading(true);

    const categoryUrlId = categoryId > 0 ? `category=${categoryId}` : "";
    const sortUrl = `sortBy=${sortType.techName}`;
    const orderUrl = sortUrl.includes("-") ? `order=desc` : `order=asc`;
    const searchUrl = searchValue ? `search=${searchValue}` : "";

    axios
      .get(
        `https://672b0125976a834dd0253071.mockapi.io/items?page=${currentPage}&limit=4&${categoryUrlId}&${sortUrl.replace(
          "-",
          ""
        )}&${orderUrl}&${searchUrl}`
      )
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      });
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => dispatch(setCategoryId(id))} />
        <Sort onChangeSort={(id) => dispatch(setSortType(id))} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading
          ? [...new Array(6)].map((_, index) => <SkeletonHome key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination setCurrentPage={(num) => setCurrentPage(num)} />
    </>
  );
}

export default Home;

import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import SkeletonHome from "../components/PizzaBlock/SkeletonHome";
import Pagination from "../components/Pagination";

function Home() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности (сначала популярные)',
    techName: 'rating',
  });
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setLoading(true);

    const categoryUrlId = categoryId > 0 ? `category=${categoryId}` : '';
    const sortUrl = `sortBy=${sortType.techName}`;
    const orderUrl = sortUrl.includes('-') ? `order=desc` : `order=asc`;

    fetch(`https://672b0125976a834dd0253071.mockapi.io/items?page=${currentPage}&limit=4${categoryUrlId}&${sortUrl.replace('-', '')}&${orderUrl}`).then((array) =>
      array.json().then((array) => {
        setItems(array);
        setLoading(false);
      })
    );
  }, [categoryId, sortType, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading
          ? [...new Array(6)].map((_, index) => <SkeletonHome key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination setCurrentPage={setCurrentPage} />
    </>
  );
}

export default Home;

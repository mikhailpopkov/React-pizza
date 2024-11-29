import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import SkeletonHome from "../components/PizzaBlock/SkeletonHome";

function Home() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState(0);

  React.useEffect(() => {
    setLoading(true);
    fetch(`https://672b0125976a834dd0253071.mockapi.io/items?category=${categoryId > 0 ? categoryId : ''}`).then((array) =>
      array.json().then((array) => {
        setItems(array);
        setLoading(false);
      })
    );
  }, [categoryId]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading
          ? [...new Array(6)].map((_, index) => <SkeletonHome key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </>
  );
}

export default Home;

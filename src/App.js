import React from "react";
import "./scss/app.scss";
import Header from "./components/Headeer";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";

function App() {

  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch('https://672b0125976a834dd0253071.mockapi.io/items').then(
      (array) => array.json().then((array) => setItems(array))
    )
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((object) => (
              <PizzaBlock key={object.id} {...object} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import "./scss/app.scss";
import Header from "./components/Headeer";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import pizzas from "./assets/pizzas.json";

function App() {
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
            {pizzas.map((object) => (
              <PizzaBlock key={object.id} {...object} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

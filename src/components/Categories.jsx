import React from "react";

function Categories() {
  const [activeCategory, setActiveCategory] = React.useState(0);
  const categoriesItem = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categoriesItem.map((item, index) => (
          <li
            onClick={() => setActiveCategory(index)}
            className={activeCategory === index ? "active" : " "}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Categories;

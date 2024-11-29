import React from "react";

function Categories({value, onClickCategory}) {
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
          <li key={index}
            onClick={() => onClickCategory(index)}
            className={value === index ? "active" : " "}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Categories;

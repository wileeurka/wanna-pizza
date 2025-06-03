import React from "react";

type CategoriesProps = {
  categoryId: number;
  setCategoryId: (i: number) => void;
};

const categories = ["All", "New", "Meat", "Vegetarian", "Grill", "Sweet"];

const Categories: React.FC<CategoriesProps> = (props) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => props.setCategoryId(i)}
            className={props.categoryId === i ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;

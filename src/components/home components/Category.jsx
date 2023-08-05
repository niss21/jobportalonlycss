import React from "react";
import "./Category.css";

function Category({ cat, category, setCategory }) {
  category = cat.name;
  return (
    <div className="category" onClick={() => setCategory(category)}>
      <div className="category-icon">{cat?.icon}</div>
      <h5>{cat.name}</h5>
    </div>
  );
}

export default Category;

import { useState } from "react";
import "./CategoriesComponent.css";
import CategoryItem from "./CategoryItem/CategoryItem";

const CategoriesComponent = ({ categories, onCategorySelect  }: any) => {
  const [selectedCategory, setSelectedCategory] = useState<any>();

  const handleSelectCategory = (category: any) => {

    onCategorySelect(category?.id);
    setSelectedCategory(category);
  };

  return (
    <div className="categories-container">
      {categories?.map((item: any) => (
        <CategoryItem
          key={item?.id}
          category={item}
          onClick={handleSelectCategory}
          isActive={item?.id === selectedCategory?.id}
        />
      ))}
    </div>
  );
};

export default CategoriesComponent;

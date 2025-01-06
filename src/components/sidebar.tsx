import React from "react";

interface categoriesData {
  id: number;
  name: string;
  icon: JSX.Element;
}

interface SidebarProps {
  categories: categoriesData[];
  onCategorySelect: (categoryName: string) => void;
}
export default function Sidebar({ categories, onCategorySelect }: SidebarProps) {
  return (
    <div className="max-w-[250px] lg:w-[300px] mx-3 top-0 z-10 bg-neutral-200 h-max py-10 px-2 rounded-b-lg">
      <div className="flex flex-col items-center gap-6 text-[#387478] text-lg lg:text-xl">
        <h1>Ticket Categories</h1>
        {categories.map((category) => (
          <button key={category.id} onClick={() => onCategorySelect(category.name)} className="flex flex-col justify-center items-center text-sm bg-neutral-100 shadow-md min-w-[90px] max-w-[150px] lg:w-[150px] lg:h-[150px] min-h-[100px] max-h-[150px] rounded-xl cursor-pointer">
            {category.icon}
            <h1>{category.name}</h1>
          </button>
        ))}{" "}
      </div>
    </div>
  );
}

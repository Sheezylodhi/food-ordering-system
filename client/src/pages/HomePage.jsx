import React from 'react';
import CategoryIcons from '../components/CategoryIcons';
import MenuSection from '../components/MenuSection';

const HomePage = () => {
  const handleScrollToCategory = (catName) => {
    const element = document.getElementById(catName);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      <CategoryIcons onCategoryClick={handleScrollToCategory} />
      <MenuSection />
    </div>
  );
};

export default HomePage;
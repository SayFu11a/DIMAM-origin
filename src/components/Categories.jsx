import React from 'react';

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = [
    'Весь ассортимент',
    'Костюмы с начесом',
    'Костюмы без начеса',
    'Футболки',
    'Рубашки',
  ];

  return (
    <div id="fresh" className="categories">
      <ul>
        {categories.map((categ, index) => (
          <li
            key={index}
            onClick={() => setActiveIndex(index)}
            className={activeIndex == index ? 'active' : ''}>
            {categ}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;

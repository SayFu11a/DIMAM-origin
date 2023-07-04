import React from 'react';

function Categories({ value, onClickCatigory }) {
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
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onClickCatigory(index)}
            className={value == index ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;

import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import ClothingBlock from '../components/ClothingBlock';

import Fullscrean from '../components/Fullscrean';

const Home = () => {
  const [clothes, setСlothes] = React.useState([]);

  React.useEffect(() => {
    fetch('https://646888d4e99f0ba0a826b93b.mockapi.io/clothes')
      .then((res) => res.json())
      .then((arr) => setСlothes(arr));
  }, []);

  return (
    <>
      <Fullscrean />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Весь ассортимент</h2>
          <div className="content__items">
            {clothes.map((clothe) => (
              <ClothingBlock key={clothe.id} {...clothe} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

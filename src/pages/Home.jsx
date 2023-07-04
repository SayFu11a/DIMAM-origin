import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import ClothingBlock from '../components/ClothingBlock';
import Skeleton from '../components/ClothingBlock/Skeleton';

import Fullscrean from '../components/Fullscrean';

const Home = () => {
  const [clothes, setСlothes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [typeSort, setTypeSort] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  React.useEffect(() => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sort = typeSort.sortProperty;

    fetch(`https://646888d4e99f0ba0a826b93b.mockapi.io/clothes?${category}&sortBy=${sort}`)
      .then((res) => res.json())
      .then((arr) => {
        setСlothes(arr);
        setIsLoading(false);
      });
  }, [typeSort, categoryId]);

  return (
    <>
      <Fullscrean />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories value={categoryId} onClickCatigory={(i) => setCategoryId(i)} />
            <Sort activeSort={typeSort} setActiveSort={setTypeSort} />
          </div>
          <h2 className="content__title">Весь ассортимент</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
              : clothes.map((clothe) => <ClothingBlock key={clothe.id} {...clothe} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

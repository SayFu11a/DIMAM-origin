import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import ClothingBlock from '../components/ClothingBlock';
import Skeleton from '../components/ClothingBlock/Skeleton';
import Pagination from '../components/Pagination';
import Search from '../components/Search';

import Fullscrean from '../components/Fullscrean';
import { AppContext } from '../App';

const Home = () => {
  const { searchValue, setSearchValue } = React.useContext(AppContext);

  const [clothes, setСlothes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [typeSort, setTypeSort] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const sort = typeSort.sortProperty;

    fetch(
      `https://646888d4e99f0ba0a826b93b.mockapi.io/clothes?page=${currentPage}&limit=4&${category}&sortBy=${sort}${search}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setСlothes(arr);
        setIsLoading(false);
      });
  }, [typeSort, categoryId, searchValue, currentPage]);

  const closes = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const skeletons = clothes.map((clothe) => <ClothingBlock key={clothe.id} {...clothe} />);

  return (
    <>
      <Fullscrean />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories value={categoryId} onClickCatigory={(i) => setCategoryId(i)} />
            <Search searchValue={searchValue} setSearchValue={setSearchValue} />

            <Sort activeSort={typeSort} setActiveSort={setTypeSort} />
          </div>
          <div className="serch-title_block">
            <h2 className="content__title">Весь ассортимент </h2>
          </div>

          <div className="content__items">{isLoading ? closes : skeletons}</div>
          <Pagination setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </>
  );
};

export default Home;

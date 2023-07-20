import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import ClothingBlock from '../components/ClothingBlock';
import Skeleton from '../components/ClothingBlock/Skeleton';
import Pagination from '../components/Pagination';
import Search from '../components/Search';

import Fullscrean from '../components/Fullscrean';
import { AppContext } from '../App';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

  const { searchValue, setSearchValue } = React.useContext(AppContext);

  const [clothes, setСlothes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onClickCatigory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (namber) => {
    dispatch(setCurrentPage(namber));
  };

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://646888d4e99f0ba0a826b93b.mockapi.io/clothes?page=${currentPage}&limit=4&${category}&sortBy=${sort.sortProperty}${search}`,
      )
      .then((res) => {
        setСlothes(res.data);
        setIsLoading(false);
      });
    // window.scrollTo(0, 0);
  }, [sort.sortProperty, categoryId, searchValue, currentPage]);

  const closes = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const skeletons = clothes.map((clothe) => <ClothingBlock key={clothe.id} {...clothe} />);

  return (
    <>
      <Fullscrean />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories value={categoryId} onClickCatigory={onClickCatigory} />
            <Search searchValue={searchValue} setSearchValue={setSearchValue} />

            <Sort />
          </div>
          <div className="serch-title_block">
            <h2 className="content__title">Весь ассортимент </h2>
          </div>

          <div className="content__items">{isLoading ? closes : skeletons}</div>
          <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
      </div>
    </>
  );
};

export default Home;

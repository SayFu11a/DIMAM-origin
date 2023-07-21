import React from 'react';
import qs from 'qs';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // чтобы сшить строку queryString в адрес

import { setCategoryId, setCurrentPage, setFilltersUrl } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import ClothingBlock from '../components/ClothingBlock';
import Skeleton from '../components/ClothingBlock/Skeleton';
import Pagination from '../components/Pagination';
import Search from '../components/Search';

import Fullscrean from '../components/Fullscrean';
import { AppContext } from '../App';

const Home = () => {
  const navigate = useNavigate(); // Говорим дай нам функцию из своего хука
  const dispatch = useDispatch();
  const isSearch = React.useRef(false); // поиска пока нету по умполчанию ничего нету
  const isMounted = React.useRef(false);

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

  const axiosPizzas = () => {
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
    window.scrollTo(0, 0);
  };

  // если изменили параметры и был первый рендер
  // useEffect который отчечает за парсинг параметров связанных с фильтрацией пицц, и вшивание их в адресную строчку
  React.useEffect(() => {
    // if проверяет есть ли первый рендер или нет, если первый рендер то не вшивает в URL параметры, а если второй и тд рендер то вшивает. Так как useEffect выполняется в первый раз даже если его параметры не быили изменены, то мы делаем такой лайфхак с помошью if
    if (isMounted.current) {
      // qs.stringify преврашаем объект в строку для ссылки
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`); // делаем в начале ссылки "?" // console.log(queryString); // sortProperty=rating&categoryId=0&currentPage=1
    }
    isMounted.current = true; // после первого рендера меняется на тру, и далее в ссылку вшиваются парамтры фильтрации
  }, [sort.sortProperty, categoryId, currentPage]);

  // если был первый рендер, то проверяем URL-праметры и сохраняем в редаксе.
  React.useEffect(() => {
    // если в window.location.search что то есть то мы будем это парсить из наших параметров и превращать в объект
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)); // substring чтбоы убрать первый символ ? - console.log(params); // выводит объект
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilltersUrl({
          ...params, // мы указываем что нам необходимо передать все эти параметры.
          sort,
        }),
      );
      isSearch.current = true; // если пришли параметры из URL то не вызывай axiosPizzas и не делай рендер по умолчанию, в коде ниже будет написанно.  если dispatch не был произведен на изменение setFilltersUrl то тут будет false - это значит что мы можем сделать запрос по-умолчанию, то есть запрос с параметрами которые вшиты изначально в редаксе.
    }
  }, []);

  // если был первый рендер то запрашиваем пиццы
  React.useEffect(() => {
    // если нету поска по квери парамтрам то мы делаем axios запрос
    if (!isSearch.current) {
      axiosPizzas();
    }
    isSearch.current = false; // когда поняли что вверу ничего нету передаем фалсе
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

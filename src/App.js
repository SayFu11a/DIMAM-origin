import React from 'react';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

import Fullscrean from './components/Fullscrean';

import './scss/app.scss';

function App() {
  const [clothes, setСlothes] = React.useState([]);

  React.useEffect(() => {
    fetch('https://646888d4e99f0ba0a826b93b.mockapi.io/clothes')
      .then((res) => res.json())
      .then((arr) => setСlothes(arr));
  }, []);

  return (
    <div className="wrapper">
      <Header />
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
              <PizzaBlock key={clothe.id} {...clothe} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

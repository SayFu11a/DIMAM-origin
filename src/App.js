import React from 'react';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

import Fullscrean from './components/Fullscrean';

import clothes from './assets/clothes.json';

import './scss/app.scss';

function App() {
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
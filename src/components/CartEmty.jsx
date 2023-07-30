import React from 'react';
import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png';

const CartEmty = () => {
   return (
      <div className="cart cart--empty">
         <h2>
            Корзина пустая <icon>😕</icon>
         </h2>
         <p>
            Вероятней всего, вы ещё не добавили ничего в корзину.
            <br />
            Для того, чтобы добавить что-то в корзину, перейди на главную страницу.
         </p>
         <img src={cartEmptyImg} alt="Empty cart" />
         <Link to="/" className="button button--black">
            <span>Вернуться назад</span>
         </Link>
      </div>
   );
};

export default CartEmty;

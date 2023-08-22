import { useState } from 'react';

import { useTelegram } from '../../hooks/useTelegram';

import ProductItem from './ProductItem/ProductItem';
import styles from './ProductList.module.css';

import products from '../../PRODUCTS.json';

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return (acc += item?.price);
  }, 0);
};

const ProductList = () => {
  const [cartItems, setCartItems] = useState([]);

  const { tg } = useTelegram();

  const onAdd = product => {
    const alreadyInCart = cartItems.find(item => item.id === product.id);

    let newCartItems = [];

    if (alreadyInCart) {
      newCartItems = cartItems.filter(item => item.id !== product.id);
    } else {
      newCartItems = [...cartItems, product.id];
    }

    setCartItems(newCartItems);

    if (newCartItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Buy for ${getTotalPrice(newCartItems)}`,
      });
    }
  };

  return (
    <div className={styles.list}>
      {products.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          onAdd={onAdd}
          className={styles.item}
        />
      ))}
    </div>
  );
};

export default ProductList;

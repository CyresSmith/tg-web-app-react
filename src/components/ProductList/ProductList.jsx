import { useCallback, useEffect, useState } from 'react';

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

  const { tg, queryID } = useTelegram();

  const onAdd = product => {
    const alreadyInCart = cartItems.find(item => item.id === product.id);

    let newCartItems = [];

    if (alreadyInCart) {
      newCartItems = cartItems.filter(item => item.id !== product.id);
    } else {
      newCartItems = [...cartItems, product];
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

  const handleDataSend = useCallback(() => {
    const data = {
      products: cartItems,
      totalPrice: getTotalPrice(cartItems),
      queryID,
    };

    fetch('http://localhost:8000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }, [cartItems, queryID]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', handleDataSend);

    return () => {
      tg.offEvent('mainButtonClicked', handleDataSend);
    };
  }, [handleDataSend, tg, tg.MainButton]);

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

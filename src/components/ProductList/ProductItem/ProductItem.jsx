import Button from '../../Button/Button';
import styles from './ProductItem.module.css';

const ProductItem = ({ product, onAdd }) => {
  const handleAddToCart = () => {
    onAdd(product);
  };

  return (
    <div className={styles.product}>
      <div className={styles.img} />
      <div className={styles.title}>{product.title}</div>
      <div className={styles.desc}>{product.desc}</div>
      <div className={styles.price}>{product.price}</div>

      <Button className={styles.addBtn} onClick={handleAddToCart}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductItem;

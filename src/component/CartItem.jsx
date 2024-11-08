import { ChevronDown, ChevronUp } from '../icons';
import { useDispatch } from 'react-redux';
import { removeItem, toggleAmount } from '../features/cart/cartSlice';

const CartItem = ({ id, title, price, img, amount }) => {
  const dispatch = useDispatch();

  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">{price}</h4>
        {/* remove button */}
        <button
          className="remove-btn"
          onClick={() => dispatch(removeItem({ id }))}
        >
          remove
        </button>
      </div>
      <div>
        {/* increase amount */}
        <button
          className="amount-btn"
          onClick={() => dispatch(toggleAmount({ id, toggle: 'increase' }))}
        >
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button
          className="amount-btn"
          onClick={() => dispatch(toggleAmount({ id, toggle: 'decrease' }))}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};
export default CartItem;

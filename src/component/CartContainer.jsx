import { toggleModal } from '../features/modal/modalSlice';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';

const CartContainer = () => {
  const dispatch = useDispatch();
  const { totalPrice, totalAmount, cartItems } = useSelector(
    (state) => state.cart
  );
  if (totalAmount < 1) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          <h2>Cart</h2>
          <h4 className="empty-cart">Cart is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      {/* cart header */}
      <header>
        <h2>Cart</h2>
      </header>
      {/* cart items */}
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${totalPrice}</span>
          </h4>
        </div>
        <button
          className="btn clear-btn"
          onClick={() => dispatch(toggleModal())}
        >
          clear cart
        </button>
      </footer>
    </section>
  );
};
export default CartContainer;

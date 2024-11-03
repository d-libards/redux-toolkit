import CartContainer from './component/CartContainer';
import Navbar from './component/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { calculateTotals, getCartItems } from './features/cart/cartSlice';
import Modal from './component/Modal';

function App() {
  const { cartItems, isLoading } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems('random'));
  }, []);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;

import { CartIcon } from '../icons';
import { useSelector } from 'react-redux';
import { store } from '../store';

function Navbar() {
  const { totalAmount } = useSelector((state) => state.cart);

  return (
    <nav>
      <div className="nav-center">
        <h3>redux-toolkit</h3>
        <div className="nav-container">
          <CartIcon />
          <div className="amount-container">
            <p className="total-amount">{totalAmount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;

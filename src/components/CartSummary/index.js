// Write your code here
import './index.css'

import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const cartSize = cartList.length
      let totalPrice = 0
      for (let i = 0; i < cartSize; i += 1) {
        totalPrice += cartList[i].price * cartList[i].quantity
      }
      return (
        <div className="total-value">
          <h1 className="order">
            Order Total: <span className="price">{`Rs.${totalPrice}`}</span>
          </h1>
          <p className="items">{`${cartSize} items in Cart`}</p>
          <button type="button" className="checkout-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary

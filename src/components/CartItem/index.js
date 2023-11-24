import {BiRupee} from 'react-icons/bi'
import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'

import './index.css'

const CartItem = props => {
  const {cartDetails, onCartIncrement, onCartDecrement} = props
  const {id, name, imageUrl, cost, quantity} = cartDetails

  const onClickDecrementQuantity = () => {
    onCartDecrement(id)
  }

  const onClickIncrementQuantity = () => {
    onCartIncrement(id)
  }

  return (
    <li className="cart-list-items">
      <div className="cart-logo-container">
        <img src={imageUrl} alt="cart-item" className="cart-item-logo" />
        <h1 className="cart-item-name-lg">{name}</h1>
      </div>
      <div className="small-cart-container">
        <p className="cart-item-name-sm">{name}</p>
        <div className="cart-btn-container">
          <button
            type="button"
            className="icon-btn-dash"
            onClick={onClickDecrementQuantity}
          >
            {}
            <BsDashSquare />
          </button>
          <p className="add-item-text">{quantity}</p>
          <button
            type="button"
            className="icon-btn-plus"
            onClick={onClickIncrementQuantity}
          >
            {}
            <BsPlusSquare />
          </button>
        </div>
        <div className="cart-cost">
          <BiRupee className="cart-cost-name" />
          <p className="cart-cost-name">{cost * quantity}.00</p>
        </div>
      </div>
    </li>
  )
}
export default CartItem

import {Component} from 'react'
import {FaRupeeSign} from 'react-icons/fa'

import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'
import {GiRoundStar} from 'react-icons/gi'

// import Counter from '../Counter'

import './index.css'

class RestaurantFoodItem extends Component {
  state = {quantity: 0}

  componentDidMount() {
    this.findTheCartItemList()
  }

  findTheCartItemList = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const {foodItemDetails} = this.props
    const cartItem = cartData.filter(each => each.id === foodItemDetails.id)

    if (cartItem.length !== 0) {
      if (cartItem[0].quantity > 0) {
        this.setState({quantity: cartItem[0].quantity})
      } else if (cartItem[0].quantity < 1) {
        this.removeCartItem()
        this.setState({quantity: cartItem[0].quantity})
      }
    }
  }

  onClickAddItem = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const {foodItemDetails} = this.props
    const cartItem = {...foodItemDetails, quantity: 1}
    cartData.push(cartItem)
    localStorage.setItem('cartData', JSON.stringify(cartData))
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
    this.findTheCartItemList()
  }

  removeCartItem = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {foodItemDetails} = this.props
    const updatedCartData = cartData.filter(
      eachItem => eachItem.id !== foodItemDetails.id,
    )
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.findTheCartItemList()
  }

  onClickMinus = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {foodItemDetails} = this.props
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === foodItemDetails.id) {
        if (eachItem.quantity > 0) {
          const updatedQuantity = eachItem.quantity - 1
          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.setState(prevState => ({quantity: prevState.quantity - 1}))
    this.findTheCartItemList()
  }

  onClickAdd = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {foodItemDetails} = this.props
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === foodItemDetails.id) {
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
    this.findTheCartItemList()
  }

  render() {
    const {quantity} = this.state
    const {foodItemDetails} = this.props
    return (
      <li className="listed-food-item">
        <img
          src={foodItemDetails.imageUrl}
          alt="food item"
          className="food-item-img"
        />
        <div className="food-item-details">
          <h1 className="food-item-name">{foodItemDetails.name}</h1>
          <div className="rupee-container">
            <FaRupeeSign className="rupee" />
            <p className="food-item-cost">{foodItemDetails.cost}</p>
          </div>
          <div className="food-item-rating-container">
            <GiRoundStar className="star" />
            <p className="food-item-rating">{foodItemDetails.rating}</p>
          </div>
          {quantity === 0 ? (
            <button
              type="button"
              className="add-btn"
              onClick={this.onClickAddItem}
            >
              Add
            </button>
          ) : (
            <div className="add-item-container">
              <button
                type="button"
                className="icon-btn-dash"
                onClick={this.onClickMinus}
              >
                {}
                <BsDashSquare />
              </button>
              <p className="add-item-text">{quantity}</p>
              <button
                type="button"
                className="icon-btn-plus"
                onClick={this.onClickAdd}
              >
                {}
                <BsPlusSquare />
              </button>
            </div>
          )}
        </div>
      </li>
    )
  }
}
export default RestaurantFoodItem

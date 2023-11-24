import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {BiRupee} from 'react-icons/bi'
import {AiFillCheckCircle} from 'react-icons/ai'
import Header from '../Header'
import CartItem from '../CartItem'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  cartSuccess: 'SUCCESS',
  cartNoView: 'FAILURE',
  cartLoader: 'IN_PROGRESS',
  paymentSuccess: 'PAY_SUCCESS',
}

class Cart extends Component {
  state = {
    cartList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCartData()
  }

  getCartData = () => {
    this.setState({apiStatus: apiStatusConstants.cartLoader})
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    if (cartData.length === 0) {
      this.setState({apiStatus: apiStatusConstants.cartNoView})
    } else {
      const cartItems = cartData.map(eachCartItem => ({
        cost: eachCartItem.cost,
        id: eachCartItem.id,
        imageUrl: eachCartItem.imageUrl,
        name: eachCartItem.name,
        quantity: eachCartItem.quantity,
      }))
      this.setState({
        cartList: cartItems,
        apiStatus: apiStatusConstants.cartSuccess,
      })
    }
  }

  renderEmptyCartView = () => (
    <div className="empty-cart-container">
      <img
        src="https://res.cloudinary.com/dihuk5job/image/upload/v1700539699/hb9ncc5vkcpt95u3fh1x.jpg"
        alt="empty cart"
        className="empty-cart-img"
      />
      <h1 className="empty-cart-heading">No Order Yet!</h1>
      <p className="empty-cart-desc">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/" className="nav-link">
        <button type="button" className="order-btn">
          Order Now
        </button>
      </Link>
    </div>
  )

  renderCartLoader = () => (
    <div className="cart-loader">
      <Loader type="TailSpin" color="#F7931E" height={50} width={50} />
    </div>
  )

  renderPaymentSuccessView = () => (
    <div className="payment-success-container">
      <AiFillCheckCircle className="success-icon" />
      <h1 className="success-heading">Payment Successful</h1>
      <p className="success-desc">
        Thank you for ordering <br />
        Your payment is successfully completed.
      </p>
      <Link to="/" className="nav-link">
        <button type="button" className="home-page-button-link">
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  onPlaceOrder = () => {
    localStorage.clear('cartData')
    this.setState({apiStatus: apiStatusConstants.paymentSuccess})
  }

  removeCartItem = updatedData => {
    const updatedCartData = updatedData.filter(
      eachItem => eachItem.quantity > 0,
    )
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getCartData()
  }

  onCartIncrement = id => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === id) {
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getCartData()
  }

  onCartDecrement = id => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === id) {
        if (eachItem.quantity > 0) {
          const updatedQuantity = eachItem.quantity - 1
          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })
    this.removeCartItem(updatedCartData)
  }

  calculateTotalAmount = () => {
    const {cartList} = this.state
    const amount = cartList.map(eachItem => eachItem.quantity * eachItem.cost)
    const totalAmount = amount.reduce((a, b) => a + b)
    return totalAmount
  }

  renderCartItems = () => {
    const {cartList} = this.state
    const totalAmount = this.calculateTotalAmount()
    return (
      <>
        <Header />
        <div className="cart-container">
          <div className="cart-heading-container">
            <p className="cart-heading">Item</p>
            <p className="cart-heading">Quantity</p>
            <p className="cart-heading-price">Price</p>
          </div>
          <ul className="cart-items-list">
            {cartList.map(eachItem => (
              <CartItem
                key={eachItem.id}
                cartDetails={eachItem}
                onCartIncrement={this.onCartIncrement}
                onCartDecrement={this.onCartDecrement}
              />
            ))}
          </ul>
          <hr className="cart-hr-line" />
          <div className="order-container">
            <h1 className="order-style">Order Total:</h1>
            <div className="cart-sum">
              <div className="order-style-container">
                <BiRupee className="order-icon" />
                <p className="order-style">
                  Total Order Cost: {totalAmount}.00
                </p>
              </div>
              <button
                type="button"
                className="order-btn"
                onClick={this.onPlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  renderApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.cartSuccess:
        return this.renderCartItems()
      case apiStatusConstants.cartNoView:
        return this.renderEmptyCartView()
      case apiStatusConstants.paymentSuccess:
        return this.renderPaymentSuccessView()
      case apiStatusConstants.cartLoader:
        return this.renderCartLoader()
      default:
        return null
    }
  }

  render() {
    return this.renderApiStatus()
  }
}
export default Cart

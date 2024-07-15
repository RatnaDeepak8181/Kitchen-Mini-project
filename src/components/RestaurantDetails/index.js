import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {GiRoundStar} from 'react-icons/gi'

import Header from '../Header'
import RestaurantFoodItem from '../RestaurantFoodItem'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    restaurantData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)

      const convertedData = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        id: data.id,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
        foodItems: data.food_items.map(eachFoodItem => ({
          cost: eachFoodItem.cost,
          foodType: eachFoodItem.food_type,
          id: eachFoodItem.id,
          imageUrl: eachFoodItem.image_url,
          name: eachFoodItem.name,
          rating: eachFoodItem.rating,
        })),
      }
      // console.log(convertedData)
      this.setState({
        restaurantData: convertedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderRestaurantFoodItems = () => {
    const {restaurantData} = this.state
    const {foodItems} = restaurantData
    if (!Array.isArray(foodItems)) {
      return null
    }

    return (
      <div className="food-items-container">
        <ul className="food-items-list">
          {foodItems.map(eachFoodItem => (
            <RestaurantFoodItem
              key={eachFoodItem.id}
              foodItemDetails={eachFoodItem}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderRestaurantDetails = () => {
    const {restaurantData} = this.state
    return (
      <>
        <Header />
        <div>
          <div className="restaurant-banner-and-details-container">
            <img
              src={restaurantData.imageUrl}
              alt="restaurant"
              className="restaurant-banner-image"
            />
            <div className="restaurant-banner-details-container">
              <h1 className="restaurant-banner-name">{restaurantData.name}</h1>
              <p className="restaurant-banner-cuisine">
                {restaurantData.cuisine}
              </p>
              <p className="restaurant-banner-location">
                {restaurantData.location}
              </p>
              <div className="rating-and-cost-for-two-container">
                <div className="banner-rating-container">
                  <div className="banner-star-and-rating-container">
                    <GiRoundStar className="star" />
                    <p className="restaurant-banner-rating">
                      {restaurantData.rating}
                    </p>
                  </div>
                  <p className="restaurant-banner-reviews-count">
                    {restaurantData.reviewsCount}+ Ratings
                  </p>
                </div>
                <div>
                  <p className="restaurant-banner-cost">
                    {restaurantData.costForTwo}
                  </p>
                  <p className="restaurant-banner-cost-for-two">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
          {this.renderRestaurantFoodItems()}
          <Footer />
        </div>
      </>
    )
  }

  onClickHomePage = () => {
    const {history} = this.props
    history.replace('/')
  }

  renderRestaurantDetailsFailure = () => (
    <div className="restaurant-details-failure-container">
      <img
        src="https://res.cloudinary.com/dihuk5job/image/upload/v1700724414/i2pp3ofistkmwbo3nwai.jpg"
        alt="restaurant close"
        className="restaurant-close-img"
      />
      <h1 className="failure-heading">Sorry! We are closed temporarily</h1>
      <p className="failure-desc">Check for other Restaurants</p>
      <button
        type="button"
        className="home-page-button-link"
        onClick={this.onClickHomePage}
      >
        Go To Home Page
      </button>
    </div>
  )

  renderRestaurantDetailsLoader = () => (
    <div className="cart-loader">
      <Loader type="TailSpin" color="#F7931E" height={50} width={50} />
    </div>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantDetails()
      case apiStatusConstants.inProgress:
        return this.renderRestaurantDetailsLoader()
      case apiStatusConstants.failure:
        return this.renderRestaurantDetailsFailure()
      default:
        return null
    }
  }

  render() {
    return this.renderApiStatus()
  }
}
export default RestaurantDetails

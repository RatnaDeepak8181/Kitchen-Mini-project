import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Loader from 'react-loader-spinner'
import {MdOutlineSort} from 'react-icons/md'
import {FaAngleLeft, FaAngleRight} from 'react-icons/fa'
import AllRestaurants from '../AllRestaurants'
import './index.css'

const initialCarouselApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const limit = 9

class Home extends Component {
  state = {
    carouselApiStatus: initialCarouselApiStatus.initial,
    carouselsList: [],
    activeOptionId: sortByOptions[1].value,
    popularRestaurantsList: [],
    activePage: 1,
  }

  componentDidMount() {
    this.getPopularRestaurantsCarouselImgs()
    this.getPopularRestaurants()
  }

  getPopularRestaurantsCarouselImgs = async () => {
    this.setState({carouselApiStatus: initialCarouselApiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const carousalImgsUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const carousalImgsResponse = await fetch(carousalImgsUrl, options)
    if (carousalImgsResponse.ok === true) {
      const carousalImgsResponseData = await carousalImgsResponse.json()
      const carouselsData = carousalImgsResponseData.offers.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
      }))
      this.setState({
        carouselsList: carouselsData,
        carouselApiStatus: initialCarouselApiStatus.success,
      })
    } else {
      this.setState({carouselApiStatus: initialCarouselApiStatus.failure})
    }

    // console.log(carousalImgsResponseData)
  }

  getPopularRestaurants = async () => {
    const {activePage} = this.state
    const offset = (activePage - 1) * limit
    const restaurantsUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const restaurantsResponse = await fetch(restaurantsUrl, options)
    const restaurantsData = await restaurantsResponse.json()
    // console.log(restaurantsData)
    const popularRestaurantsData = restaurantsData.restaurants.map(
      eachDetail => ({
        costForTwo: eachDetail.cost_for_two,
        cuisine: eachDetail.cuisine,
        groupByTime: eachDetail.group_by_time,
        hasOnlineDelivery: eachDetail.has_online_delivery,
        hasTableBooking: eachDetail.has_table_booking,
        id: eachDetail.id,
        imageUrl: eachDetail.image_url,
        isDeliveringNow: eachDetail.is_delivering_now,
        location: eachDetail.location,
        menuType: eachDetail.menu_type,
        name: eachDetail.name,
        opensAt: eachDetail.opens_at,
        userRating: {
          rating: eachDetail.user_rating.rating,
          ratingColor: eachDetail.user_rating.rating_color,
          ratingText: eachDetail.user_rating.rating_text,
          totalReviews: eachDetail.user_rating.total_reviews,
        },
      }),
    )
    this.setState({popularRestaurantsList: popularRestaurantsData})
  }

  renderCarouselImgs = () => {
    const {carouselsList} = this.state
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      autoplay: true,
      fade: true,
      speed: 2000,
      autoplaySpeed: 500,
      cssEase: 'linear',
    }
    return (
      <div className="carousel-container">
        <Slider {...settings}>
          {carouselsList.map(eachCarousel => (
            <img
              src={eachCarousel.imageUrl}
              alt="offer"
              key={eachCarousel.id}
            />
          ))}
        </Slider>
      </div>
    )
  }

  renderRestaurantsOfferLoader = () => (
    <div className="offers-loader-container">
      <Loader type="TailSpin" color="#F7931E" height={50} width={50} />
    </div>
  )

  renderCarouselApiStatus = () => {
    const {carouselApiStatus} = this.state
    switch (carouselApiStatus) {
      case initialCarouselApiStatus.success:
        return this.renderCarouselImgs()
      case initialCarouselApiStatus.inProgress:
        return this.renderRestaurantsOfferLoader()
      default:
        return null
    }
  }

  onChangeSortBy = event => {
    this.setState({activeOptionId: event.target.value})
  }

  renderRestaurantDetails = () => {
    const {popularRestaurantsList} = this.state
    return (
      <ul className="restaurants-list">
        {popularRestaurantsList.map(eachRestaurant => (
          <AllRestaurants
            key={eachRestaurant.id}
            restaurantDetails={eachRestaurant}
          />
        ))}
      </ul>
    )
  }

  onClickLeftSide = () => {
    this.setState(prevState => ({
      activePage: prevState.activePage > 1 ? prevState.activePage - 1 : 1,
    }))
  }

  onClickRightSide = () => {
    this.setState(prevState => ({
      activePage: prevState.activePage === 4 ? 4 : prevState.activePage + 1,
    }))
  }

  render() {
    const {activeOptionId, activePage} = this.state
    // console.log(popularRestaurantsList)
    return (
      <div className="home-container">
        {this.renderCarouselApiStatus()}
        <div className="home-middle-container">
          <h1 className="popular-restaurants-heading">Popular Restaurants</h1>
          <p className="popular-restaurants-desc">
            Select Your favorite restaurant special dish and make your day
            happy...
          </p>
          <div className="sort-container">
            <MdOutlineSort className="sort-icon" />
            <select
              className="sort-by-select"
              value={activeOptionId}
              onChange={this.onChangeSortBy}
            >
              {sortByOptions.map(eachOption => (
                <option
                  key={eachOption.id}
                  value={eachOption.value}
                  className="select-option"
                >
                  Sort by {eachOption.displayText}
                </option>
              ))}
            </select>
          </div>
          {this.renderRestaurantDetails()}
          <div className="pagination-container">
            <button
              type="button"
              onClick={this.onClickLeftSide}
              className="left-btn"
            >
              {}
              <FaAngleLeft className="angle-icon" />
            </button>
            <p className="pagination-num">{activePage} of 4</p>
            <button
              type="button"
              onClick={this.onClickRightSide}
              className="right-btn"
            >
              {}
              <FaAngleRight className="angle-icon" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default Home

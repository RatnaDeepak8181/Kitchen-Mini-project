import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Loader from 'react-loader-spinner'
import {MdOutlineSort} from 'react-icons/md'
import {FaSearch} from 'react-icons/fa'
import Header from '../Header'
import Counter from '../Counter'
import AllRestaurants from '../AllRestaurants'
import Footer from '../Footer'
import './index.css'

const initialCarouselApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const initialPopularRestaurantApiStatus = {
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
    popularRestaurantApiStatus: initialPopularRestaurantApiStatus.initial,
    activeOptionId: sortByOptions[1].value,
    popularRestaurantsList: [],
    activePage: 1,
    searchInput: '',
    paginationStatus: false,
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
    this.setState({
      popularRestaurantApiStatus: initialPopularRestaurantApiStatus.inProgress,
    })
    const {activePage, activeOptionId, searchInput} = this.state
    const offset = (activePage - 1) * limit
    // console.log(offset)
    const restaurantsUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${limit}&sort_by_rating=${activeOptionId}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const restaurantsResponse = await fetch(restaurantsUrl, options)
    if (restaurantsResponse.ok === true) {
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
      this.setState({
        popularRestaurantsList: popularRestaurantsData,
        popularRestaurantApiStatus: initialCarouselApiStatus.success,
        paginationStatus: true,
      })
    } else {
      this.setState({
        popularRestaurantApiStatus: initialPopularRestaurantApiStatus.failure,
        paginationStatus: false,
      })
    }
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
              className="carousel-img"
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

  renderPopularRestaurantsLoader = () => (
    <div className="restaurants-loader-container">
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

  renderPopularRestaurantApiStatus = () => {
    const {popularRestaurantApiStatus} = this.state
    switch (popularRestaurantApiStatus) {
      case initialPopularRestaurantApiStatus.success:
        return this.renderRestaurantDetails()
      case initialCarouselApiStatus.inProgress:
        return this.renderPopularRestaurantsLoader()
      case initialPopularRestaurantApiStatus.failure:
        return this.renderPopularRestaurantsFailureView()
      default:
        return null
    }
  }

  renderPopularRestaurantsFailureView = () => (
    <div className="restaurant-details-failure-container">
      <img
        src="https://res.cloudinary.com/dihuk5job/image/upload/v1700724414/i2pp3ofistkmwbo3nwai.jpg"
        alt="restaurant close"
        className="restaurant-close-img"
      />
      <h1 className="failure-heading">Sorry! Something went wrong</h1>
      <p className="failure-desc">Try other filters</p>
    </div>
  )

  onChangeSortBy = event => {
    this.setState(
      {activeOptionId: event.target.value},
      this.getPopularRestaurants,
    )
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

  onKeyDown = event => {
    if (event.key === 'Enter') {
      this.getPopularRestaurants()
    }
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  renderSearchElement = () => (
    <div className="search-container">
      <input
        type="search"
        className="search-ele"
        onChange={this.onChangeSearch}
        placeholder="Search"
        onKeyDown={this.onKeyDown}
      />
      <FaSearch className="search-icon" />
    </div>
  )

  getActivePage = page => {
    this.setState({activePage: page}, this.getPopularRestaurants)
  }

  render() {
    const {activeOptionId, paginationStatus} = this.state
    // console.log(activePage)
    return (
      <div className="whole-home-container">
        <Header />
        {this.renderCarouselApiStatus()}
        <div className="home-container">
          <div className="home-middle-container">
            <h1 className="popular-restaurants-heading">Popular Restaurants</h1>
            <div className="desc-and-sort-container">
              <p className="popular-restaurants-desc">
                Select Your favourite restaurant special dish and make your day
                happy...
              </p>
              <div className="sort-container">
                <MdOutlineSort className="sort-icon" />
                <p className="sort-by-select">Sort By</p>
                <select
                  className="sort-by-select"
                  value={activeOptionId}
                  onChange={this.onChangeSortBy}
                >
                  {sortByOptions.map(eachOption => (
                    <option key={eachOption.id} value={eachOption.value}>
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {this.renderSearchElement()}
            <hr className="line" />
            {this.renderPopularRestaurantApiStatus()}
            {paginationStatus ? (
              <Counter pageChangeFunction={this.getActivePage} />
            ) : (
              ''
            )}
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}
export default Home

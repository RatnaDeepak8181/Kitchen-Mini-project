import {Link} from 'react-router-dom'
import {GiRoundStar} from 'react-icons/gi'
import './index.css'

const AllRestaurants = props => {
  const {restaurantDetails} = props
  const {id, imageUrl, cuisine, name, userRating} = restaurantDetails
  // console.log(userRating.rating)
  return (
    <Link to={`/restaurant/${id}`} className="nav-link">
      <li className="restaurant-item">
        <img src={imageUrl} alt="restaurant" className="restaurant-img" />
        <div className="restaurant-details-container">
          <h1 className="restaurant-name">{name}</h1>
          <p className="cuisine">{cuisine}</p>
          <div className="rating-container">
            <GiRoundStar className="star" />
            <p className="rating">{userRating.rating}</p>
            <p className="total-reviews">({userRating.totalReviews})</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default AllRestaurants

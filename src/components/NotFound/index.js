import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dihuk5job/image/upload/v1700734570/jp97mhxtwspql3ad9x5q.jpg"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-desc">
      We are sorry, the page you requested could not be found. Please go back to
      the homepage
    </p>
    <Link to="/" className="nav-link">
      <button type="button" className="home-page-button-link">
        Home Page
      </button>
    </Link>
  </div>
)
export default NotFound

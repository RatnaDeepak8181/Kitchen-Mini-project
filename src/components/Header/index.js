import {FiMenu} from 'react-icons/fi'
import {IoIosCloseCircle} from 'react-icons/io'
import Popup from 'reactjs-popup'
import './index.css'

const Header = () => (
  <>
    <nav className="mb-nav-bar">
      <div className="logo-and-logo-name-container">
        <img
          src="https://res.cloudinary.com/dihuk5job/image/upload/v1700032061/r43zorhd8iax0ezor388.svg"
          alt="website logo"
          className="header-logo"
        />
        <h1 className="header-logo-name">Tasty Kitchens</h1>
      </div>
      <Popup
        trigger={
          <button type="button" className="trigger-btn">
            {}
            <FiMenu className="menu-icon" />
          </button>
        }
        position="bottom right"
      >
        {closePopup => (
          <div className="popup-ele-container">
            <ul className="nav-ele-container">
              <li className="home-nav-ele">Home</li>
              <li className="cart-nav-ele">Cart</li>
              <li>
                <button type="button" className="log-out-btn">
                  Logout
                </button>
              </li>
            </ul>
            <button
              type="button"
              onClick={() => closePopup()}
              className="close-btn"
            >
              {}
              <IoIosCloseCircle className="close-icon" />
            </button>
          </div>
        )}
      </Popup>
      <ul className="lg-nav-ele-container">
        <li className="home-nav-ele">Home</li>
        <li className="cart-nav-ele">Cart</li>
        <li>
          <button type="button" className="log-out-btn">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  </>
)
export default Header

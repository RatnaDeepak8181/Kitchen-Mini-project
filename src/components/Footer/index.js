// import {Component} from 'react'
import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-logo-and-name-container">
        <img
          src="https://res.cloudinary.com/dihuk5job/image/upload/v1700448554/umfknoiyb2kcyzvzg5va.svg"
          alt="website-footer-logo"
          className="footer-logo"
        />
        <h1 className="footer-logo-name">Tasty Kitchens</h1>
      </div>
      <p className="footer-desc">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="logos-container">
        <FaPinterestSquare
          className="footer-social-media-logo"
          testid="pintrest-social-icon"
        />
        <FaInstagram
          className="footer-social-media-logo"
          testid="instagram-social-icon"
        />
        <FaTwitter
          className="footer-social-media-logo"
          testid="twitter-social-icon"
        />
        <FaFacebookSquare
          className="footer-social-media-logo"
          testid="facebook-social-icon"
        />
      </div>
    </div>
  )
}

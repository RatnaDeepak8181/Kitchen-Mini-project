import {Component} from 'react'
// import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const userDetailsResponse = await fetch(url, options)
    const userData = await userDetailsResponse.json()
    if (userDetailsResponse.ok === true) {
      this.onSubmitSuccess(userData.jwt_token)
    } else {
      this.onSubmitFailure(userData.error_msg)
    }
    console.log(userData)
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <div className="password-input-and-label-container">
        <label className="password-input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          className="password-input-field"
          id="password"
          onChange={this.onChangePassword}
          value={password}
        />
      </div>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <div className="username-input-and-label-container">
        <label className="username-input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          className="username-input-field"
          id="username"
          onChange={this.onChangeUsername}
          value={username}
        />
      </div>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    return (
      <>
        <div className="login-container">
          <div className="heading-and-img-container">
            <div className="login-heading-container">
              <h1 className="login-container-heading">Login</h1>
            </div>
            <div className="img-container">
              <img
                src="https://res.cloudinary.com/dihuk5job/image/upload/v1699851808/nd3bzcd9zhxncbgkkurt.jpg"
                alt="website login"
                className="login-page-landing-img"
              />
            </div>
          </div>
          <div className="login-form-bottom-container">
            <form onSubmit={this.submitForm} className="login-form-container">
              {this.renderUsernameField()}
              {this.renderPasswordField()}
              {showSubmitError && <p className="error-msg">{errorMsg}</p>}
              <div className="login-btn-container">
                <button className="submit-btn" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
}
export default Login

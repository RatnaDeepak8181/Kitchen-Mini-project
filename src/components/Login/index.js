import {Component} from 'react'
import {Redirect} from 'react-router-dom'
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

  onSubmitForm = async event => {
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

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-card">
          <div className="logo-container">
            <img
              src="https://res.cloudinary.com/dpjowvn70/image/upload/v1673347763/Vector1x_yu8nat.png"
              alt="website logo"
              className="website-logo"
            />
            <h1 className="company-heading">Tasty Kitchens</h1>
          </div>
          <div className="login-title-container">
            <h1 className="login-heading">Login</h1>
            <img
              src="https://res.cloudinary.com/dpjowvn70/image/upload/v1673372046/Rectangle_14571_qeoiah.png"
              alt="website log"
              className="small-landing-img"
            />
          </div>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              className="input"
              onChange={this.onChangeUsername}
              value={username}
            />
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              className="input"
              onChange={this.onChangePassword}
              value={password}
            />
            {showSubmitError ? <p className="error-msg">{errorMsg}</p> : ''}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
        <div className="login-large-view">
          <img
            src="https://res.cloudinary.com/dpjowvn70/image/upload/v1673347766/Rectangle_1456_maa67m.png"
            alt="website login"
            className="large-landing-img"
          />
        </div>
      </div>
    )
  }
}

export default Login

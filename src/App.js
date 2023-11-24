import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login/index'
import Home from './components/Home/index'
import RestaurantDetails from './components/RestaurantDetails/index'
import Cart from './components/Cart/index'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute
        exact
        path="/restaurants-list/:id"
        component={RestaurantDetails}
      />
      <ProtectedRoute exact path="/cart" component={Cart} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App

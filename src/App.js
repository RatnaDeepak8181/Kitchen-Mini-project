import {Switch, Route} from 'react-router-dom'
import Login from './components/Login/index'
import Home from './components/Home/index'
import Header from './components/Header/index'

import './App.css'

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
    </Switch>
  </>
)

export default App

import Signup from './Component/Signup';
import AuthProvider from './Context/AuthProvider';
import Navbar from './Component/NavBar';
import Ioa from './Component/Ioa';
import './App.css';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import PrivateRoute from './Component/PrivateRoute';
import Feed from './Component/Feed'
import Login from './Component/Login'
function App() {
  return (
    <Router>
    <AuthProvider>
    <Switch>
      <PrivateRoute exact path='/' component={Feed}/>
      <Route path='/login' component={Login}/>
      <Route path='/signup' component={Signup}/>
    </Switch>
    </AuthProvider>
  </Router>
  );
}

export default App;

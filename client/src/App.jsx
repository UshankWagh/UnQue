import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import SearchShop from './pages/SearchShop';
import Navbar from './components/Navbar';
import Shop from './pages/Shop';
import Queues from './pages/Queues';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployeeDash from './pages/EmployeeDash';
import ShopOwnerDash from './pages/ShopOwnerDash';
import Profile from './pages/Profile';
import ShopCounter from './pages/ShopCounter';
import AuthBtns from './components/AuthBtns';
import PrivateRoute from './components/PrivateRoute';
import Loader from './components/Loader';
import { useEffect, useState } from 'react';

function App() {
  const [auth, setAuth] = useState();

  useEffect(() => {
    setAuth(localStorage.getItem("auth") != "undefined" ? JSON.parse(localStorage.getItem("auth")) : "");
  }, [localStorage.getItem("auth")]);
  console.log(auth);

  const handleLogin = (auth) => {
    localStorage.setItem("auth", JSON.stringify(auth));
    setAuth(auth);
  }

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth(undefined);
  }

  return (
    <Router>
      <Navbar auth={auth} />
      <AuthBtns auth={auth} handleLogout={handleLogout} />
      <Routes>
        <Route path='/login' element=<Login handleLogin={handleLogin} /> />
        <Route path='/register' element=<Register handleLogin={handleLogin} /> />
        <Route path='/search-shop' element=<SearchShop /> />
        {auth && <>
          <Route path='/customer/' element=<PrivateRoute role="customer" />>
            <Route path='shop' element=<Shop auth={auth} /> />
            <Route path='queues' element=<Queues auth={auth} /> />
            <Route path='profile' element=<Profile auth={auth} /> />
          </Route>
          <Route path='/employee/' element=<PrivateRoute role="employee" />>
            <Route path='counter' element=<ShopCounter auth={auth} /> />
            <Route path='employee-dash' element=<EmployeeDash auth={auth} /> />
            <Route path='profile' element=<Profile auth={auth} /> />
          </Route>
          <Route path='/shopowner/' element=<PrivateRoute role="shopowner" />>
            <Route path='shop-owner-dash' element=<ShopOwnerDash auth={auth} /> />
            <Route path='profile' element=<Profile auth={auth} /> />
          </Route>
        </>}
        {/* <Route path='*' element=<Loader title="404 Error" msg={"Page Not Found"} redirectURL="/login" redirectText="Go to Sign In?" /> /> */}
        <Route path='*' element=<Loader title="Unauthorized Access / 404" msg={"You don't have Access to this Page!! OR There's no such page"} redirectURL="/login" redirectText="Go to Sign In?" /> />
      </Routes>
    </Router>
  )
}

export default App
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
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

function App() {

  return (
    <Router>
      <Navbar />
      <AuthBtns />
      <Routes>
        <Route path='/login' element=<Login /> />
        <Route path='/register' element=<Register /> />
        <Route path='/customer/' element=<PrivateRoute role="customer" />>
          <Route path='search-shop' element=<SearchShop /> />
          <Route path='shop' element=<Shop /> />
          <Route path='queues' element=<Queues /> />
          <Route path='profile' element=<Profile /> />
        </Route>
        <Route path='/employee/' element=<PrivateRoute role="employee" />>
          <Route path='counter' element=<ShopCounter /> />
          <Route path='employee-dash' element=<EmployeeDash /> />
          <Route path='profile' element=<Profile /> />
        </Route>
        <Route path='/shopowner/' element=<PrivateRoute role="shopowner" />>
          <Route path='shop-owner-dash' element=<ShopOwnerDash /> />
          <Route path='profile' element=<Profile /> />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
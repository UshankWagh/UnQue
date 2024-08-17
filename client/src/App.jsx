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

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/login' element=<Login /> />
        <Route path='/register' element=<Register /> />
        <Route path='/search-shop' element=<SearchShop /> />
        <Route path='/shop' element=<Shop /> />
        <Route path='/queues' element=<Queues /> />
        <Route path='/employee-dash' element=<EmployeeDash /> />
        <Route path='/counter' element=<ShopCounter /> />
        <Route path='/shop-owner-dash' element=<ShopOwnerDash /> />
        <Route path='/profile' element=<Profile /> />
      </Routes>
    </Router>
  )
}

export default App
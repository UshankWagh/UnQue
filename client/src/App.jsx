import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import EmployeeDash from './pages/EmployeeDash';
import Navbar from './components/Navbar';
import ShopOwnerDash from './pages/ShopOwnerDash';
import Profile from './pages/Profile';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/employee-dash' element=<EmployeeDash /> />
        <Route path='/counter' element=<EmployeeDash /> />
        <Route path='/shop-owner-dash' element=<ShopOwnerDash /> />
        <Route path='/profile' element=<Profile /> />
      </Routes>
    </Router>
  )
}

export default App

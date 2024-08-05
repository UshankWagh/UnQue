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
      </Routes>
    </Router>
  )
}

export default App
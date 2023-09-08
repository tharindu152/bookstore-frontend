import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Categories from './pages/other/Categories';
import SubCategories from './pages/other/SubCategories';
import Home from './pages/other/Home';
import Book from './pages/other/Book';
import Profile from './pages/other/Profile';
import Cart from './pages/other/Cart';
import CheckOut from './pages/other/CheckOut';
import Layout from './utils/Layout';
import './App.css';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='/categories/:id/books' element={<Categories />} />
              <Route
                path='/subcategories/:id/books'
                element={<SubCategories />}
              />
              <Route path='/books/:id' element={<Book />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<CheckOut />} />
              <Route path='/profile' element={<Profile />} />
            </Route>
          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

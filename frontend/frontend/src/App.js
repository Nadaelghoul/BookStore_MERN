import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import AdminLayout from './components/Admin/AdminLayout';
import AddBook from './components/Admin/AddBook';
import AllBooks from './components/Admin/AllBooks';
import UpdateBook from './components/Admin/UpdateBook';
import BookDetails from './pages/BookDetails';
import DiscountPercent from './components/DiscountPercent';
import OnSaleProducts from './components/OnSaleProducts';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import {AuthProvider} from './auth/AuthContext';
import { CartProvider } from './auth/CartContext';
import FeaturedProducts from './components/FeaturedProducts';


function App() {

  const location = useLocation()
  const hideHeader = /^\/admin(\/|$)/.test(location.pathname)

  return (
    <AuthProvider>
      <CartProvider>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element = {  <CartPage/>}/>
         <Route path="/featured" element = {  <FeaturedProducts/>}/>
        <Route path="/on-sale" element = {  <OnSaleProducts/>}/>
        <Route path="/discount" element = {  <DiscountPercent/>}/>
         <Route path="/bookDetails/:id" element = {  <BookDetails/>}/>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AllBooks />} />
          <Route path="add-book" element={<AddBook />} />
           <Route path="/admin/update-book/:id"  element={<UpdateBook/>} /> 
        </Route>
      </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

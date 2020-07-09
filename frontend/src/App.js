import React from 'react';
import data from './data';
import {BrowserRouter,Route,Link} from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import ProductsScreen from './Screens/ProductsScreen';
import CartScreen from './Screens/CartScreen';
import SigninScreen from './Screens/SigninScreen';
import './App.css';
import { useSelector } from 'react-redux';
import RegisterScreen from './Screens/registerScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';

function App() {
  const userSignin = useSelector(state=>state.userSignin);
  const {userInfo} = userSignin;
  const openMenu = () =>{
    document.querySelector(".sidebar").classList.add("open");
  }

  const closeMenu = () =>{
    document.querySelector(".sidebar").classList.remove("open");
  }

  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="header">
          <div className="brand">
              <button onClick={openMenu}>
                  &#9776;
              </button>
              <Link to="/">amazon</Link>
          </div>
          <div className="header-links">
              <a href="cart.html">Cart</a>
              {
                userInfo ? <Link to="/profile">{userInfo.name}</Link> : <Link to="/signin">Singin</Link>
              }
              
          </div>
      </header>
      <aside className="sidebar">
          <h3>Shooping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>x</button>
          <ul>
              <li>
                  <a href="index.html">Pants</a>
              </li>
              <li>
                  <a href="index.html">Shirt</a>
              </li>
          </ul>
      </aside>
      <main className="main">
        <div className="content">
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
        </div>
      </main>
      <footer className="footer">
          all right reserved
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;

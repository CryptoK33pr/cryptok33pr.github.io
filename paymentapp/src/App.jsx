import { supabase } from './supabaseClient';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Cart from './components/Cart';
import PaymentDetails from './components/PaymentDetails';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentError from './components/PaymentError';
import Footer from './components/Footer';
import Hero from './components/Hero';
import './style.css';

const TAX_RATE = 0.06625;

function isValidComponent(Component) {
  return typeof Component === 'function' || (typeof Component === 'object' && Component !== null && Component.$$typeof);
}

function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [ethPrice, setEthPrice] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchETHPrice();
    fetchMenuItems();
  }, []);

  async function fetchETHPrice() {
    try {
      const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
      const data = await response.json();
      setEthPrice(data.ethereum.usd);
    } catch (err) {
      setEthPrice(0);
    }
  }

  async function fetchMenuItems() {
    try {
      const { data, error } = await supabase
        .from('CafeItems')
        .select('*')
        .order('id', { ascending: true });
      if (error) throw error;
      setMenuItems(data);
    } catch (error) {
      setMenuItems([]);
    }
  }

  function addItemToCart(item, milkChoice, shotChoice) {
    const cartItem = {
      cartItemId: Date.now().toString() + Math.floor(Math.random() * 1000),
      ...item,
      milk: milkChoice,
      shots: shotChoice || 0,
    };
    setCart([...cart, cartItem]);
  }

  function removeItemFromCart(cartItemId) {
    setCart(cart.filter(item => item.cartItemId !== cartItemId));
  }

  function getCartTotalUSD() {
    let subtotal = 0;
    cart.forEach(item => {
      let itemTotal = item.price;
      if (item.milk === 'almond') itemTotal += item.almond_upcharge || 0;
      else if (item.milk === 'oat') itemTotal += item.oat_upcharge || 0;
      itemTotal += (item.shots || 0) * (item.shot_upcharge || 0);
      subtotal += itemTotal;
    });
    return subtotal + subtotal * TAX_RATE;
  }

  if (!isValidComponent(Header)) return <div>Header component is not valid. Check its export.</div>;
  if (!isValidComponent(Menu)) return <div>Menu component is not valid. Check its export.</div>;
  if (!isValidComponent(Cart)) return <div>Cart component is not valid. Check its export.</div>;
  if (!isValidComponent(PaymentDetails)) return <div>PaymentDetails component is not valid. Check its export.</div>;
  if (!isValidComponent(PaymentSuccess)) return <div>PaymentSuccess component is not valid. Check its export.</div>;
  if (!isValidComponent(PaymentError)) return <div>PaymentError component is not valid. Check its export.</div>;
  if (!isValidComponent(Footer)) return <div>Footer component is not valid. Check its export.</div>;

  return (
    <>
      <Header />
      <Hero />
      <main>
        <div className="container">
          <Menu
            menuItems={menuItems}
            addItemToCart={addItemToCart}
          />
          <Cart
            cart={cart}
            removeItemFromCart={removeItemFromCart}
            ethPrice={ethPrice}
          />
        </div>
        {paymentStatus === 'success' && <PaymentSuccess />}
        {paymentStatus === 'error' && <PaymentError message={errorMsg} />}
      </main>
      <Footer />
    </>
  );
}

export default App;

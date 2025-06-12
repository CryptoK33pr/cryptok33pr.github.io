import React from 'react';
import WalletConnectButton from './WalletConnectButton';

const TAX_RATE = 0.06625;

function Cart({
  cart,
  removeItemFromCart,
  ethPrice,
}) {
  if (!cart.length) {
    return (
      <div className="cart">
        <h2>Cart</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  // Calculate subtotal, tax, and total
  let subtotal = 0;
  cart.forEach(item => {
    let itemTotal = Number(item.price) || 0;
    if (item.milk === 'almond') itemTotal += Number(item.almond_upcharge) || 0;
    else if (item.milk === 'oat') itemTotal += Number(item.oat_upcharge) || 0;
    itemTotal += (Number(item.shots) || 0) * (Number(item.shot_upcharge) || 0);
    subtotal += itemTotal;
  });
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  const totalInEth = ethPrice > 0 ? total / ethPrice : 0;

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul className="cart-items">
        {cart.map(item => {
          const milkUpcharge =
            item.milk === 'almond'
              ? Number(item.almond_upcharge) || 0
              : item.milk === 'oat'
              ? Number(item.oat_upcharge) || 0
              : 0;
          const shotsUpcharge = (Number(item.shots) || 0) * (Number(item.shot_upcharge) || 0);

          return (
            <li className="cart-item" key={item.cartItemId}>
              <div className="cart-item-details">
                <div className="cart-item-name">
                  <strong>{item.name}</strong>
                </div>
                <div>
                  Base: ${Number(item.price).toFixed(2)}
                  {item.milk && (
                    <div>
                      Milk: {item.milk}
                      {milkUpcharge > 0 && (
                        <span> (+${milkUpcharge.toFixed(2)})</span>
                      )}
                    </div>
                  )}
                  {Number(item.shots) > 0 && (
                    <div>
                      Extra shots: {item.shots}
                      {Number(item.shot_upcharge) > 0 && (
                        <span>
                          {' '}
                          (+${shotsUpcharge.toFixed(2)})
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <button
                className="button remove-item"
                onClick={() => removeItemFromCart(item.cartItemId)}
              >
                Remove
              </button>
            </li>
          );
        })}
      </ul>
      <div className="cart-totals">
        <div>Subtotal: ${subtotal.toFixed(2)}</div>
        <div>Jersey City Tax (6.625%): ${tax.toFixed(2)}</div>
        <div>Total: ${total.toFixed(2)}</div>
        <div>
          Total in SepoliaETH: {ethPrice > 0 ? totalInEth.toFixed(6) : 'N/A'}
        </div>
      </div>
      <div className="cart-actions">
        <WalletConnectButton amountEth={totalInEth.toFixed(6)} />
      </div>
    </div>
  );
}

export default Cart;

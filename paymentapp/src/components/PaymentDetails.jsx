import React from 'react';

function PaymentDetails({ cartTotalUSD, ethAmount, receiverAddress }) {
  // Ensure cartTotalUSD is a valid number
  const totalUSD =
    typeof cartTotalUSD === 'number' && !isNaN(cartTotalUSD)
      ? cartTotalUSD
      : 0;

  return (
    <div className="payment-details">
      <h3>Payment Details</h3>
      <p>
        <strong>Total:</strong> ${totalUSD.toFixed(2)} USD
      </p>
      <p>
        <strong>Amount to pay:</strong> {ethAmount} ETH
      </p>
      <p>
        <strong>Paying to:</strong> {receiverAddress}
      </p>
    </div>
  );
}

export default PaymentDetails;

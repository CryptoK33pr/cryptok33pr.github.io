import React from 'react';

function PaymentErrors({ error }) {
  if (!error) return null;

  // Extract and translate common crypto payment errors
  let message = error?.message || 'An unknown error occurred during payment.';

  if (message.toLowerCase().includes('user rejected')) {
    message = 'You rejected the transaction in your wallet. Please try again if you wish to complete the payment.';
  } else if (message.toLowerCase().includes('insufficient funds')) {
    message = 'Your wallet does not have enough ETH to complete this payment.';
  } else if (message.toLowerCase().includes('network')) {
    message = 'There was a network issue. Please check your connection and try again.';
  }

  return (
    <div className="payment-error" style={{ color: '#b00020', marginTop: 12 }}>
      <strong>Payment Error:</strong> {message}
    </div>
  );
}

export default PaymentErrors;

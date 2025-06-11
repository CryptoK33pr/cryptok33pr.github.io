import React from 'react';

function PaymentSuccess({ txHash, chain = 'sepolia' }) {
  if (!txHash) return null;

  // Block explorer URL for Sepolia (default) or mainnet
  const explorerBase =
    chain === 'sepolia'
      ? 'https://sepolia.etherscan.io/tx/'
      : 'https://etherscan.io/tx/';

  return (
    <div className="payment-success" style={{ color: '#0a8f08', marginTop: 12 }}>
      <strong>Payment Successful!</strong>
      <div>
        Your transaction has been sent and is being processed.
        <br />
        <a
          href={`${explorerBase}${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#0a8f08', textDecoration: 'underline' }}
        >
          View on Etherscan
        </a>
      </div>
    </div>
  );
}

export default PaymentSuccess;

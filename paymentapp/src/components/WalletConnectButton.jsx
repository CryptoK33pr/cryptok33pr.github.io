import React from 'react';
import { useConnect, useAccount, useDisconnect, useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';

export default function WalletConnectButton({ amountEth }) {
  const { connectors, connect } = useConnect();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { sendTransaction, isLoading, isSuccess, error, data } = useSendTransaction();

  // Receiver address from .env
  const receiver = import.meta.env.VITE_RECEIVER_WALLET_ADDRESS;

  // Use only the WalletConnect connector
  const walletConnectConnector = connectors.find(
    (connector) =>
      connector.id === 'walletConnect' ||
      connector.name === 'WalletConnect' ||
      connector.name === 'WalletConnectConnector'
  );

  // Handler for sending ETH payment
  const handlePay = () => {
    if (!sendTransaction || !amountEth || Number(amountEth) <= 0) return;
    sendTransaction({
      to: receiver,
      value: parseEther(amountEth), // ETH string to WEI (BigInt)
    });
  };

  if (!walletConnectConnector) {
    return <div>WalletConnect is not configured.</div>;
  }

  if (!isConnected) {
    return (
      <button
        className="cart-action"
        onClick={() => connect({ connector: walletConnectConnector })}
      >
        Connect Wallet
      </button>
    );
  }

  // Connected: show pay and disconnect
  return (
    <div>
      <span style={{ fontSize: 14 }}>Connected: {address}</span>
      <button
        className="cart-action"
        onClick={handlePay}
        disabled={isLoading || !amountEth || Number(amountEth) <= 0}
        style={{ marginLeft: 8 }}
      >
        {isLoading ? 'Processing...' : `Pay SepoliaETH (${amountEth})`}
      </button>
      <button
        className="cart-action"
        onClick={() => disconnect()}
        style={{ marginLeft: 8 }}
      >
        Disconnect Wallet
      </button>
      {isSuccess && <div>Payment sent! Tx: {data?.hash}</div>}
      {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
    </div>
  );
}

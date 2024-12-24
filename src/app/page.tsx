'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Head from 'next/head';
import Link from 'next/link';
import { useCallback } from 'react';

const Home = () => {
  const { publicKey, connected, disconnect } = useWallet();

  const handleDisconnect = useCallback(async () => {
    await disconnect();
    localStorage.removeItem('walletName');
  }, [disconnect]);

  return (
    <>
      <Head>
        <title>RoboCoin ATM</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-custom-bg bg-cover bg-center text-foreground font-sans p-4">
        <h1 className="mb-8 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-color to-secondary-color">
          RoboCoin ATM
        </h1>
        <div className="relative flex w-[90%] max-w-[1200px] h-[80vh] border border-gray-700 rounded-xl bg-black bg-opacity-60 shadow-xl backdrop-blur-md">
          {/* Left Buttons */}
          <div className="flex flex-col justify-around items-end w-28 py-4 space-y-4">
            <Link href="/" className="atm-modern-button">Home</Link>
            <Link href="/check-balance" className="atm-modern-button">Check Balance</Link>
            <Link href="/deposit-withdraw" className="atm-modern-button">Deposit / Withdraw</Link>
            <Link href="/transfer" className="atm-modern-button">Transfer Funds</Link>
          </div>

          {/* Main Screen */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-4">
            <h2 className="mb-4 text-3xl font-bold text-primary-color">Welcome to RoboCoin</h2>
            <p className="text-center mb-6 text-gray-300">
              Please connect your wallet to start using RoboCoin services.
            </p>
            <WalletMultiButton />
            {connected && (
              <div className="mt-6 text-center">
                <p className="text-gray-300 mb-2">Connected: {publicKey?.toBase58() || 'N/A'}</p>
                <button
                  onClick={handleDisconnect}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  aria-label="Disconnect Wallet"
                >
                  Disconnect Wallet
                </button>
              </div>
            )}
          </div>

          {/* Right Buttons */}
          <div className="flex flex-col justify-around items-start w-28 py-4 space-y-4">
            <Link href="/transaction-history" className="atm-modern-button">Transaction History</Link>
            <Link href="/account-management" className="atm-modern-button">Account Management</Link>
            <Link href="/quick-actions" className="atm-modern-button">Quick Actions</Link>
            <Link href="/donate" className="atm-modern-button">Donate</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

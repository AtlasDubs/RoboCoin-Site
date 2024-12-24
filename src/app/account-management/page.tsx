'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import ATMLayout from '@/app/components/ATMLayout';
import { useCallback } from 'react';

const AccountManagement = () => {
  const { publicKey, connected, disconnect } = useWallet();

  const handleDisconnect = useCallback(async () => {
    await disconnect();
    localStorage.removeItem('walletName');
  }, [disconnect]);

  return (
    <ATMLayout title="Account Management">
      <div className="w-full bg-neutral-800 border border-gray-700 rounded-lg p-4">
        <h3 className="text-xl font-bold text-gray-200">Connected Wallet</h3>
        {connected ? (
          <div>
            <p className="text-gray-300 mt-2">Address: {publicKey?.toBase58()}</p>
            <button
              onClick={handleDisconnect}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Disconnect Wallet
            </button>
          </div>
        ) : (
          <p className="text-gray-400 mt-2">No wallet connected.</p>
        )}
      </div>
    </ATMLayout>
  );
};

export default AccountManagement;

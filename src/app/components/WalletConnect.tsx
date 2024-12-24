'use client';

import dynamic from 'next/dynamic';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useCallback, useState } from 'react';

// Dynamically import WalletMultiButton
const WalletMultiButtonDynamic = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

const WalletConnect = () => {
  const { publicKey, connected, disconnect, select } = useWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Clear any preselected wallet
    localStorage.removeItem('walletName');
    select(null);
  }, [select]);

  const handleDisconnect = useCallback(async () => {
    await disconnect();
    localStorage.removeItem('walletName');
  }, [disconnect]);

  if (!mounted) {
    return <p className="text-gray-400">Loading...</p>; // Prevent hydration issues
  }

  return (
    <div className="text-center">
      <WalletMultiButtonDynamic />
      {connected && (
        <div>
          <p className="mt-2 text-gray-300">
            Connected: {publicKey?.toBase58() || 'N/A'}
          </p>
          <button
            onClick={handleDisconnect}
            className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            aria-label="Disconnect Wallet"
          >
            Disconnect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;

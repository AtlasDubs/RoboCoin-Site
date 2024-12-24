'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
import ATMLayout from '@/app/components/ATMLayout';
import { useWalletBalances } from '@/hooks/useWalletBalances';

const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com');

const CheckBalance = () => {
  const { publicKey, connected } = useWallet();
  const { balances, loading, error } = useWalletBalances(publicKey, connection);

  if (!connected) {
    return (
      <ATMLayout title="Check Balance">
        <p className="text-gray-400">No wallet connected.</p>
      </ATMLayout>
    );
  }

  if (loading) {
    return (
      <ATMLayout title="Check Balance">
        <p className="text-gray-300">Fetching balances...</p>
      </ATMLayout>
    );
  }

  if (error) {
    return (
      <ATMLayout title="Check Balance">
        <p className="text-red-500">{error}</p>
      </ATMLayout>
    );
  }

  return (
    <ATMLayout title="Check Balance">
      <p className="text-gray-300">RoboCoin Balance: {balances.RoboCoin || 0} RC</p>
      <h4 className="text-lg font-bold text-gray-200 mt-4">Other Tokens:</h4>
      {balances.otherTokens.length > 0 ? (
        <ul className="text-gray-300 list-disc pl-4">
          {balances.otherTokens.map((token, index) => (
            <li key={index}>
              Mint: {token.mint}, Balance: {token.balance}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No other tokens found.</p>
      )}
    </ATMLayout>
  );
};

export default CheckBalance;

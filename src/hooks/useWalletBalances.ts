import { useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { connection } from '@/app/WalletContextProvider/WalletContextProvider'; // Centralized connection

interface Balances {
  RoboCoin?: number;
  otherTokens: { mint: string; balance: number }[];
}

export const useWalletBalances = (publicKey: PublicKey | null) => {
  const [balances, setBalances] = useState<Balances>({ otherTokens: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    if (!publicKey) {
      setBalances({ otherTokens: [] });
      setLoading(false);
      return;
    }

    const fetchBalances = async () => {
      setLoading(true);
      setError(null);

      try {
        const roboCoinMint = new PublicKey('8nzCP3xmkpKAq2un87d6Jgg4r3JnvgUSkFemfLbFpump');

        console.log('Fetching balances for:', publicKey.toBase58());

        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, { mint: roboCoinMint });
        const roboCoinBalance =
          tokenAccounts.value.length > 0
            ? parseFloat(tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmountString)
            : 0;

        const allTokens = await connection.getParsedTokenAccountsByOwner(publicKey, {
          programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
        });

        const otherTokens = allTokens.value.map(({ account }) => ({
          mint: account.data.parsed.info.mint,
          balance: parseFloat(account.data.parsed.info.tokenAmount.uiAmountString),
        }));

        if (!isCancelled) {
          setBalances({ RoboCoin: roboCoinBalance, otherTokens });
        }
      } catch (error) {
        console.error('Failed to fetch balances:', error);
        if (!isCancelled) {
          setError('Failed to fetch balances.');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchBalances();

    return () => {
      isCancelled = true;
    };
  }, [publicKey]);

  return { balances, loading, error };
};

import { useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { connection } from '@/app/WalletContextProvider/WalletContextProvider';

interface TokenAccount {
  mint: string;
  balance: number;
}

interface Balances {
  RoboCoin?: number;
  otherTokens: TokenAccount[];
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

        // Fetch RoboCoin balance
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, { mint: roboCoinMint });
        const roboCoinBalance =
          tokenAccounts.value.length > 0
            ? parseFloat(tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmountString)
            : 0;

        // Fetch all token balances
        const allTokens = await connection.getParsedTokenAccountsByOwner(publicKey, {
          programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
        });

        const otherTokens = allTokens.value.map(({ account }: any) => ({
          mint: account.data.parsed.info.mint,
          balance: parseFloat(account.data.parsed.info.tokenAmount.uiAmountString),
        }));

        if (!isCancelled) {
          setBalances({ RoboCoin: roboCoinBalance, otherTokens });
        }
      } catch (error) {
        console.error('Failed to fetch balances:', error);
        if (!isCancelled) {
          setError('Failed to fetch balances. Please try again later.');
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

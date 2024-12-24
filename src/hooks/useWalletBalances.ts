import { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

interface Balances {
  RoboCoin?: number;
  otherTokens: { mint: string; balance: number }[];
}

export const useWalletBalances = (publicKey: PublicKey | null, connection: Connection) => {
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

        console.log('Fetching balances for publicKey:', publicKey.toBase58());

        // Test RPC connection
        const version = await connection.getVersion();
        console.log('RPC Connection successful. Solana version:', version);

        // Fetch RoboCoin balance
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, { mint: roboCoinMint });
        console.log('Token accounts for RoboCoin:', tokenAccounts);

        const roboCoinBalance =
          tokenAccounts.value.length > 0
            ? parseFloat(tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmountString)
            : 0;

        console.log('RoboCoin balance:', roboCoinBalance);

        // Fetch all token balances
        const allTokens = await connection.getParsedTokenAccountsByOwner(publicKey, {
          programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
        });

        console.log('All token accounts:', allTokens);

        const otherTokens = allTokens.value.map(({ account }) => ({
          mint: account.data.parsed.info.mint,
          balance: parseFloat(account.data.parsed.info.tokenAmount.uiAmountString),
        }));

        console.log('Other tokens:', otherTokens);

        if (!isCancelled) {
          setBalances({ RoboCoin: roboCoinBalance, otherTokens });
        }
      } catch (error) {
        console.error('Error fetching balances:', error);
        if (!isCancelled) {
          setError('Failed to fetch balances.');
          setBalances({ otherTokens: [] });
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
  }, [publicKey, connection]);

  return { balances, loading, error };
};

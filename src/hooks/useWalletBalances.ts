import { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

interface Balances {
  RoboCoin?: number;
  otherTokens: { mint: string; balance: number }[];
}

export const useWalletBalances = (publicKey: PublicKey | null, connection: Connection) => {
  const [balances, setBalances] = useState<Balances>({ otherTokens: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!publicKey) {
      setBalances({ otherTokens: [] });
      setLoading(false);
      return;
    }

    const fetchBalances = async () => {
      setLoading(true);

      try {
        const roboCoinMint = new PublicKey('8nzCP3xmkpKAq2un87d6Jgg4r3JnvgUSkFemfLbFpump');

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

        setBalances({ RoboCoin: roboCoinBalance, otherTokens });
      } catch (error) {
        console.error('Error fetching balances:', error);
        setBalances({ otherTokens: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchBalances();
  }, [publicKey, connection]);

  return { balances, loading };
};

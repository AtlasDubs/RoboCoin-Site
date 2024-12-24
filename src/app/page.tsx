'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import ATMLayout from '@/app/components/ATMLayout';
import { useCallback } from 'react';

const Home = () => {
  const { publicKey, connected, disconnect } = useWallet();

  const handleDisconnect = useCallback(async () => {
    await disconnect();
    localStorage.removeItem('walletName');
  }, [disconnect]);

  return (
    <ATMLayout title="Welcome to RoboCoin">
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-6 py-4">
        <p className="text-center mb-6 text-gray-300">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea repellendus praesentium optio maiores odit. Odit accusantium sapiente deserunt fugit, repellendus expedita delectus, aut hic pariatur aliquam enim earum reiciendis distinctio. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam nulla exercitationem praesentium dolorum incidunt sint consequuntur, quia tempora corrupti voluptatibus quasi tenetur aspernatur debitis esse obcaecati quos suscipit. Quaerat, temporibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium cum pariatur dolorum cumque nisi. Accusamus, ea nesciunt impedit sed repellat consectetur, pariatur sequi fuga fugiat veritatis nulla suscipit quas eum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quibusdam distinctio sint natus perferendis, quidem aliquid at! Fuga sunt iusto sequi, praesentium natus sit, magnam obcaecati ratione aspernatur minima adipisci?
        </p>
        <p className="text-center mb-6 text-gray-300">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea repellendus praesentium optio maiores odit. Odit accusantium sapiente deserunt fugit, repellendus expedita delectus, aut hic pariatur aliquam enim earum reiciendis distinctio. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam nulla exercitationem praesentium dolorum incidunt sint consequuntur, quia tempora corrupti voluptatibus quasi tenetur aspernatur debitis esse obcaecati quos suscipit. Quaerat, temporibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium cum pariatur dolorum cumque nisi. Accusamus, ea nesciunt impedit sed repellat consectetur, pariatur sequi fuga fugiat veritatis nulla suscipit quas eum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quibusdam distinctio sint natus perferendis, quidem aliquid at! Fuga sunt iusto sequi, praesentium natus sit, magnam obcaecati ratione aspernatur minima adipisci?
        </p>
        <p className="text-center mb-6 text-gray-300">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea repellendus praesentium optio maiores odit. Odit accusantium sapiente deserunt fugit, repellendus expedita delectus, aut hic pariatur aliquam enim earum reiciendis distinctio. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam nulla exercitationem praesentium dolorum incidunt sint consequuntur, quia tempora corrupti voluptatibus quasi tenetur aspernatur debitis esse obcaecati quos suscipit. Quaerat, temporibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium cum pariatur dolorum cumque nisi. Accusamus, ea nesciunt impedit sed repellat consectetur, pariatur sequi fuga fugiat veritatis nulla suscipit quas eum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quibusdam distinctio sint natus perferendis, quidem aliquid at! Fuga sunt iusto sequi, praesentium natus sit, magnam obcaecati ratione aspernatur minima adipisci?
        </p>
        <p className="text-center mb-6 text-gray-300">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea repellendus praesentium optio maiores odit. Odit accusantium sapiente deserunt fugit, repellendus expedita delectus, aut hic pariatur aliquam enim earum reiciendis distinctio. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam nulla exercitationem praesentium dolorum incidunt sint consequuntur, quia tempora corrupti voluptatibus quasi tenetur aspernatur debitis esse obcaecati quos suscipit. Quaerat, temporibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium cum pariatur dolorum cumque nisi. Accusamus, ea nesciunt impedit sed repellat consectetur, pariatur sequi fuga fugiat veritatis nulla suscipit quas eum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quibusdam distinctio sint natus perferendis, quidem aliquid at! Fuga sunt iusto sequi, praesentium natus sit, magnam obcaecati ratione aspernatur minima adipisci?
        </p>
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
    </ATMLayout>
  );
};

export default Home;

'use client';

import Link from 'next/link';

interface ATMLayoutProps {
  title: string;
  children: React.ReactNode;
}

const ATMLayout: React.FC<ATMLayoutProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-custom-bg text-gray-200 p-4">
      {/* Header */}
      <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-color to-secondary-color text-center mb-6">
        RoboCoin ATM
      </h1>

      {/* ATM Screen Container */}
      <div className="relative flex flex-col w-[90%] md:w-[60%] max-w-5xl h-[80vh] mx-auto border border-gray-700 rounded-xl bg-black bg-opacity-60 shadow-xl backdrop-blur-md md:flex-row">
        {/* Left Buttons (Only on larger screens) */}
        <div className="hidden md:flex flex-col justify-around items-end w-28 py-4 space-y-4">
          <Link href="/" className="atm-modern-button">Home</Link>
          <Link href="/check-balance" className="atm-modern-button">Check Balance</Link>
          <Link href="/deposit-withdraw" className="atm-modern-button">Deposit / Withdraw</Link>
          <Link href="/transfer" className="atm-modern-button">Transfer Funds</Link>
        </div>

        {/* Main ATM Screen */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-4">
          <h2 className="text-xl md:text-3xl font-bold text-primary-color mb-4">{title}</h2>
          {children}
        </div>

        {/* Right Buttons (Only on larger screens) */}
        <div className="hidden md:flex flex-col justify-around items-start w-28 py-4 space-y-4">
          <Link href="/transaction-history" className="atm-modern-button">Transaction History</Link>
          <Link href="/account-management" className="atm-modern-button">Account Management</Link>
          <Link href="/quick-actions" className="atm-modern-button">Quick Actions</Link>
          <Link href="/donate" className="atm-modern-button">Donate</Link>
        </div>
      </div>

      {/* Buttons (Stacked vertically on smaller screens) */}
      <div className="flex md:hidden flex-col justify-center gap-4 mt-6">
        <Link href="/" className="atm-modern-button w-full">Home</Link>
        <Link href="/check-balance" className="atm-modern-button w-full">Check Balance</Link>
        <Link href="/deposit-withdraw" className="atm-modern-button w-full">Deposit / Withdraw</Link>
        <Link href="/transfer" className="atm-modern-button w-full">Transfer Funds</Link>
        <Link href="/transaction-history" className="atm-modern-button w-full">Transaction History</Link>
        <Link href="/account-management" className="atm-modern-button w-full">Account Management</Link>
        <Link href="/quick-actions" className="atm-modern-button w-full">Quick Actions</Link>
        <Link href="/donate" className="atm-modern-button w-full">Donate</Link>
      </div>
    </div>
  );
};

export default ATMLayout;

import React from "react";
import Card from '../../../components/card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-5xl font-bold tracking-tight text-gray-400">
        Welcome, claimants
      </h1>
      <h2 className="text-3xl tracking-tight text-gray-500">
        Select airdrop to claim
      </h2>
      <div className="w-52 mx-auto mt-4">
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Connect wallet
        </button>
      </div>
      <div className="flex flex-wrap w-5/6 mx-auto mt-4">
        <Card
          id="1"
          token="0xe09B8661D80CF24dB230A167969d18B94a5a3266"
          amount="10,000.00"
          buttonText="Claim"
        />
        <Card
          id="1"
          token="0xe09B8661D80CF24dB230A167969d18B94a5a3266"
          amount="10,000.00"
          buttonText="Claim"
        />
        <Card
          id="1"
          token="0xe09B8661D80CF24dB230A167969d18B94a5a3266"
          amount="10,000.00"
          buttonText="Claim"
        />
        {/* Add more Card components here as needed */}
      </div>
    </main>
  );
}
"use client";

import React, { useEffect, useState } from "react";
import Card from '../../components/card';
import { ConnectWallet, Web3Button, useContractRead, useContractEvents, useContract, useAddress } from "@thirdweb-dev/react";
import { fetchProofs } from "../../hooks/claimAirdrop";
import { expressAmountFrom18Decimals } from "../../hooks/registerAirdrop";

function hexToString (hex: string) {
  return parseInt(hex, 16).toString();
}

export default function Home() {
  const wallet = useAddress();
  const proofs = fetchProofs()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-5xl font-bold tracking-tight text-gray-400">
        Welcome, claimants
      </h1>
      <h2 className="text-3xl tracking-tight text-gray-500">
        Select airdrop to claim
      </h2>
      <div className="mt-4">
        <ConnectWallet
          theme="dark"
          btnTitle="Connect Wallet"
          className="hover:bg-red-400"
        />
      </div>
      <div className="flex flex-wrap w-5/6 mx-auto mt-4">
      {
        proofs.length > 0 ? (
          proofs.map(proof => (
            proof.airdrops.map(airdrop => (
              <Card
                key={airdrop.id}
                id={airdrop.id.toString()}
                token={airdrop.tokenAddress}
                amount={expressAmountFrom18Decimals(hexToString(proof.claims.amount), airdrop.tokenDecimal)}
                buttonText={"Claim"}
                proof={[airdrop.id, proof.claims.index, wallet, hexToString(proof.claims.amount), proof.claims.proof]}
              />
            ))
          ))
        ) : (
          <>
            <Card
              id="1"
              token="0xe09B8661D80CF24dB230A167969d18B94a5a3266"
              amount="Test only - 10,000.00"
              buttonText="Connect wallet or nothing to claim yet"
            />
            <Card
              id="2"
              token="0xe09B8661D80CF24dB230A167969d18B94a5a3266"
              amount="Test only - 10,000.00"
              buttonText="Connect wallet or nothing to claim yet"
            />
            <Card
              id="3"
              token="0xe09B8661D80CF24dB230A167969d18B94a5a3266"
              amount="Test only - 10,000.00"
              buttonText="Connect wallet or nothing to claim yet"
            />
          </>
        )
      }
      </div>
    </main>
  );
}
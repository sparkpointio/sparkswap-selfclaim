"use client";

import React from "react";
import Card from "../../components/card";
import {
  ConnectWallet,
  useAddress,
  useContractRead,
} from "@thirdweb-dev/react";
import { fetchProofs } from "../../hooks/claimAirdrop";
import { expressAmountFrom18Decimals } from "../../hooks/registerAirdrop";

function hexToString(hex: string) {
  return parseInt(hex, 16).toString();
}

export default function ClaimPage() {
  const wallet = useAddress();
  const proofs = fetchProofs();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background1">
      <h1 className="text-5xl font-bold tracking-tight text-text1">
        Welcome, claimants
      </h1>
      <h2 className="text-3xl tracking-tight text-text2">
        Select airdrop to claim
      </h2>
      <div className="mt-4">
        <ConnectWallet
          theme="dark"
          btnTitle="Connect Wallet"
          className="hover:bg-accent1"
        />
      </div>
      <div className="flex flex-col max-w-screen-md w-full mx-auto mt-4">
        {proofs.length > 0 ? (
          proofs.map((proof) =>
            proof.airdrops.map((airdrop) => (
              <div
                key={airdrop.id}
                className="mb-4 p-6 rounded-lg shadow-lg hover:bg-background3 cursor-pointer transition duration-300"
              >
                <Card
                  id={airdrop.id.toString()}
                  token={airdrop.tokenAddress}
                  amount={expressAmountFrom18Decimals(
                    hexToString(proof.claims.amount),
                    airdrop.tokenDecimal
                  )}
                  buttonText={"Claim"}
                  proof={[
                    airdrop.id,
                    proof.claims.index,
                    wallet,
                    hexToString(proof.claims.amount),
                    proof.claims.proof,
                  ]}
                />
              </div>
            ))
          )
        ) : (
          <>
            <div className="mb-4 p-6 rounded-lg shadow-lg hover:bg-background3 cursor-pointer transition duration-300">
              <Card
                id="1"
                token="0xe09B8661D80CF24dB230A167969d18B94a5a3266"
                amount="Test only - 10,000.00"
                buttonText="Connect wallet or nothing to claim yet"
              />
            </div>
            <div className="mb-4 p-6 rounded-lg shadow-lg hover:bg-background3 cursor-pointer transition duration-300">
              <Card
                id="2"
                token="0xe09B8661D80CF24dB230A167969d18B94a5a3266"
                amount="Test only - 10,000.00"
                buttonText="Connect wallet or nothing to claim yet"
              />
            </div>
            <div className="mb-4 p-6 rounded-lg shadow-lg hover:bg-background3 cursor-pointer transition duration-300">
              <Card
                id="3"
                token="0xe09B8661D80CF24dB230A167969d18B94a5a3266"
                amount="Test only - 10,000.00"
                buttonText="Connect wallet or nothing to claim yet"
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}

"use client";

import React, {useEffect, useState} from "react";
import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractEvents,
  useContractRead,
  Web3Button,
} from "@thirdweb-dev/react";
import {NavigationMenu} from "@/src/resources/components/NavigationMenu";
import {navigationLinks} from "../index";
import {expressAmountFrom18Decimals, expressAmountWith18Decimals} from "@/src/library/utils/bignumber.utils";
import {formatRecipientsForMerkle} from "@/src/library/utils/merkle.utils";
import {uploadMerkle} from "@/src/library/hooks/useMerkle";
import selfclaim from "@/src/library/constants/contracts/selfclaim.constants";
import {erc20ABI} from "@/src/library/constants/contracts/token.constants";

interface AddressAmount {
  address: string;
  amount: string;
}

export default function Home() {
  // User's connected wallet address
  const wallet = useAddress();

  // Form default values and value holders
  const [tokenAddress, setTokenAddress] = useState(
    "0xe09B8661D80CF24dB230A167969d18B94a5a3266"
  );
  const [address, setAddress] = useState(
    "0x373233a38ae21cf0c4f9de11570e7d5aa6824a1e, 145 \n0x8A672715e042f6e9d9B25C2ce9F84210e8206EF1, 1.069 \n0xC4515C02c334155bc60d86BD6F1119f58ea136e2, 10.81 \n0xe270bc73d658cbd72f721cb8c649aebf91b98d2b, 0.058"
  );

  // Use contract for selfclaim airdrop contract
  const airdropContract = useContract(selfclaim.address);

  // Use contract for ERC20 contract
  const tokenContract = useContract(tokenAddress);

  // Contract Reader for token decimals
  const tokenContractRead = useContractRead(tokenContract.contract, "decimals");

  // Event listeners for Token approval events
  const [lastReadApprovalEvent, setLastReadApprovalEvent] = useState(0);
  const tokenEvents = useContractEvents(tokenContract.contract, "Approval", {
    queryFilter: {
      filters: {
        owner: wallet,
        spender: selfclaim.address,
      },
      order: "desc", // Order of events ("asc" or "desc")
    },
    subscribe: true, // Subscribe to new events
  });

  useEffect(() => {
    if (tokenEvents.data && tokenEvents.data.length > lastReadApprovalEvent) {
      try {
        setLastReadApprovalEvent(tokenEvents.data.length);
        const approved = expressAmountFrom18Decimals(
          tokenEvents.data[0].data.value.toString(),
          tokenContractRead.data.toString()
        );
        alert(`Token approved with allowance ${approved}`);
      } catch (e) {
        console.log(e);
      }
    }
  }, [lastReadApprovalEvent, setLastReadApprovalEvent, tokenContractRead.data, tokenEvents]);

  // Event listeners for Create events
  const [lastReadEvent, setLastReadEvent] = useState(0);
  const airdropEvents = useContractEvents(airdropContract.contract, "Create", {
    queryFilter: {
      filters: {
        projectOwner: wallet, // e.g. Only events where tokenId = 123
      },
      order: "desc", // Order of events ("asc" or "desc")
    },
    subscribe: true, // Subscribe to new events
  });

  useEffect(() => {
    try {
      if (airdropEvents.data && airdropEvents.data.length > lastReadEvent) {
        setLastReadEvent(airdropEvents.data.length);
        alert(
          `Self-claim airdrop created, ID #${airdropEvents.data[0].data.id.toString()}`
        );
      }
    } catch (e) {
      console.log(e);
    }
  }, [lastReadEvent, setLastReadEvent, airdropEvents]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background3 mt-12">
      <NavigationMenu navigationLinks={navigationLinks}/>
      <h1 className="text-5xl font-bold tracking-tight text-text1">
        Welcome, Airdrop Creators
      </h1>
      <h2 className="text-3xl tracking-tight text-text2">
        Create a Self-Claim Airdrop
      </h2>
      <div className="mt-4">
        <ConnectWallet
          theme="dark"
          btnTitle="Connect Wallet"
          className="hover:bg-accent1"
        />
      </div>
      <div className="w-5/6 mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-medium text-text1">
            Token Address
          </label>
          <input
            type="text"
            id="tokenAddress"
            className="w-full px-3 py-2 border border-accent2 rounded-md text-text2 bg-background2"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            placeholder="Enter token address..."
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="message"
            className="block mb-2 font-medium text-text1"
          >
            List of Addresses in CSV
          </label>
          <textarea
            id="message"
            className="w-full px-3 py-2 border border-accent2 rounded-md text-text2 bg-background2"
            rows={4}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4 w-full">
          <Web3Button
            contractAddress={tokenAddress}
            contractAbi={erc20ABI}
            action={async (contract) => {
              await contract.call("approve", [
                selfclaim.address,
                "1000000000000000000",
              ]);
            }}
            onSuccess={(result) => alert("Token approval submitted")}
            onError={(error) =>
              alert("Something went wrong (Approving tokens)!")
            }
            className="bg-accent1 hover:bg-accent2"
          >
            Approve selfclaim
          </Web3Button>
        </div>
        <div className="mb-4 w-full">
          <Web3Button
            contractAddress={selfclaim.address}
            contractAbi={selfclaim.ABI}
            action={async (contract) => {
              const [result, totalAmount] = formatRecipientsForMerkle(address);
              const merkleinput = {
                recipient: result,
                tokenDecimal: tokenContractRead.data.toString(),
              };

              const merkleOutput = await uploadMerkle(merkleinput);

              const expressAmount = expressAmountWith18Decimals(
                totalAmount.toString(),
                tokenContractRead.data.toString()
              );

              await contract.call("create", [
                merkleOutput.merkleRoot,
                tokenAddress,
                expressAmount.toString(),
              ]);
            }}
            onSuccess={(result) => alert("Created airdrop submitted")}
            onError={(error) =>
              alert("Something went wrong (Creating selfclaim)!")
            }
            className="bg-accent1 hover:bg-accent2"
          >
            Create airdrop
          </Web3Button>
        </div>
      </div>
    </main>
  );
}

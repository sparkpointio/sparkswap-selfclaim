"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  ConnectWallet,
  Web3Button,
  useContractRead,
  useContractEvents,
  useContract,
  useAddress,
} from "@thirdweb-dev/react";
import {
  expressAmountWith18Decimals,
  expressAmountFrom18Decimals,
  processInput,
  accessAPI,
} from "../../hooks/createAirdrop";
import { NavigationMenu } from "../../components/NavigationMenu";
import { navigationLinks } from "../index";
import { useRouter } from "next/router";

interface AddressAmount {
  address: string;
  amount: string;
}

export default function Home() {
  // User's connected wallet address
  const wallet = useAddress();
  const router = useRouter();

  // Self-claim airdrop contract address and ABI
  const contractAddress = process.env.NEXT_PUBLIC_SELFCLAIM_ADDRESS
    ? process.env.NEXT_PUBLIC_SELFCLAIM_ADDRESS
    : "";
  const contractABI = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "previousAdmin",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "newAdmin",
          type: "address",
        },
      ],
      name: "AdminChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "beacon",
          type: "address",
        },
      ],
      name: "BeaconUpgraded",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_index",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
        {
          internalType: "bytes32[]",
          name: "_merkleProof",
          type: "bytes32[]",
        },
      ],
      name: "claim",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Claim",
      type: "event",
    },
    {
      inputs: [],
      name: "initialize",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_merkleRoot",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "_tokenAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_totalAmount",
          type: "uint256",
        },
      ],
      name: "create",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "projectOwner",
          type: "address",
        },
      ],
      name: "Create",
      type: "event",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "implementation",
          type: "address",
        },
      ],
      name: "Upgraded",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newImplementation",
          type: "address",
        },
      ],
      name: "upgradeTo",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newImplementation",
          type: "address",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "upgradeToAndCall",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "airdrop",
      outputs: [
        {
          internalType: "address",
          name: "tokenAddress",
          type: "address",
        },
        {
          internalType: "bytes32",
          name: "merkleRoot",
          type: "bytes32",
        },
        {
          internalType: "uint256",
          name: "totalAmount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "totalClaimed",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_merkleRoot",
          type: "bytes32",
        },
      ],
      name: "airdropIDs",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "idExist",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_index",
          type: "uint256",
        },
      ],
      name: "isClaimed",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "proxiableUUID",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalAirdrops",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "unclaimedAmount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  // ERC20 Token ABI
  const erc20ABI = [
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "currentAllowance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "requestedDecrease",
          type: "uint256",
        },
      ],
      name: "ERC20FailedDecreaseAllowance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "allowance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "needed",
          type: "uint256",
        },
      ],
      name: "ERC20InsufficientAllowance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "balance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "needed",
          type: "uint256",
        },
      ],
      name: "ERC20InsufficientBalance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "approver",
          type: "address",
        },
      ],
      name: "ERC20InvalidApprover",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
      ],
      name: "ERC20InvalidReceiver",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "ERC20InvalidSender",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "ERC20InvalidSpender",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "requestedDecrease",
          type: "uint256",
        },
      ],
      name: "decreaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "addedValue",
          type: "uint256",
        },
      ],
      name: "increaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  // Form default values and value holders
  const [tokenAddress, setTokenAddress] = useState(
    "0xe09B8661D80CF24dB230A167969d18B94a5a3266"
  );
  const [address, setAddress] = useState(
    "0x373233a38ae21cf0c4f9de11570e7d5aa6824a1e, 145 \n0x8A672715e042f6e9d9B25C2ce9F84210e8206EF1, 1.069 \n0xC4515C02c334155bc60d86BD6F1119f58ea136e2, 10.81 \n0xe270bc73d658cbd72f721cb8c649aebf91b98d2b, 0.058"
  );

  // Use contract for selfclaim airdrop contract
  const airdropContract = useContract(contractAddress);

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
        spender: contractAddress,
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
  }, [lastReadApprovalEvent, setLastReadApprovalEvent, tokenEvents]);

  // Event listeners for Create events
  const [lastReadEvent, setLastReadEvent] = useState(0);
  const airdropEvents = useContractEvents(
    airdropContract.contract,
    "Create",
    {
      queryFilter: {
        filters: {
          projectOwner: wallet, // e.g. Only events where tokenId = 123
        },
        order: "desc", // Order of events ("asc" or "desc")
      },
      subscribe: true, // Subscribe to new events
    }
  );

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
    <main className="flex min-h-screen flex-col items-center justify-center bg-background1">
      <NavigationMenu navigationLinks={navigationLinks} router={router} />
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
                contractAddress,
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
            contractAddress={contractAddress}
            contractAbi={contractABI}
            action={async (contract) => {
              const [result, totalAmount] = processInput(address);
              const merkleinput = {
                recipient: result,
                tokenDecimal: tokenContractRead.data.toString(),
              };

              const merkleOutput = await accessAPI(merkleinput);

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

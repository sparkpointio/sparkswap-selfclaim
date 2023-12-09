import React, {useState} from "react";
import {ConnectWallet, useAddress, Web3Button,} from "@thirdweb-dev/react";
import {NavigationMenu} from "@/resources/components/NavigationMenu";
import {navigationLinks} from "../index";
import {formatInputRecipients, getMerkleInfo} from "@/library/utils/merkle.utils";
import {useApproveToken, useTokenAllowance, useTokenContract} from "@/library/hooks/useToken";
import tokens from "@/library/constants/tokens";
import contracts from "@/library/constants/contracts";
import {normalizeAmt} from "@/library/utils/bignumber.utils";
import {useSelfClaimContract} from "@/library/hooks/useSelfClaim";

export default function Home() {
  // User's connected wallet address
  const wallet = useAddress();

  // Form default values and value holders
  const [rewardTokenAddress, setRewardTokenAddress] = useState(
    tokens.srk.address.default
  );
  const [recipients, setRecipients] = useState(
    "0x373233a38ae21cf0c4f9de11570e7d5aa6824a1e, 145 \n0x8A672715e042f6e9d9B25C2ce9F84210e8206EF1, 1.069 \n0xC4515C02c334155bc60d86BD6F1119f58ea136e2, 10.81 \n0xe270bc73d658cbd72f721cb8c649aebf91b98d2b, 0.058"
  );
  // Use contract for selfclaim airdrop contract
  const {create: createSelfClaim, receipt} = useSelfClaimContract(contracts.selfClaim.address.default);

  // Use contract for ERC20 contract
  const rewardToken = useTokenContract(rewardTokenAddress);

  // Event listeners for Token approval events
  const {approve} = useApproveToken()
  const {allowance} = useTokenAllowance(rewardToken.contract, contracts.selfClaim.address.default)

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
            id="rewardTokenAddress"
            className="w-full px-3 py-2 border border-accent2 rounded-md text-text2 bg-background2"
            value={rewardTokenAddress}
            onChange={(e) => setRewardTokenAddress(e.target.value)}
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
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4 w-full">
          <p>
            Current Allowance: {allowance?.displayValue} {allowance?.symbol}
          </p>
          <Web3Button
            connectWallet={{
              btnTitle: "Approve selfclaim",
              modalTitle: 'Please connect your wallet first'
            }}
            contractAddress={rewardTokenAddress}
            contractAbi={tokens.erc20ABI}
            action={async (contract) => {
              await approve(contract, contracts.selfClaim.address.default, '1000');
            }}
            onSuccess={(result) => {
              alert('tokens approved')
            }}
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
            connectWallet={{
              btnTitle: "Create Airdrop",
              modalTitle: 'Please connect your wallet first'
            }}
            contractAddress={contracts.selfClaim.address.default}
            contractAbi={contracts.selfClaim.ABI}
            action={async (contract) => {
              const [recipientList, totalAmount] = formatInputRecipients(recipients, rewardToken);
              // todo: save merkle info in database
              await createSelfClaim(
                getMerkleInfo(recipientList),
                {
                  address: rewardTokenAddress,
                  value: totalAmount,
                });
            }}
            onSuccess={(result) => alert("Created airdrop submitted")}
            onError={(error) => {
              console.error(error)
              alert(error)
            }}
            className="bg-accent1 hover:bg-accent2"
          >
            Create airdrop
          </Web3Button>
        </div>
      </div>
    </main>
  );
}

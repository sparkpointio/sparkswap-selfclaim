import React from "react";
import {
  ConnectWallet,
  Web3Button,
  useContractRead,
  useContractEvents,
  useContract,
  useAddress,
} from "@thirdweb-dev/react";
import selfClaim from "@/src/library/constants/selfClaim";

/**
 * Render a card component with a message, button text, and button click handler.
 *
 * @param {string} message - The message to display in the card.
 * @param {string} buttonText - The text to display on the button.
 * @param {() => void} buttonOnClick - The event handler for the button click.
 * @return {React.ReactElement} The rendered card component.
 */
const Card: React.FC<{
  id: string;
  token: string;
  amount: string;
  buttonText: string;
  proof?: any[];
}> = ({ id, token, amount, buttonText, proof = [] }) => {

  return (
    <div className="flex-item mb-4 bg-background2 shadow-lg rounded-lg p-4 mx-auto">
      <p className="text-text1">
        <span className="font-bold">Self-Claim Airdrop</span> #{id}
      </p>
      <p className="text-text2">
        <span className="font-semibold">Token Address:</span> ${token}
      </p>
      <p className="text-text2">
        <span className="font-semibold">Amount to claim:</span> {amount}
      </p>
      <div className="mt-4 w-full">
        <Web3Button
          contractAddress={selfClaim.address}
          contractAbi={selfClaim.ABI}
          action={async (contract) => {
            await contract.call("claim", proof);
          }}
          onSuccess={(result) => alert("Claiming of airdrop submitted")}
          onError={(error) =>
            alert("Something went wrong (Claiming selfclaim)!")
          }
        >
          Claim airdrop
        </Web3Button>
      </div>
    </div>
  );
};

export default Card;

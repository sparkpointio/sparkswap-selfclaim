import React from 'react';

/**
 * Render a card component with a message, button text, and button click handler.
 *
 * @param {string} message - The message to display in the card.
 * @param {string} buttonText - The text to display on the button.
 * @param {() => void} buttonOnClick - The event handler for the button click.
 * @return {React.ReactElement} The rendered card component.
 */
const Card: React.FC<{ 
    id: string, 
    token: string,
    amount: string,
    buttonText: string
}> = ({ 
    id,
    token,
    amount,
    buttonText 
}) => {
  return (
    <div className="flex-item mb-4 bg-white shadow-lg rounded-lg p-4 mx-auto">
      <p className="text-gray-800">
        <span className="font-semibold">Self-claim airdrop</span> #{id}</p>
      <p className="text-gray-800">
        <span className="font-semibold">Token Address:</span> ${token}</p>
      <p className="text-gray-800">
        <span className="font-semibold">Amount to claim:</span> {amount}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Card;
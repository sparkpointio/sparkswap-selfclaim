import {ethers} from "ethers";
import {faker} from "@faker-js/faker";

/**
 * Helpers
 */
export const generateTestRecipients = (quantity = 1) => {
  const parts = Array.from({length: quantity}, (_, i) =>
    `${ethers.Wallet.createRandom().address}, ` +
    `${faker.string.numeric({length: {min: 1, max: 2}, allowLeadingZeros: false})}` +
    `${(i + 1) === quantity ? '' : '\n'}`
  );

  return parts.join('');
}

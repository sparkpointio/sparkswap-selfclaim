import BigNumber from "bignumber.js";

export function expressAmountWith18Decimals(amount: string, decimals: string): string {
    const bigNumberAmount = new BigNumber(amount);
    const bigNumberDecimal = new BigNumber(decimals);
    const expressedAmount = bigNumberAmount.multipliedBy(new BigNumber(10).pow(bigNumberDecimal));
    return expressedAmount.toString();
}

export function expressAmountFrom18Decimals(amount: string, decimals: string): string {
    const bigNumberAmount = new BigNumber(amount);
    const bigNumberDecimal = new BigNumber(decimals);
    const expressedAmount = bigNumberAmount.dividedBy(new BigNumber(10).pow(bigNumberDecimal));
    return expressedAmount.toString();
}

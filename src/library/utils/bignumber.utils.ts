import BigNumber from "bignumber.js";

BigNumber.config({
    DECIMAL_PLACES: 20,
    EXPONENTIAL_AT: 20,
    CRYPTO: true,
});

export function normalizeAmt(amount: string, decimals: number | string = '18', base = 10): string {
    const bigNumberAmount = new BigNumber(amount);
    const bigNumberDecimal = new BigNumber(decimals);
    const expressedAmount = bigNumberAmount.multipliedBy(new BigNumber(10).pow(bigNumberDecimal));
    return expressedAmount.toString(base);
}

export function denormalizeAmt(amount: string, decimals: number | string = '18', base = 10): string {
    const bigNumberAmount = new BigNumber(amount);
    const bigNumberDecimal = new BigNumber(decimals);
    const expressedAmount = bigNumberAmount.dividedBy(new BigNumber(10).pow(bigNumberDecimal));
    return expressedAmount.toString(base);
}

export function toBigNumber(amount: string | number): BigNumber {
    return new BigNumber(amount);
}

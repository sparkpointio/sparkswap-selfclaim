import axios from 'axios';
import BigNumber from 'bignumber.js';

export function expressAmountWith18Decimals(amount: string, decimals:string): string {
    const bigNumberAmount = new BigNumber(amount);
    const bigNumberDecimal = new BigNumber(decimals);
    const expressedAmount = bigNumberAmount.multipliedBy(new BigNumber(10).pow(bigNumberDecimal));
    return expressedAmount.toString();
}

export function expressAmountFrom18Decimals(amount: string, decimals:string): string {
    const bigNumberAmount = new BigNumber(amount);
    const bigNumberDecimal = new BigNumber(decimals);
    const expressedAmount = bigNumberAmount.dividedBy(new BigNumber(10).pow(bigNumberDecimal));
    return expressedAmount.toString();
}


interface AddressAmount {
    address: string;
    amount: string;
}

export function processInput(inputString: string): [AddressAmount[], string] {
    const lines = inputString.split('\n');
    const result: AddressAmount[] = [];
    let totalAmount = 0;
    for (const line of lines) {
        const parts = line.split(',');
        const address = parts[0].trim();
        const amount = parts[1].trim();
        totalAmount += parseFloat(amount.toString());
        result.push({ address, amount });
    }
    return [result, totalAmount.toString()];
}

export async function accessAPI(merkleInput) {
    const url = process.env.NEXT_PUBLIC_SPARKSWAP_API
    const apiKey = process.env.NEXT_PUBLIC_SPARKSWAP_KEY

    const headers = {
        'api-key': `${apiKey}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.post(`${url}/api/merkleupload`, merkleInput, { headers })
        return response.data
    } catch (error) {
        console.error(error);
    }
}
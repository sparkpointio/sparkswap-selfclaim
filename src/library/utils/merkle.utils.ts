export type AddressAmount = {
    address: string;
    amount: string;
}

export function formatRecipientsForMerkle(inputString: string): [AddressAmount[], string] {
    const lines = inputString.split('\n');
    const recipientList: AddressAmount[] = [];
    let totalAmount = 0;
    for (const line of lines) {
        const parts = line.split(',');
        const address = parts[0].trim();
        const amount = parts[1].trim();
        totalAmount += parseFloat(amount.toString());
        recipientList.push({address, amount});
    }
    return [recipientList, totalAmount.toString()];
}

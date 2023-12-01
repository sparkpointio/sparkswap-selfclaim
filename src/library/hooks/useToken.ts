import {
  Address,
  SmartContract,
  useAddress,
  useConnectionStatus,
  useContract,
  useWalletConfig
} from '@thirdweb-dev/react';
import {useCallback, useEffect, useState} from "react";
import {BaseContract, BigNumberish} from "ethers";
import {TransactionReceipt} from "@ethersproject/abstract-provider";


export function useTokenContract(address: Address) {
  const [details, setDetails] = useState<any>(null)
  const [error, setError] = useState<any>(null)
  const {contract} = useContract(address);

  useEffect(() => {
    async function fetchData() {
      const details = await contract?.erc20.get()
      setDetails(details);
    }

    fetchData().catch(setError);
  }, [contract?.erc20]);

  return {
    contract,
    details,
    balanceOf: contract?.erc20.balanceOf,
    error
  };
}

export function useApproveToken() {
  const [error, setError] = useState<any>(null)

  const approve = useCallback(async (
    tokenContract: SmartContract<BaseContract> | undefined,
    spender: string,
    amount: string
  ): Promise<undefined | Omit<{
    receipt: TransactionReceipt;
    data: () => Promise<unknown>;
  }, "data">> => {
    try {
      return await tokenContract?.erc20.setAllowance(spender, amount);
    } catch (e: any) {
      setError('Unable to approve tokens: ' + e.message)
    }
  }, [])

  return {approve, error};
}

export function useTokenAllowance(
  tokenContract: SmartContract<BaseContract> | undefined,
  spender: Address,
) {
  let owner = useAddress()
  const [allowance, setAllowance] = useState<{
    symbol: string;
    value: BigNumberish;
    name: string;
    decimals: number;
    displayValue: string;
  } | undefined>({
    symbol: '',
    value: '',
    name: '',
    decimals: 0,
    displayValue: '0',
  })
  const [error, setError] = useState<any>(null)

  const checkAllowance = useCallback(async (): Promise<any> => {
    try {
      console.log('asd')
      if (tokenContract && owner) {
        const result = await tokenContract?.erc20.allowanceOf(owner, spender)
        setAllowance(result)
        return result
      }
    } catch (e: any) {
      console.error(e)
      setError('Unable to approve tokens: ' + e.message)
    }
  }, [owner, spender, tokenContract])

  // subscribe to approval events
  useEffect(() => {
    if (owner) {
      checkAllowance().catch(setError)
    }
    const handleApproval = async (event: any) => {
      const result = await tokenContract?.erc20.getValue(event.data.value.toString())
      setAllowance(result)
    };
    const unsubscribe = tokenContract?.events.addEventListener('Approval', handleApproval)

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    };
  }, [checkAllowance, owner, tokenContract]);

  return {allowance, error};
}


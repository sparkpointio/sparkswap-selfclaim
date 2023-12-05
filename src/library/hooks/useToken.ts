import {Address, Currency, SmartContract, useAddress, useContract} from '@thirdweb-dev/react';
import {useCallback, useEffect, useState} from "react";
import {BaseContract, BigNumberish} from "ethers";
import {TransactionReceipt} from "@ethersproject/abstract-provider";
import {normalizeAmt} from "@/src/library/utils/bignumber.utils";

export type TokenAmount = {
  name: string;
  address?: string;
  symbol: string;
  value: BigNumberish;
  decimals: number | string;
  displayValue: string;
}

export type TokenContract = {
  contract?: SmartContract<BaseContract>;
  name?: string;
  symbol?: string;
  decimals?: number;
  balanceOf?: (address: string) => Promise<TokenAmount>;
  error?: any;
}


export function useTokenContract(address: Address): TokenContract {
  const [details, setDetails] = useState<Currency>()
  const [error, setError] = useState<any>(null)
  const {contract, error: contractErr} = useContract(address);

  useEffect(() => {
    if (contractErr) {
      setError('Contract does not exist')
      return
    }

    async function fetchData() {
      const details = await contract?.erc20.get()
      setDetails(details);
    }

    fetchData().catch(setError);
  }, [contract, contractErr]);

  return {
    contract,
    ...details,
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
    if (!tokenContract) {
      setError('Contract does not exist')
      return
    }
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
  const [allowance, setAllowance] = useState<TokenAmount | undefined>({
    symbol: '',
    value: '',
    name: '',
    decimals: 0,
    displayValue: '0',
  })
  const [error, setError] = useState<any>(null)

  const checkAllowance = useCallback(async (): Promise<any> => {
    try {
      if (!tokenContract || !owner) {
        setError('Contract does not exist')
        return
      }

      const result = await tokenContract?.erc20.allowanceOf(owner, spender)
      setAllowance(result)
      return result
    } catch (e: any) {
      setError('Unable to approve tokens: ' + e.message)
    }
  }, [owner, spender, tokenContract])

  // subscribe to approval events
  useEffect(() => {
    if (!tokenContract || !owner) {
      return
    }

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

export function useTokenAmount() {
  const [tokenAmount, setTokenAmount] = useState<TokenAmount>();
  // todo use thirdweb's normalizeAmount as an alternative to built in

  const handleSetAmount = useCallback(async (
    amount: {
      name: string;
      symbol: string;
      decimals: number;
      value?: BigNumberish;
      displayValue: string;
    }
  ) => {
    const value = normalizeAmt(amount.displayValue, amount.decimals);
    setTokenAmount(
      {
        ...amount,
        value
      }
    )
  },[])

  return {
    tokenAmount, handleSetAmount
  };
}



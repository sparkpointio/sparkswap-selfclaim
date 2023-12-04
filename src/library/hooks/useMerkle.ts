import {useEffect, useState} from 'react';
import axios from 'axios';
import {useAddress} from "@thirdweb-dev/react";

export function useFetchProofs() {
  const wallet = useAddress();
  const [ proofs, setProofs ] = useState<any>([]);
  const url = process.env.NEXT_PUBLIC_SPARKSWAP_API
  const apiKey = process.env.NEXT_PUBLIC_SPARKSWAP_KEY


  useEffect(() => {
      const headers = {
          'api-key': `${apiKey}`,
          'Content-Type': 'application/json',
      };

      const input = {
          "address": wallet
      }

      async function fetchFromAPI() {
          try {
              const response = await axios.post(
                  `${url}/api/fetchproofs`,
                  input,
                  { headers }
              )
              setProofs(response.data)
          } catch (error) {
              console.error(error);
          }
      }

      fetchFromAPI().then()
  }, [apiKey, url, wallet])

  return proofs
}

export async function uploadMerkle(merkleInput: any) {
    const url = process.env.NEXT_PUBLIC_SPARKSWAP_API
    const apiKey = process.env.NEXT_PUBLIC_SPARKSWAP_KEY

    const headers = {
        'api-key': `${apiKey}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.post(`${url}/api/merkleupload`, merkleInput, {headers})
        return response.data
    } catch (error) {
        console.error(error);
    }
}

import {usePost} from "@/library/hooks/useFetch";

const airdropHooks = {
  useCreate: () => {
    const {postData, data, loading, error} = usePost('/api/airdrops');

    const postAirdrop = async (payload: any) => {
      try {
        await postData(payload);
      } catch (error) {
        console.log('Failed to create airdrop: ', error);
      }
    };
    return {postAirdrop, data, loading, error};
  }
}

export default airdropHooks

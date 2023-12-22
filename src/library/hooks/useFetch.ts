import {useState} from 'react';

export const usePost = (url: string, initialData: any = {}) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const postData = async (payload: any, options?: RequestInit | undefined) => {
    console.log(payload)
    const formData = new FormData();

    for (let key in payload) {
      formData.append(key, payload[key]);
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          ...options?.headers
        },
        body: formData,
      });

      if (!response.ok) {
        setError(`Error: ${response.statusText}`);
        return;
      }

      const data = await response.json();
      setData(data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return {postData, data, loading, error};
};

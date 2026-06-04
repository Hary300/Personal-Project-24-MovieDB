import { useEffect, useState } from 'react';

export default function useFetch<T>(IMAGE_BASE_URL: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

  useEffect(() => {
    async function getData(IMAGE_BASE_URL: string) {
      try {
        setLoading(true);
        const res = await fetch(IMAGE_BASE_URL, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          const err = new Error(`Error: ${res.status}`);
          throw err;
        }

        const resultData = await res.json();
        setData(resultData.results);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown Error');
        }
      } finally {
        setLoading(false);
      }
    }
    getData(IMAGE_BASE_URL);
  }, [IMAGE_BASE_URL]);

  return {
    data,
    loading,
    error,
  };
}

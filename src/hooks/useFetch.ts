import { useEffect, useState } from 'react';

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

type Movie = {
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
};

export default function useFetch<T>(
  isLoadMore: boolean = false,
  BASE_URL: string | null
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);

  const url = isLoadMore ? `${BASE_URL}${page}` : BASE_URL;

  useEffect(() => {
    if (!url) return;
    async function getData(url: string) {
      try {
        setLoading(true);
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          const err = new Error(`Error: ${res.status}`);
          throw err;
        }

        const dataResult = await res.json();
        setData(dataResult);
        if (page === 1) {
          setMovies(dataResult.results);
          return;
        }
        setMovies((prev) => [...prev, ...dataResult.results]);
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
    getData(url);
  }, [page, url]);

  return {
    data,
    movies,
    page,
    setPage,
    loading,
    error,
  };
}

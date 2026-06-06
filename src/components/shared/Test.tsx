import { useEffect, useState } from 'react';

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

type Movie = {
  id: number;
  poster_path: string;
};

type Data = {
  total_pages: number;
  results: Movie[];
};

export default function Test() {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/top_rated?page=${page}`;
    async function getData() {
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
          setError('unknown error');
        }
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [page]);

  if (loading) {
    return <p>Loading....</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) return null;

  return (
    <div>
      <div className='flex'>
        {movies.map((movie) => (
          <div key={movie.id}>{movie.poster_path}</div>
        ))}
      </div>
      <button
        onClick={() => {
          if (page < data.total_pages) {
            setPage((prev) => prev + 1);
          }
        }}
        className={`bg-amber-400 p-4 rounded-2xl ${page >= data.total_pages ? 'opacity-0 pointer-events-none' : ''}`}
      >
        Next
      </button>
    </div>
  );
}

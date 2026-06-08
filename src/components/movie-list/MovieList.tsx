import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LoadingState from '../shared/LoadingState';
import ErrorState from '../shared/ErrorState';

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

type Movie = {
  id: number;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
};

export default function MovieList() {
  const [MovieList, setMovieList] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParam] = useSearchParams();
  const query = searchParam.get('q');

  const MOVIE_BASE_URL = `https://api.themoviedb.org/3/search/movie?query=${query}`;

  useEffect(() => {
    if (!query) return;
    const option = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    };
    async function getData() {
      try {
        setLoading(true);
        const res = await fetch(MOVIE_BASE_URL, option);
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();
        setMovieList(data.results);
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
    getData();
  }, [query, MOVIE_BASE_URL]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!MovieList) return null;

  console.log(MovieList);
  return (
    <section>
      {MovieList.map((movie) => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </section>
  );
}

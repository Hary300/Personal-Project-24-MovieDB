import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LoadingState from '../shared/LoadingState';
import ErrorState from '../shared/ErrorState';
import MovieItem from './MovieItem';
import clapperBoard from '../../assets/clapper-board-not-found-image.svg';

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

  const notFound = (
    <div className='h-100 lg:h-203.5 flex justify-center items-center pb-10'>
      <div className='flex flex-col items-center gap-xl'>
        <img src={clapperBoard} alt='' />
        <div>
          <p className='font-semibold text-md'>Data not Found</p>
          <p className='text-sm text-neutral-400'>Try other keywords</p>
        </div>
      </div>
    </div>
  );
  return (
    <section className='flex flex-col gap-2xl md:gap-3xl px-xl md:px-7xl xl:px-11xl '>
      {MovieList?.length !== 0
        ? MovieList.map((movie) => (
            <MovieItem key={movie.id} movieData={movie} />
          ))
        : notFound}
    </section>
  );
}

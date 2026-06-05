import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import MovieCard from '../shared/MovieCard';
import LoadingState from '../shared/LoadingState';
import ErrorState from '../shared/ErrorState';

type Movie = {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
};

type DataResult = {
  results: Movie[];
};

const TRENDING_NOW_URL = 'https://api.themoviedb.org/3/movie/popular';

export default function TrendingNow() {
  const { data, loading, error } = useFetch<DataResult>(TRENDING_NOW_URL);
  const [currentPosition, setCurrentPosition] = useState(0);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!data) return null;

  const dataResult = data.results;
  const nextIcon = (
    <svg
      width='9'
      height='14'
      viewBox='0 0 9 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1.16667 12.8334L7 7.00002L1.16667 1.16669'
        stroke='#FDFDFD'
        strokeWidth='2.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );

  return (
    <section className='relative flex flex-col py-5xl gap-3xl lg:gap-5xl lg:pt-0 lg:pb-8xl px-xl md:px-7xl xl:px-11xl'>
      <h2 className='text-display-xs lg:text-display-md font-bold'>
        Trending Now
      </h2>
      <p>{currentPosition}</p>
      <div className='relative viewport overflow-hidden md:overflow-visible'>
        <div className='track flex gap-xl'>
          {dataResult.map((d, i) => (
            <MovieCard key={d.id} isTrendingNow={true} index={i} movie={d} />
          ))}
        </div>
      </div>
      <div className='absolute inset-0'>
        {/* <button
          onClick={() => setCurrentPosition((prev) => prev - 3)}
          className='absolute top-1/2 -translate-y-1/2 right-1 md:right-10 xl:right-16 size-11 lg:size-14 bg-neutral-950/60 backdrop-blur-2xl rounded-full flex justify-center items-center cursor-pointer z-20'
        >
          {nextIcon}
        </button> */}

        <button
          onClick={() => setCurrentPosition((prev) => prev + 3)}
          className='absolute top-1/2 -translate-y-1/2 right-1 md:right-10 xl:right-16 size-11 lg:size-14 bg-neutral-950/60 backdrop-blur-2xl rounded-full flex justify-center items-center cursor-pointer z-20'
        >
          {nextIcon}
        </button>

        {/* <div className='hidden md:block pointer-events-none absolute left-0 w-50 h-full bg-linear-to-r from-black to-transparent from-5%'></div> */}

        <div className='hidden md:block pointer-events-none absolute right-0 w-50 h-full bg-linear-to-l from-black to-transparent from-5%'></div>
      </div>
    </section>
  );
}

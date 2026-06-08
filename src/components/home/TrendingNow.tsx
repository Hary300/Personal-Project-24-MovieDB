import { useEffect, useRef, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import MovieCard from '../shared/MovieCard';
import LoadingState from '../shared/LoadingState';
import ErrorState from '../shared/ErrorState';
import CarouselButton from '../shared/CarouselButton';

type Movie = {
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
};

type DataResult = {
  results: Movie[];
};

const TRENDING_NOW_URL = 'https://api.themoviedb.org/3/movie/popular';

export default function TrendingNow() {
  const { data, loading, error } = useFetch<DataResult>(
    false,
    TRENDING_NOW_URL
  );
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [viewportWidth, setViewportWidth] = useState<number>(0);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function getViewportWidth() {
      if (loading || !viewportRef.current) return;
      setViewportWidth(viewportRef.current.clientWidth);
    }

    getViewportWidth();
    window.addEventListener('resize', getViewportWidth);
    return () => {
      window.removeEventListener('resize', getViewportWidth);
    };
  }, [loading]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!data) return null;

  const steps = 2;
  const dataResult = data.results;
  const totalItems = dataResult.length;
  const cardWidth = 188;
  const gap = 16;

  const visibleCard = (viewportWidth + gap) / (cardWidth + gap);
  const lastValidPosition = Math.max(0, totalItems - visibleCard);
  const safePosition = Math.min(currentPosition, lastValidPosition);
  const px = safePosition * (cardWidth + gap);

  const handleNext = () => {
    setCurrentPosition((prev) => {
      const nextPosition = prev + steps;
      if (nextPosition > lastValidPosition) {
        return lastValidPosition;
      }
      return nextPosition;
    });
  };

  const handlePrev = () => {
    setCurrentPosition((prev) => {
      const nextPosition = prev - steps;
      if (nextPosition < 0) {
        return 0;
      }
      return nextPosition;
    });
  };

  return (
    <section className='relative flex flex-col py-5xl gap-3xl lg:gap-5xl lg:pt-0 lg:pb-8xl px-xl md:px-7xl xl:px-11xl'>
      <h2 className='text-display-xs lg:text-display-md font-bold'>
        Trending Now
      </h2>
      <div
        className='viewport relative overflow-hidden md:overflow-visible'
        ref={viewportRef}
      >
        <div
          className='track flex gap-xl transition-transform duration-300'
          style={{ transform: `translateX(-${px}px)` }}
        >
          {dataResult.map((d, i) => (
            <MovieCard key={d.id} isTrendingNow={true} index={i} movie={d} />
          ))}
        </div>
      </div>
      <div className='absolute pointer-events-none inset-0'>
        <CarouselButton variant='prev' onClick={handlePrev} />

        <CarouselButton variant='next' onClick={handleNext} />

        <div className='hidden md:block pointer-events-none absolute left-0 w-50 h-full bg-linear-to-r from-black to-transparent from-5%'></div>

        <div className='hidden md:block pointer-events-none absolute right-0 w-50 h-full bg-linear-to-l from-black to-transparent from-5%'></div>
      </div>
    </section>
  );
}

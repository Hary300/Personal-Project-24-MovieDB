import useFetch from '../../hooks/useFetch';
import MovieCard from '../shared/MovieCard';

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

  if (loading) {
    return (
      <div className='h-100 flex justify-center items-center'>
        <p className='text-lg md:text-2xl'>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='h-100 flex justify-center items-center'>
        <p className='text-lg md:text-2xl'>{error}</p>
      </div>
    );
  }

  if (!data) return null;

  const dataResult = data.results;

  return (
    <div className='flex flex-col py-5xl gap-3xl lg:gap-5xl lg:pt-0 lg:pb-8xl'>
      <h2 className='text-display-xs lg:text-display-md font-bold'>
        Trending Now
      </h2>
      <div className='flex gap-xl'>
        {dataResult.map((d, i) => (
          <MovieCard key={d.id} isTrendingNow={true} index={i} movie={d} />
        ))}
      </div>
    </div>
  );
}

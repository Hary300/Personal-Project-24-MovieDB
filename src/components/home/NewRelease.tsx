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

const today = new Date().toISOString().split('T')[0];

const NEW_RELEASE = `https://api.themoviedb.org/3/discover/movie?sort_by=primary_release_date.desc&primary_release_date.lte=${today}`;

export default function NewRelease() {
  const { data, loading, error } = useFetch<DataResult>(NEW_RELEASE);

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
  console.log(dataResult);
  return (
    <div className='flex flex-col py-5xl gap-3xl lg:gap-5xl lg:pt-0 lg:pb-8xl'>
      <h2 className='text-display-xs lg:text-display-md font-bold'>
        New Release
      </h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-xl'>
        {dataResult.map(
          (d, i) =>
            d.poster_path && (
              <MovieCard key={d.id} isTrendingNow={true} index={i} movie={d} />
            )
        )}
      </div>
    </div>
  );
}

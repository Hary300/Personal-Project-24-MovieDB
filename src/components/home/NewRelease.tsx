import useFetch from '../../hooks/useFetch';
import ErrorState from '../shared/ErrorState';
import MovieCard from '../shared/MovieCard';
import Button from '../shared/Button';

type Movie = {
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
};

type DataResult = {
  total_pages: number;
  results: Movie[];
};

const today = new Date().toISOString().split('T')[0];

const NEW_RELEASE_PAGINATION_BASE_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=primary_release_date.desc&primary_release_date.lte=${today}&page=`;

export default function NewRelease() {
  const { data, movies, page, setPage, loading, error } =
    useFetch<DataResult | null>(true, NEW_RELEASE_PAGINATION_BASE_URL);

  if (error) return <ErrorState error={error} />;

  function handleLoadMoreClick() {
    if (!data) return null;
    if (page < data.total_pages) {
      return setPage((prev) => prev + 1);
    }
  }

  return (
    <section className='relative flex flex-col pt-5xl gap-3xl lg:gap-5xl lg:pt-0 lg:pb-8xl px-xl md:px-7xl xl:px-11xl'>
      <h2 className='text-display-xs lg:text-display-md font-bold'>
        New Release
      </h2>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-xl lg:gap-2xl justify-items-center'>
        {movies.map(
          (d, i) =>
            d.poster_path && (
              <MovieCard key={d.id} isTrendingNow={false} index={i} movie={d} />
            )
        )}
      </div>

      <div className='absolute bottom-0 left-0 w-full h-149 bg-linear-to-t from-black to-transparent from-10% z-20 pointer-events-none'></div>

      <div className='absolute right-1/2 translate-x-1/2 bottom-10 w-50 md:w-55 max-w-55 z-30'>
        <Button
          title='Load More'
          loading={loading}
          onClick={handleLoadMoreClick}
        />
      </div>
    </section>
  );
}

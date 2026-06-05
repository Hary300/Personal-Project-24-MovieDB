// import HeroImage from '../../assets/image 1.png';
import useFetch from '../../hooks/useFetch';
import WatchTrailerButton from '../shared/WatchTrailerButton';

const randomPage = Math.floor(Math.random() * 10) + 1;
const IMAGE_BASE_URL = `https://api.themoviedb.org/3/movie/now_playing?page=${randomPage}`;

type Movie = {
  backdrop_path: string;
  title: string;
  overview: string;
};

type DataResult = {
  results: Movie[];
};

const number = Math.random();

export default function Hero() {
  const { data, loading, error } = useFetch<DataResult>(IMAGE_BASE_URL);

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

  const randomIndex = Math.floor(number * dataResult.length);

  const base_url = 'https://image.tmdb.org/t/p/';
  const backdrop_sizez = 'w1280';
  const backdrop_path = dataResult[randomIndex].backdrop_path;

  return (
    <section className='container md:h-auto md:relative overflow-hidden'>
      <div className='relative flex h-85 md:h-auto overflow-hidden'>
        <img
          src={`${base_url}${backdrop_sizez}${backdrop_path}`}
          alt={`${dataResult[randomIndex].title} image`}
          className='w-full h-full  object-cover object-center'
        />
        <div className='w-full h-55 md:h-full bg-linear-to-b from-black/0 to-black absolute bottom-0'></div>
      </div>

      <div className='relative -mt-11xl flex flex-col gap-3xl px-4 md:px-0 md:mt-0 md:absolute md:left-7xl md:top-40 lg:top-50 xl:top-65 md:max-w-158 xl:left-11xl'>
        <div className='text flex flex-col gap-sm'>
          <h1 className='text-display-xs lg:text-display-2xl font-bold'>
            {dataResult[randomIndex].title}
          </h1>
          <p className='text-sm lg:text-md font-normal text-neutral-400 leading-7'>
            {dataResult[randomIndex].overview}
          </p>
        </div>

        <div className='button flex flex-col gap-xl md:flex-row md:max-w-90 lg:max-w-100 xl:max-w-125'>
          <WatchTrailerButton />

          <button className='flex items-center justify-center gap-md p-md rounded-full bg-neutral-950/60 border border-neutral-900 backdrop-blur-2xl w-full text-sm font-semibold text-neutral-25 cursor-pointer'>
            See Detail
          </button>
        </div>
      </div>
    </section>
  );
}

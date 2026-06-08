import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Button from '../shared/Button';
import ErrorState from '../shared/ErrorState';
import LoadingState from '../shared/LoadingState';

const randomPage = Math.floor(Math.random() * 10) + 1;
const IMAGE_BASE_URL = `https://api.themoviedb.org/3/movie/now_playing?page=${randomPage}`;

type Video = {
  name: string;
  key: string;
  type: string;
};

type VideoResponse = {
  results: Video[];
};

type Movie = {
  id: number;
  backdrop_path: string;
  title: string;
  overview: string;
};

type DataResult = {
  results: Movie[];
};

const number = Math.random();

export default function Hero() {
  const { data, loading, error } = useFetch<DataResult>(false, IMAGE_BASE_URL);
  const navigate = useNavigate();

  const dataResult = data?.results || [];

  const safeLength = dataResult.length;
  const randomIndex = safeLength ? Math.floor(number * safeLength) : 0;
  const selectedMovie = dataResult[randomIndex];
  const movieId = selectedMovie?.id;

  const base_url = 'https://image.tmdb.org/t/p/';
  const backdrop_sizez = 'w1280';
  const backdrop_path = selectedMovie?.backdrop_path;
  const VIDEO_URL = movieId
    ? `https://api.themoviedb.org/3/movie/${movieId}/videos`
    : null;
  const { data: movieVideos } = useFetch<VideoResponse | null>(
    false,
    VIDEO_URL
  );

  const video =
    movieVideos?.results.find(
      (item) => item.type === 'Trailer' && item.name.includes('Trailer')
    ) ?? null;

  const videoKey = video?.key;

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!data) return null;

  function handleWatchTrailer(videoKey: string) {
    const YOUTUBE_BASE_URL = `https://www.youtube.com/watch?v=${videoKey}`;
    window.open(YOUTUBE_BASE_URL, '_blank');
  }

  function handleDetail(movieId: number) {
    navigate(`/detail/${movieId}`);
  }

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
          {video && (
            <Button
              onClick={() => {
                if (!videoKey) return;
                handleWatchTrailer(videoKey);
              }}
            />
          )}
          <Button
            title={'See Detail'}
            onClick={() => handleDetail(dataResult[randomIndex].id)}
          />
        </div>
      </div>
    </section>
  );
}

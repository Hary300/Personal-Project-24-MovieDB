import { useEffect, useState } from 'react';
import Button from '../shared/Button';
import FavButton from '../shared/FavButton';
import { useNavigate } from 'react-router-dom';
import LoadingState from '../shared/LoadingState';
import ErrorState from '../shared/ErrorState';

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

type MovieItemProps = {
  movieData: {
    id: number;
    poster_path: string;
    title: string;
    vote_average: number;
    overview: string;
  };
};

type Video = {
  name: string;
  key: string;
  type: string;
};

type VideoResponse = {
  results: Video[];
};

export default function MovieItem({ movieData }: MovieItemProps) {
  const [like, setLike] = useState(false);
  const navigate = useNavigate();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const image_base_url = 'https://image.tmdb.org/t/p/';
  const poster_sizes = 'w780';
  const poster_path = movieData.poster_path;
  const poster_image = `${image_base_url}${poster_sizes}${poster_path}`;
  const title = movieData.title;
  const overview = movieData.overview;
  const movieId = movieData.id;
  const VIDEO_URL = `https://api.themoviedb.org/3/movie/${movieId}/videos`;

  useEffect(() => {
    async function getVideo() {
      const option = {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
      };

      try {
        setLoading(true);
        const res = await fetch(VIDEO_URL, option);
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const data: VideoResponse = await res.json();

        const result = data.results;
        const trailerVideo =
          result.find(
            (item) =>
              (item.type === 'Trailer' && item.name.includes('Official')) ||
              item.name.includes('Trailer')
          ) ?? null;
        setVideo(trailerVideo);
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
    getVideo();
  }, [VIDEO_URL]);

  function handleClickMovieDetail(movieId: number) {
    navigate(`/detail/${movieId}`);
  }

  const starIcon = (
    <svg
      width='17'
      height='17'
      viewBox='0 0 17 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7.64299 1.10939C8.03165 0.463572 8.96794 0.46357 9.3566 1.10939L11.2986 4.33639C11.4383 4.5684 11.666 4.73387 11.9298 4.79497L15.599 5.64476C16.3333 5.81483 16.6227 6.7053 16.1285 7.27451L13.6596 10.1187C13.4821 10.3232 13.3951 10.5909 13.4185 10.8607L13.7442 14.6129C13.8093 15.3638 13.0518 15.9142 12.3578 15.6201L8.88989 14.1509C8.64055 14.0453 8.35904 14.0453 8.10971 14.1509L4.64178 15.6201C3.94775 15.9142 3.19026 15.3638 3.25543 14.6129L3.58108 10.8607C3.60449 10.5909 3.5175 10.3232 3.33999 10.1187L0.871051 7.27451C0.376942 6.7053 0.666272 5.81483 1.40059 5.64476L5.06977 4.79497C5.33357 4.73387 5.56132 4.5684 5.70095 4.33639L7.64299 1.10939Z'
        fill='#E4A802'
        stroke='#E4A802'
        strokeWidth='1.25'
      />
    </svg>
  );

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  if (!video) return null;
  const videoKey = video.key;

  function handleWatchTrailer(videoKey: string) {
    const YOUTUBE_BASE_URL = `https://www.youtube.com/watch?v=${videoKey}`;
    window.open(YOUTUBE_BASE_URL, '_blank');
  }

  return (
    <div className='grid grid-cols-[6.5rem_1fr] lg:grid-cols-[11.375rem_1fr_auto] gap-xl md:gap-3xl '>
      <div
        className='rounded-xl overflow-hidden lg:row-span-2 transition-transform duration-200 hover:scale-105 z-20 cursor-pointer'
        onClick={() => handleClickMovieDetail(movieId)}
      >
        <img src={poster_image} alt='' className='h-full' />
      </div>
      <div>
        <h3 className='text-display-xs font-bold'>{title}</h3>
        <p className='flex items-center gap-xs'>
          {starIcon} {movieData.vote_average.toFixed(1)}/10
        </p>
        <p className='text-sm text-neutral-400 md:text-md line-clamp-3 lg:line-clamp-2'>
          {overview}
        </p>
      </div>
      <div className='flex justify-between gap-xl col-span-2 md:contents'>
        {video && (
          <div className='flex-1 md:col-start-2 md:max-w-50'>
            <Button onClick={() => handleWatchTrailer(videoKey)} />
          </div>
        )}
        <div className='md:col-start-3 md:row-start-1'>
          <FavButton like={like} setLike={setLike} />
        </div>
      </div>
    </div>
  );
}

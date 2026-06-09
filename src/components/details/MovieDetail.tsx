import { useEffect, useState } from 'react';
import ErrorState from '../shared/ErrorState';
import LoadingState from '../shared/LoadingState';
import Button from '../shared/Button';
import { useParams } from 'react-router-dom';
import FavButton from '../shared/FavButton';

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

type Option = {
  headers: {
    Authorization: string;
    'Content-Type': string;
  };
};

type MovieDetail = {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  release_date: string;
  overview: string;
  vote_average: number;
  genres: { name: string }[];
};

type Video = {
  name: string;
  key: string;
  type: string;
};

type VideoResponse = {
  results: Video[];
};

type Cast = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
};

type CastResponse = {
  cast: Cast[];
};

type AgeResponse = {
  results: {
    iso_3166_1: string;
    release_dates: {
      certification: string;
      type: number;
    }[];
  }[];
};

// { movieId = 299534 }: MovieDetailProps

export default function MovieDetail() {
  const { movieId } = useParams();
  const MOVIE_DETAIL_URL = `https://api.themoviedb.org/3/movie/${movieId}`;
  const VIDEO_URL = `https://api.themoviedb.org/3/movie/${movieId}/videos`;
  const AGE_LIMIT_URL = `https://api.themoviedb.org/3/movie/${movieId}/release_dates`;
  const CAST_URL = `https://api.themoviedb.org/3/movie/${movieId}/credits`;

  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [video, setVideo] = useState<Video | null>(null);
  const [ageLimit, setAgeLimit] = useState<string | null>(null);
  const [cast, setCast] = useState<Cast[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [like, setLike] = useState(false);

  useEffect(() => {
    async function getData() {
      const option: Option = {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
      };
      try {
        setLoading(true);
        const [movieDetailData, videoData, ageData, castData] =
          await Promise.all([
            fetchJson<MovieDetail>(MOVIE_DETAIL_URL, option),
            fetchJson<VideoResponse>(VIDEO_URL, option),
            fetchJson<AgeResponse>(AGE_LIMIT_URL, option),
            fetchJson<CastResponse>(CAST_URL, option),
          ]);

        setMovieDetail(movieDetailData);

        const video =
          videoData?.results.find(
            (item) =>
              (item.type === 'Trailer' && item.name.includes('Official')) ||
              item.name.includes('Trailer')
          ) ?? null;
        if (!video) console.log('no trailer video');
        setVideo(video);

        const usAgeLimit = ageData.results.find(
          (item) => item.iso_3166_1 === 'US'
        );
        const certification =
          usAgeLimit?.release_dates.find(
            (item) => item.type === 3 && item.certification
          )?.certification ?? 'NR';
        setAgeLimit(certification);

        setCast(castData.cast);
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

    async function fetchJson<T>(url: string, option: Option): Promise<T> {
      const res = await fetch(url, option);
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      return res.json();
    }
    getData();
  }, [MOVIE_DETAIL_URL, VIDEO_URL, AGE_LIMIT_URL, CAST_URL]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!movieDetail || !ageLimit || !cast) {
    console.log('movie detail: ', movieDetail);
    console.log('video: ', video);
    console.log('age Limit: ', ageLimit);
    console.log('cast: ', cast);
    return;
  }

  const image_base_url = 'https://image.tmdb.org/t/p/';
  const backdrop_sizes = 'w1280';
  const poster_sizes = 'w780';
  const profile_sizes = 'w185';
  const backdrop_path = movieDetail.backdrop_path;
  const poster_path = movieDetail.poster_path;

  const backdrop_image = `${image_base_url}${backdrop_sizes}${backdrop_path}`;
  const poster_image = `${image_base_url}${poster_sizes}${poster_path}`;
  const title = movieDetail.title;
  const rating = movieDetail.vote_average.toFixed(1);
  const genre = movieDetail.genres?.[0]?.name ?? 'Unknown';
  const overview = movieDetail.overview;
  const visibleCasts = cast.slice(0, 9);
  const videoKey = video?.key;

  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  } as const;

  const date = new Date(movieDetail.release_date).toLocaleDateString(
    'en-GB',
    options
  );

  const calenderIcon = (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6.66699 1.66667V4.16667'
        stroke='#FDFDFD'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13.333 1.66667V4.16667'
        stroke='#FDFDFD'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2.91699 7.575H17.0837'
        stroke='#FDFDFD'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M17.5 7.08334V14.1667C17.5 16.6667 16.25 18.3333 13.3333 18.3333H6.66667C3.75 18.3333 2.5 16.6667 2.5 14.1667V7.08334C2.5 4.58334 3.75 2.91667 6.66667 2.91667H13.3333C16.25 2.91667 17.5 4.58334 17.5 7.08334Z'
        stroke='#FDFDFD'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13.0791 11.4167H13.0866'
        stroke='#FDFDFD'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13.0791 13.9167H13.0866'
        stroke='#FDFDFD'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.99607 11.4167H10.0036'
        stroke='#FDFDFD'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.99607 13.9167H10.0036'
        stroke='#FDFDFD'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.91209 11.4167H6.91957'
        stroke='#FDFDFD'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.91209 13.9167H6.91957'
        stroke='#FDFDFD'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );

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

  const happyIcon = (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14.19 0H5.81C2.17 0 0 2.17 0 5.81V14.18C0 17.83 2.17 20 5.81 20H14.18C17.82 20 19.99 17.83 19.99 14.19V5.81C20 2.17 17.83 0 14.19 0ZM6.5 4.38C7.53 4.38 8.38 5.22 8.38 6.26C8.38 7.3 7.54 8.14 6.5 8.14C5.46 8.14 4.62 7.28 4.62 6.25C4.62 5.22 5.47 4.38 6.5 4.38ZM10 17.08C7.31 17.08 5.12 14.89 5.12 12.2C5.12 11.5 5.69 10.92 6.39 10.92H13.59C14.29 10.92 14.86 11.49 14.86 12.2C14.88 14.89 12.69 17.08 10 17.08ZM13.5 8.12C12.47 8.12 11.62 7.28 11.62 6.24C11.62 5.2 12.46 4.36 13.5 4.36C14.54 4.36 15.38 5.2 15.38 6.24C15.38 7.28 14.53 8.12 13.5 8.12Z'
        fill='#FDFDFD'
      />
    </svg>
  );

  const videoIcon = (
    <svg
      width='21'
      height='18'
      viewBox='0 0 21 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M19.4 2.92C18.99 2.7 18.13 2.47 16.96 3.29L15.49 4.33C15.38 1.22 14.03 0 10.75 0H4.75C1.33 0 0 1.33 0 4.75V12.75C0 15.05 1.25 17.5 4.75 17.5H10.75C14.03 17.5 15.38 16.28 15.49 13.17L16.96 14.21C17.58 14.65 18.12 14.79 18.55 14.79C18.92 14.79 19.21 14.68 19.4 14.58C19.81 14.37 20.5 13.8 20.5 12.37V5.13C20.5 3.7 19.81 3.13 19.4 2.92ZM9.25 8.13C8.22 8.13 7.37 7.29 7.37 6.25C7.37 5.21 8.22 4.37 9.25 4.37C10.28 4.37 11.13 5.21 11.13 6.25C11.13 7.29 10.28 8.13 9.25 8.13Z'
        fill='#FDFDFD'
      />
    </svg>
  );

  function handleWatchTrailer(videoKey: string) {
    const YOUTUBE_BASE_URL = `https://www.youtube.com/watch?v=${videoKey}`;
    window.open(YOUTUBE_BASE_URL, '_blank');
  }
  return (
    <section className='md:pb-37.25'>
      <div className='relative flex  h-85 md:h-auto overflow-hidden'>
        {backdrop_path ? (
          <>
            <img
              src={backdrop_image}
              alt=''
              className='w-full h-full  object-cover object-center'
            />
            <div className='w-full h-55 md:h-full bg-linear-to-b from-black/0 to-black absolute bottom-0'></div>
          </>
        ) : (
          <p className='m-auto mt-30 mb-50 text-2xl'>No Image</p>
        )}
      </div>
      <div className='relative grid grid-cols-[7.25rem_1fr] md:grid-cols-[10rem_1fr] lg:grid-cols-[18.25rem_1fr] gap-xl md:gap-4xl px-xl md:px-7xl xl:px-11xl -mt-29.5 lg:-mt-41 pb-5xl'>
        {/* poster */}
        <div
          className={`lg:h-full md:row-span-2 lg:row-span-3 rounded-xl overflow-hidden ${poster_path ? '' : ' border border-neutral-400 h-21 md:h-26 flex justify-center items-center px-4'}`}
        >
          {poster_path ? (
            <img src={poster_image} alt='' />
          ) : (
            <span className='h-full flex justify-center items-center text-center text-2xl text-neutral-300'>
              No Image
            </span>
          )}
        </div>

        {/* title */}
        <div className='flex flex-col gap-xs md:gap-4xl'>
          <h2 className='text-xl font-bold lg:text-display-xl '>{title}</h2>
          <p className='flex items-center text-sm font-normal lg:text-md gap-xs lg:gap-md'>
            {calenderIcon}
            {date}
          </p>
        </div>

        {/* button */}
        <div className='flex gap-xl col-span-2 md:col-span-1 '>
          {video && (
            <div className='w-full md:max-w-75.25'>
              <Button
                onClick={() => {
                  if (!videoKey) return;
                  handleWatchTrailer(videoKey);
                }}
              />
            </div>
          )}
          <FavButton like={like} setLike={setLike} />
        </div>

        {/* stats */}
        <div className='flex gap-xl col-span-2 lg:col-span-1'>
          <div className='flex w-full flex-col items-center justify-center rounded-2xl gap-md border border-neutral-800 p-xl lg:p-2xl'>
            {starIcon}
            <p className='text-xs text-neutral-300 lg:text-md'>Rating</p>
            <p className='font-semibold text-lg lg:text-xl'>{rating}/10</p>
          </div>
          <div className='flex w-full flex-col items-center justify-center rounded-2xl gap-md border border-neutral-800 p-xl lg:p-2xl'>
            {videoIcon}
            <p className='text-xs text-neutral-300 lg:text-md'>Genre</p>
            <p className='font-semibold text-lg lg:text-xl text-center'>
              {genre}
            </p>
          </div>
          <div className='flex  w-full flex-col items-center justify-center rounded-2xl gap-md border border-neutral-800 p-xl lg:p-2xl'>
            {happyIcon}
            <p className='text-center text-xs text-neutral-300 lg:text-md'>
              Age Limit
            </p>
            <p className='font-semibold text-lg lg:text-xl'>{ageLimit}</p>
          </div>
        </div>

        {/* overview */}
        <div className='col-span-2 flex flex-col gap-md'>
          <h3 className='font-bold text-xl lg:text-display-md'>Overview</h3>
          <p className='text-sm text-neutral-400 lg:text-md'>{overview}</p>
        </div>

        {/* cast */}
        <div className='col-span-2 flex flex-col gap-md'>
          <h3 className='font-bold text-xl lg:text-display-md'>Cast & Crew</h3>
          <ul className='grid grid-cols-1 gap-xl md:grid-cols-3 md:gap-3xl'>
            {visibleCasts.map((cast) => (
              <li key={cast.id} className='flex items-center gap-lg md:gap-xl'>
                <div
                  className={`max-w-13.75 md:max-w-17.25 rounded-md overflow-hidden ${cast.profile_path ? '' : ' border border-neutral-400 h-21 md:h-26 flex justify-center items-center px-4'}`}
                >
                  {cast.profile_path ? (
                    <img
                      src={`${image_base_url}${profile_sizes}${cast.profile_path}`}
                      alt=''
                    />
                  ) : (
                    <span className='h-full flex justify-center items-center text-center text-xs text-neutral-300'>
                      No Image
                    </span>
                  )}
                </div>
                <div className='flex flex-col'>
                  <p className='font-semibold text-sm md:text-md leading-7'>
                    {cast.name}
                  </p>
                  <p className='text-sm md:text-md text-neutral-400'>
                    {cast.character}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

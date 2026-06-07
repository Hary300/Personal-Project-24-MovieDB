import { useEffect, useState } from 'react';
import ErrorState from '../shared/ErrorState';
import LoadingState from '../shared/LoadingState';

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

type Option = {
  headers: {
    Authorization: string;
    'Content-Type': string;
  };
};

type MovieDetailProps = {
  movieId?: number;
};

type MovieDetail = {
  id: number;
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  release_date: string;
  vote_average: string;
  genre: string;
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
  name: string;
  character: string;
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

export default function MovieDetail({ movieId = 335988 }: MovieDetailProps) {
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
            (item) => item.type === 'Trailer' && item.name.includes('Official')
          ) ?? null;
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
  if (!movieDetail || !video || !ageLimit || !cast) return null;

  // const YOUTUBE_BASE_URL = `https://www.youtube.com/watch?v=`;
  const base_url = 'https://image.tmdb.org/t/p/';
  const backdrop_sizes = 'w1280';
  const poster_sizes = 'w780';
  const backdrop_path = movieDetail.backdrop_path;
  const poster_path = movieDetail.poster_path;

  const backdrop_image = `${base_url}${backdrop_sizes}${backdrop_path}`;
  const poster_image = `${base_url}${poster_sizes}${poster_path}`;
  const title = movieDetail.original_title;

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

  return (
    <section>
      <div className='relative flex h-85 md:h-auto overflow-hidden'>
        <img
          src={backdrop_image}
          alt=''
          className='w-full h-full  object-cover object-center'
        />
        <div className='w-full h-55 md:h-full bg-linear-to-b from-black/0 to-black absolute bottom-0'></div>
      </div>
      <div className='relative grid grid-cols-[7.25rem_1fr] md:grid-cols-[10rem_1fr] lg:grid-cols-[16.25rem_1fr] gap-xl md:gap-4xl px-xl md:px-7xl xl:px-11xl -mt-29.5 lg:-mt-41'>
        {/* poster */}
        <div className='lg:h-full md:row-span-2 lg:row-span-3 rounded-xl overflow-hidden'>
          <img src={poster_image} alt='' />
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
        <div className='h-11 col-span-2  md:col-span-1 border border-amber-600'></div>

        {/* stats */}
        <div className='h-30 col-span-2 lg:col-span-1 border border-indigo-500'></div>

        {/* overview */}
        <div className='h-45.5 col-span-2 border border-teal-600'></div>

        {/* cast */}
        <div className='h-45.5 col-span-2 border border-blue-500'></div>
      </div>
    </section>
  );
}
